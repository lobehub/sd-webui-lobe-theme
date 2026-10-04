/**
 * Chaotic seeds, under Seed in txt2img and img2img (the reForge extension of
 * the same name, built into the theme): a toggle and a min-max number of
 * digits. The seeds are rolled by scripts/chaotic_seeds.py, one per image of
 * the job, so seeds jump across magnitudes instead of all landing around ten
 * digits as -1 does; this side draws the controls and keeps the script's
 * hidden state box ("" off, "4-15" on) in step with them, both ways: pasted
 * parameters set the box, and the controls follow.
 */
import { readableColor } from 'polished';
import { $, type GenTab, setInputValue } from '@/scripts/webui';

export interface ChaoticSeedsText {
  digits: string;
  hint: string;
  title: string;
  toggle: string;
}

export const MIN_DIGITS = 1;
export const MAX_DIGITS = 15;

export interface TabState {
  enabled: boolean;
  max: number;
  min: number;
}

const STORAGE_KEY = 'lobe-chaotic-seeds';
const DEFAULT_STATE: TabState = { enabled: false, max: 15, min: 4 };

const load = (): Record<GenTab, TabState> => {
  let saved: Partial<Record<GenTab, Partial<TabState>>> = {};
  try {
    saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') || {};
  } catch {
    // nothing saved, or storage blocked
  }
  return {
    img2img: { ...DEFAULT_STATE, ...saved.img2img },
    txt2img: { ...DEFAULT_STATE, ...saved.txt2img },
  };
};

/** The script's state box value: "" off, "min-max" on. */
export const serialize = ({ enabled, max, min }: TabState) => (enabled ? `${Math.min(min, max)}-${Math.max(min, max)}` : '');

/** The controls from a state box value; a value that is not a range turns it off. */
export const parse = (value: string, current: TabState): TabState => {
  const match = value.trim().match(/^(\d+)\s*-\s*(\d+)$/);
  if (!match) return { ...current, enabled: false };
  const clamp = (n: number) => Math.min(MAX_DIGITS, Math.max(MIN_DIGITS, n));
  const [lo, hi] = [clamp(Number(match[1])), clamp(Number(match[2]))];
  return { enabled: true, max: Math.max(lo, hi), min: Math.min(lo, hi) };
};

const stateBox = (tab: GenTab) =>
  $<HTMLTextAreaElement>(`#lobe_chaotic_seeds_${tab} textarea`) || $<HTMLInputElement>(`#lobe_chaotic_seeds_${tab} input`);

const DICE = '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.2" fill="currentColor"/><circle cx="15.5" cy="15.5" r="1.2" fill="currentColor"/><circle cx="15.5" cy="8.5" r="1.2" fill="currentColor"/><circle cx="8.5" cy="15.5" r="1.2" fill="currentColor"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/></svg>';

const CSS = `
.lobe-chaos { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; margin: 6px 0 4px; padding: 6px 10px; background: var(--lobe-chaos-fill, rgb(128 128 128 / 8%)); border-radius: 10px; }
.lobe-chaos-chip { display: inline-flex; gap: 5px; align-items: center; height: 26px; padding: 0 9px !important; min-width: 0 !important; font-size: 12px !important; line-height: 1;
  color: inherit !important; cursor: pointer; background: transparent !important; border: 1px solid var(--lobe-chaos-border, rgb(128 128 128 / 30%)) !important; border-radius: 13px !important; box-shadow: none !important; }
.lobe-chaos-chip:hover { border-color: var(--lobe-chaos-primary, #1677ff) !important; }
.lobe-chaos-chip.active { color: var(--lobe-chaos-on-primary, #fff) !important; background: var(--lobe-chaos-primary, #1677ff) !important; border-color: var(--lobe-chaos-primary, #1677ff) !important; }
.lobe-chaos-digits { display: inline-flex; gap: 4px; align-items: center; font-size: 12px; }
.lobe-chaos-digits > span { font-weight: 600; opacity: 0.7; }
.lobe-chaos select { height: 26px; padding: 0 4px; font-size: 12px; color: inherit; background: transparent; border: 1px solid var(--lobe-chaos-border, rgb(128 128 128 / 30%)); border-radius: 6px; }
.lobe-chaos select option { color: initial; }
.lobe-chaos-hint { flex-basis: 100%; font-size: 11.5px; opacity: 0.65; }
.lobe-chaos:not(.on) .lobe-chaos-hint { display: none; }
.lobe-chaos-on[id$='_seed'] input, .lobe-chaos-on [id$='_seed'] input { opacity: 0.45; }
`;

interface Panel {
  hint: HTMLElement;
  max: HTMLSelectElement;
  min: HTMLSelectElement;
  root: HTMLElement;
  row: HTMLElement;
  tab: GenTab;
  toggle: HTMLButtonElement;
}

export const startChaoticSeeds = ({ colors, text }: { colors: { border: string; fill: string; primary: string }; text: ChaoticSeedsText }) => {
  if (document.querySelector('#lobe-chaotic-seeds-style')) return () => undefined;
  const style = document.createElement('style');
  style.id = 'lobe-chaotic-seeds-style';
  style.textContent = CSS;
  document.head.append(style);
  const rootStyle = document.documentElement.style;
  rootStyle.setProperty('--lobe-chaos-primary', colors.primary);
  rootStyle.setProperty('--lobe-chaos-on-primary', readableColor(colors.primary, '#111', '#fff', false));
  rootStyle.setProperty('--lobe-chaos-fill', colors.fill);
  rootStyle.setProperty('--lobe-chaos-border', colors.border);

  const state = load();
  const panels: Panel[] = [];
  const save = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // storage blocked: the choice lasts until the page reloads
    }
  };

  const written: Partial<Record<GenTab, string>> = {};
  const write = (tab: GenTab) => {
    const value = serialize(state[tab]);
    written[tab] = value;
    const box = stateBox(tab);
    if (box && box.value !== value) setInputValue(box, value);
  };

  const draw = (panel: Panel) => {
    const { enabled, max, min } = state[panel.tab];
    panel.root.classList.toggle('on', enabled);
    panel.row.classList.toggle('lobe-chaos-on', enabled);
    panel.toggle.classList.toggle('active', enabled);
    panel.min.value = String(min);
    panel.max.value = String(max);
  };

  const select = (value: number, onChange: (value: number) => void) => {
    const element = document.createElement('select');
    for (let digits = MIN_DIGITS; digits <= MAX_DIGITS; digits++) element.add(new Option(String(digits), String(digits)));
    element.value = String(value);
    element.addEventListener('change', () => onChange(Number(element.value)));
    return element;
  };

  const build = (tab: GenTab) => {
    const seed = $(`#${tab}_seed`);
    // no state box: the WebUI has not loaded the script (restart it after an update)
    if (!seed || !stateBox(tab)) return false;
    const row = $(`#${tab}_seed_row`) || seed;
    if (row.parentElement?.querySelector(':scope > .lobe-chaos')) return true;
    const root = document.createElement('div');
    root.className = 'lobe-chaos';
    root.id = `lobe_chaos_${tab}`;

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'lobe-chaos-chip';
    toggle.innerHTML = `${DICE}<span></span>`;
    toggle.querySelector('span')!.textContent = text.title;
    toggle.title = text.toggle;

    const digits = document.createElement('label');
    digits.className = 'lobe-chaos-digits';
    const label = document.createElement('span');
    label.textContent = text.digits;
    const dash = document.createElement('span');
    dash.textContent = '–';
    const panel: Panel = {
      hint: document.createElement('div'),
      max: select(state[tab].max, (value) => {
        state[tab].max = value;
        save();
        write(tab);
        draw(panel);
      }),
      min: select(state[tab].min, (value) => {
        state[tab].min = value;
        save();
        write(tab);
        draw(panel);
      }),
      root,
      row,
      tab,
      toggle,
    };
    toggle.addEventListener('click', (event) => {
      event.preventDefault();
      state[tab].enabled = !state[tab].enabled;
      save();
      write(tab);
      draw(panel);
    });
    panel.hint.className = 'lobe-chaos-hint';
    panel.hint.textContent = text.hint;
    digits.append(label, panel.min, dash, panel.max);
    root.append(toggle, digits, panel.hint);
    row.after(root);
    panels.push(panel);
    write(tab);
    draw(panel);
    return true;
  };

  // Pasted parameters (PNG Info, ↙️, history) set the box: the controls follow.
  const follow = setInterval(() => {
    for (const panel of panels) {
      const value = stateBox(panel.tab)?.value;
      if (value === undefined || value === written[panel.tab]) continue;
      state[panel.tab] = parse(value, state[panel.tab]);
      written[panel.tab] = value;
      save();
      draw(panel);
    }
  }, 1000);

  let tries = 0;
  const mount = setInterval(() => {
    const done = (['txt2img', 'img2img'] as GenTab[]).map((tab) => panels.some((p) => p.tab === tab) || build(tab));
    if (done.every(Boolean) || ++tries > 60) clearInterval(mount);
  }, 500);

  return () => {
    clearInterval(mount);
    clearInterval(follow);
    style.remove();
    for (const panel of panels) {
      const box = stateBox(panel.tab);
      if (box) setInputValue(box, '');
      panel.root.remove();
      panel.row.classList.remove('lobe-chaos-on');
    }
  };
};
