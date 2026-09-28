/**
 * Under Width and Height in txt2img and img2img:
 * - aspect ratios: one click sets a width and height of that shape, at a base
 *   size that follows the model (512 for SD 1, 768 for SD 2, 1024 for the rest)
 *   or one picked by hand; a lock keeps the shape while a slider moves;
 * - suggested settings: steps and CFG scale that suit the loaded model's
 *   family (and its fast variants: Lightning, Turbo, LCM, Hyper, DMD2, Schnell).
 */
import { readableColor } from 'polished';
import { $, type GenTab, numberInput, readNumber, setInputValue } from '@/scripts/webui';

import type { Arch } from './api';
import { getModel } from './api';
import { ARCH_LABEL, currentArch, presetValue } from './loraData';

export interface SizeToolsText {
  auto: string;
  base: string;
  cfg: string;
  distilled: string;
  lock: string;
  noSuggestions: string;
  ratio: string;
  steps: string;
  suggested: string;
}

type Ratio = [number, number];

const RATIOS: Ratio[] = [
  [1, 1], [4, 5], [3, 4], [2, 3], [9, 16], [9, 21], [5, 4], [4, 3], [3, 2], [16, 9], [21, 9],
];
const BASES = [512, 768, 1024, 1536];

// The sizes SDXL-class models were trained on (width x height), by shape.
const BUCKETS_1024: Record<string, [number, number]> = {
  '16:9': [1344, 768], '1:1': [1024, 1024], '21:9': [1536, 640], '2:3': [832, 1216], '3:2': [1216, 832],
  '3:4': [896, 1152], '4:3': [1152, 896], '4:5': [896, 1152], '5:4': [1152, 896], '9:16': [768, 1344], '9:21': [640, 1536],
};

export interface Suggestion {
  cfg: number;
  distilled?: number;
  label: string;
  steps: number;
}

const FAMILY: Partial<Record<Arch, Suggestion[]>> = {
  flux: [
    { cfg: 1, distilled: 3.5, label: 'Fast', steps: 16 },
    { cfg: 1, distilled: 3.5, label: 'Balanced', steps: 24 },
    { cfg: 1, distilled: 3.5, label: 'Quality', steps: 32 },
  ],
  krea: [
    { cfg: 1, distilled: 4.5, label: 'Balanced', steps: 28 },
    { cfg: 1, distilled: 4.5, label: 'Quality', steps: 36 },
  ],
  lumina: [
    { cfg: 4, label: 'Balanced', steps: 30 },
    { cfg: 4.5, label: 'Quality', steps: 50 },
  ],
  qwen: [
    { cfg: 4, label: 'Balanced', steps: 30 },
    { cfg: 4, label: 'Quality', steps: 50 },
  ],
  sd: [
    { cfg: 7, label: 'Fast', steps: 20 },
    { cfg: 7, label: 'Balanced', steps: 28 },
    { cfg: 7.5, label: 'Quality', steps: 40 },
  ],
  sd2: [
    { cfg: 7, label: 'Fast', steps: 25 },
    { cfg: 7.5, label: 'Balanced', steps: 35 },
    { cfg: 8, label: 'Quality', steps: 50 },
  ],
  sd3: [
    { cfg: 4.5, label: 'Balanced', steps: 28 },
    { cfg: 5, label: 'Quality', steps: 40 },
  ],
  xl: [
    { cfg: 5, label: 'Fast', steps: 20 },
    { cfg: 6, label: 'Balanced', steps: 28 },
    { cfg: 7, label: 'Quality', steps: 40 },
  ],
  zit: [
    { cfg: 1, label: 'Turbo', steps: 8 },
    { cfg: 1, label: 'More steps', steps: 12 },
  ],
};

// Fast variants, known by their checkpoint names: these override the family.
const FAST: [RegExp, Suggestion[]][] = [
  [/schnell/i, [{ cfg: 1, distilled: 3.5, label: 'Schnell', steps: 4 }]],
  [/lightning/i, [{ cfg: 1.5, label: 'Lightning', steps: 6 }, { cfg: 2, label: 'Lightning+', steps: 8 }]],
  [/hyper/i, [{ cfg: 1, label: 'Hyper', steps: 8 }]],
  [/dmd2?/i, [{ cfg: 1, label: 'DMD2', steps: 8 }]],
  [/\blcm\b|[_-]lcm/i, [{ cfg: 1.5, label: 'LCM', steps: 6 }]],
  [/turbo/i, [{ cfg: 1, label: 'Turbo', steps: 4 }, { cfg: 1.5, label: 'Turbo+', steps: 8 }]],
];

export const suggestionsFor = (arch: Arch, checkpoint: string): Suggestion[] => {
  for (const [pattern, list] of FAST) if (pattern.test(checkpoint)) return list;
  return FAMILY[arch] || [];
};

// the family from a checkpoint's name, while the server does not know yet
// (no model loaded: reForge loads it on the first generation)
const NAMED: [RegExp, Arch][] = [
  [/krea/i, 'krea'],
  [/flux/i, 'flux'],
  [/sd3|sd_3|stable.?diffusion.?3/i, 'sd3'],
  [/qwen/i, 'qwen'],
  [/lumina/i, 'lumina'],
  [/z.?image/i, 'zit'],
  [/xl|pony|illustrious|noob|animagine/i, 'xl'],
  [/sd.?2|v2-1|768-v/i, 'sd2'],
  [/sd.?1\.?5|sd15|v1-5|1\.5/i, 'sd'],
];

export const guessArch = (name: string): Arch => NAMED.find(([pattern]) => pattern.test(name))?.[1] ?? 'unknown';

const autoBase = (arch: Arch) => (arch === 'sd' ? 512 : arch === 'sd2' ? 768 : arch === 'unknown' ? 0 : 1024);

const sliderStep = (tab: GenTab) => {
  const range = $<HTMLInputElement>(`#${tab}_width input[type='range']`);
  const step = Number(range?.step || 8);
  return Number.isFinite(step) && step > 0 ? step : 8;
};

const sliderMax = (tab: GenTab) => Number($<HTMLInputElement>(`#${tab}_width input[type='range']`)?.max || 2048) || 2048;

/** A width and height of shape w:h with about base x base pixels, on the sliders' step. */
export const sizeFor = ([rw, rh]: Ratio, base: number, step: number, max = 2048): [number, number] => {
  const key = `${rw}:${rh}`;
  if (base === 1024 && BUCKETS_1024[key] && BUCKETS_1024[key].every((v) => v % step === 0)) return BUCKETS_1024[key];
  const ratio = rw / rh;
  const area = base * base;
  const round = (v: number) => Math.min(max, Math.max(step, Math.round(v / step) * step));
  return [round(Math.sqrt(area * ratio)), round(Math.sqrt(area / ratio))];
};

const ratioIcon = ([rw, rh]: Ratio) => {
  const s = 14 / Math.max(rw, rh);
  const w = Math.max(4, rw * s);
  const h = Math.max(4, rh * s);
  return `<svg viewBox="0 0 16 16" width="14" height="14"><rect x="${(16 - w) / 2}" y="${(16 - h) / 2}" width="${w}" height="${h}" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`;
};

const LOCK = '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>';

const CSS = `
.lobe-size { display: flex; flex-direction: column; gap: 8px; margin: 6px 0 4px; padding: 8px 10px; background: var(--lobe-size-fill, rgb(128 128 128 / 8%)); border-radius: 10px; }
.lobe-size-row { display: flex; flex-wrap: wrap; gap: 4px; align-items: center; }
.lobe-size-label { min-width: 64px; margin-right: 4px; font-size: 12px; font-weight: 600; opacity: 0.7; }
.lobe-size-chip { display: inline-flex; gap: 4px; align-items: center; height: 26px; padding: 0 8px !important; min-width: 0 !important; font-size: 12px !important; line-height: 1;
  color: inherit !important; cursor: pointer; background: transparent !important; border: 1px solid var(--lobe-size-border, rgb(128 128 128 / 30%)) !important; border-radius: 13px !important; box-shadow: none !important; }
.lobe-size-chip:hover { border-color: var(--lobe-size-primary, #1677ff) !important; }
.lobe-size-chip.active { color: var(--lobe-size-on-primary, #fff) !important; background: var(--lobe-size-primary, #1677ff) !important; border-color: var(--lobe-size-primary, #1677ff) !important; }
.lobe-size-chip svg { flex-shrink: 0; }
.lobe-size-chip small { opacity: 0.7; font-size: 10.5px; }
.lobe-size-sep { width: 1px; height: 18px; margin: 0 4px; background: var(--lobe-size-border, rgb(128 128 128 / 30%)); }
.lobe-size-note { font-size: 12px; opacity: 0.65; }
.lobe-size-family { padding: 1px 6px; font-size: 10.5px; font-weight: 700; letter-spacing: 0.03em; color: var(--lobe-size-on-primary, #fff); background: var(--lobe-size-primary, #1677ff); border-radius: 4px; }
`;

interface Panel {
  base: HTMLElement;
  lock: HTMLButtonElement;
  ratios: HTMLElement;
  root: HTMLElement;
  suggested: HTMLElement;
  tab: GenTab;
}

export const startSizeTools = ({ colors, text }: { colors: { border: string; fill: string; primary: string }; text: SizeToolsText }) => {
  if (document.querySelector('#lobe-size-tools-style')) return () => undefined;
  const style = document.createElement('style');
  style.id = 'lobe-size-tools-style';
  style.textContent = CSS;
  document.head.append(style);
  const rootStyle = document.documentElement.style;
  rootStyle.setProperty('--lobe-size-primary', colors.primary);
  // text on the primary colour: dark on a light primary (the default dark theme's is near white)
  rootStyle.setProperty('--lobe-size-on-primary', readableColor(colors.primary, '#111', '#fff', false));
  rootStyle.setProperty('--lobe-size-fill', colors.fill);
  rootStyle.setProperty('--lobe-size-border', colors.border);

  let arch: Arch = 'unknown';
  let checkpoint = '';
  const baseChoice: Record<GenTab, number> = { img2img: 0, txt2img: 0 };        // 0: follow the model
  const locked: Record<GenTab, Ratio | undefined> = { img2img: undefined, txt2img: undefined };
  const panels: Panel[] = [];

  const baseOf = (tab: GenTab) => baseChoice[tab] || autoBase(arch) || Math.round(Math.sqrt((readNumber(`${tab}_width`) || 512) * (readNumber(`${tab}_height`) || 512)) / 64) * 64;

  const chip = (html: string, title: string, onClick: () => void) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'lobe-size-chip';
    button.innerHTML = html;
    button.title = title;
    button.addEventListener('click', (event) => {
      event.preventDefault();
      onClick();
    });
    return button;
  };

  const setSize = (tab: GenTab, width: number, height: number) => {
    setInputValue(numberInput(`${tab}_width`), String(width));
    setInputValue(numberInput(`${tab}_height`), String(height));
  };

  // A new base size resizes the image at once, keeping its shape: the listed
  // shape it is closest to (for the trained sizes), else its own.
  const resizeToBase = (tab: GenTab) => {
    const w = readNumber(`${tab}_width`);
    const h = readNumber(`${tab}_height`);
    if (!w || !h) return;
    const shape: Ratio = locked[tab]
      || RATIOS.find(([rw, rh]) => Math.abs(Math.log(w / h / (rw / rh))) < 0.03)
      || [w, h];
    const [nw, nh] = sizeFor(shape, baseOf(tab), sliderStep(tab), sliderMax(tab));
    setSize(tab, nw, nh);
  };

  const currentRatio = (tab: GenTab) => {
    const w = readNumber(`${tab}_width`);
    const h = readNumber(`${tab}_height`);
    return w && h ? w / h : 0;
  };

  const drawRatios = (panel: Panel) => {
    const { tab } = panel;
    const now = currentRatio(tab);
    const base = baseOf(tab);
    const step = sliderStep(tab);
    for (const button of panel.ratios.querySelectorAll<HTMLButtonElement>('.lobe-size-chip[data-ratio]')) {
      const [rw, rh] = button.dataset.ratio!.split(':').map(Number) as Ratio;
      const [w, h] = sizeFor([rw, rh], base, step, sliderMax(tab));
      button.title = `${rw}:${rh} → ${w} × ${h}`;
      button.classList.toggle('active', Boolean(now) && Math.abs(Math.log(now / (rw / rh))) < 0.03);
    }
    for (const button of panel.base.querySelectorAll<HTMLButtonElement>('.lobe-size-chip')) {
      const value = Number(button.dataset.base);
      button.classList.toggle('active', value === baseChoice[tab]);
      if (!value) button.innerHTML = `${text.auto}${autoBase(arch) ? ` <small>${autoBase(arch)}</small>` : ''}`;
    }
    panel.lock.classList.toggle('active', Boolean(locked[tab]));
  };

  const drawSuggestions = (panel: Panel) => {
    const { suggested, tab } = panel;
    suggested.textContent = '';
    const label = document.createElement('span');
    label.className = 'lobe-size-label';
    label.textContent = text.suggested;
    suggested.append(label);
    const list = suggestionsFor(arch, checkpoint);
    if (ARCH_LABEL[arch]) {
      const family = document.createElement('span');
      family.className = 'lobe-size-family';
      family.textContent = ARCH_LABEL[arch];
      family.title = checkpoint;
      suggested.append(family);
    }
    if (!list.length) {
      const note = document.createElement('span');
      note.className = 'lobe-size-note';
      note.textContent = text.noSuggestions;
      suggested.append(note);
      return;
    }
    const hasDistilled = Boolean($(`#${tab}_distilled_cfg_scale`));
    for (const s of list) {
      const detail = `${s.steps} ${text.steps} · ${text.cfg} ${s.cfg}${s.distilled && hasDistilled ? ` · ${text.distilled} ${s.distilled}` : ''}`;
      suggested.append(chip(`${s.label} <small>${s.steps} / ${s.cfg}</small>`, detail, () => {
        setInputValue(numberInput(`${tab}_steps`), String(s.steps));
        setInputValue(numberInput(`${tab}_cfg_scale`), String(s.cfg));
        if (s.distilled && hasDistilled) setInputValue(numberInput(`${tab}_distilled_cfg_scale`), String(s.distilled));
      }));
    }
  };

  const drawAll = () => {
    for (const panel of panels) {
      drawRatios(panel);
      drawSuggestions(panel);
    }
  };

  const build = (tab: GenTab) => {
    const height = $(`#${tab}_height`);
    if (!height || height.parentElement?.querySelector(':scope > .lobe-size')) return false;
    const root = document.createElement('div');
    root.className = 'lobe-size';
    root.id = `lobe_size_${tab}`;

    const ratios = document.createElement('div');
    ratios.className = 'lobe-size-row';
    ratios.innerHTML = `<span class="lobe-size-label">${text.ratio}</span>`;
    RATIOS.forEach(([rw, rh], index) => {
      if (index === 6) {
        const sep = document.createElement('span');
        sep.className = 'lobe-size-sep';
        ratios.append(sep);
      }
      const button = chip(`${ratioIcon([rw, rh])}${rw}:${rh}`, `${rw}:${rh}`, () => {
        const [w, h] = sizeFor([rw, rh], baseOf(tab), sliderStep(tab), sliderMax(tab));
        if (locked[tab]) locked[tab] = [rw, rh];
        setSize(tab, w, h);
        setTimeout(() => drawAll(), 50);
      });
      button.dataset.ratio = `${rw}:${rh}`;
      ratios.append(button);
    });
    const lock = chip(LOCK, text.lock, () => {
      const w = readNumber(`${tab}_width`);
      const h = readNumber(`${tab}_height`);
      locked[tab] = locked[tab] || !w || !h ? undefined : [w, h];
      drawAll();
    });
    ratios.append(lock);

    const base = document.createElement('div');
    base.className = 'lobe-size-row';
    base.innerHTML = `<span class="lobe-size-label">${text.base}</span>`;
    for (const value of [0, ...BASES]) {
      const button = chip(value ? String(value) : text.auto, value ? `${value} × ${value}` : text.auto, () => {
        baseChoice[tab] = value;
        resizeToBase(tab);
        setTimeout(() => drawAll(), 50);
      });
      button.dataset.base = String(value);
      base.append(button);
    }

    const suggested = document.createElement('div');
    suggested.className = 'lobe-size-row';
    root.append(ratios, base, suggested);
    height.after(root);
    const panel = { base, lock, ratios, root, suggested, tab };
    panels.push(panel);
    drawRatios(panel);
    drawSuggestions(panel);

    // the lock: moving one slider moves the other to keep the shape
    const follow = (source: 'width' | 'height') => () => {
      const shape = locked[tab];
      if (!shape) return drawRatios(panel);
      const step = sliderStep(tab);
      const value = readNumber(`${tab}_${source}`);
      if (!value) return;
      const other = source === 'width' ? value * shape[1] / shape[0] : value * shape[0] / shape[1];
      const rounded = Math.min(sliderMax(tab), Math.max(step, Math.round(other / step) * step));
      const target = source === 'width' ? 'height' : 'width';
      if (readNumber(`${tab}_${target}`) !== rounded) setInputValue(numberInput(`${tab}_${target}`), String(rounded));
      drawRatios(panel);
    };
    for (const source of ['width', 'height'] as const) {
      for (const input of document.querySelectorAll(`#${tab}_${source} input`)) {
        input.addEventListener('change', follow(source));
        input.addEventListener('input', () => setTimeout(() => drawRatios(panel), 0));
      }
    }
    return true;
  };

  const refreshModel = async() => {
    const [a, model] = await Promise.all([currentArch(), getModel()]);
    const name = ($<HTMLInputElement>('#setting_sd_model_checkpoint input')?.value || model.checkpoint || '').trim();
    const found = a === 'unknown' ? guessArch(name) : a;
    if (found === arch && name === checkpoint) return;
    arch = found;
    checkpoint = name;
    drawAll();
  };

  let tries = 0;
  const mount = setInterval(() => {
    const done = (['txt2img', 'img2img'] as GenTab[]).map((tab) => panels.some((p) => p.tab === tab) || build(tab));
    if (done.every(Boolean) || ++tries > 60) clearInterval(mount);
  }, 500);

  refreshModel().catch(() => undefined);
  // suggestions follow the model and Forge's UI preset as they change
  let signature = '';
  let idle = 0;
  const watch = setInterval(() => {
    const now = `${presetValue()}|${$<HTMLInputElement>('#setting_sd_model_checkpoint input')?.value || ''}`;
    // until the server knows the loaded model, ask again now and then
    if (now === signature && (arch !== 'unknown' || ++idle % 4)) return;
    signature = now;
    refreshModel().catch(() => undefined);
  }, 1500);

  return () => {
    clearInterval(mount);
    clearInterval(watch);
    style.remove();
    for (const panel of panels) panel.root.remove();
  };
};
