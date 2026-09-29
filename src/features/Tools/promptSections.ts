/**
 * Prompt sections: the positive prompt as two or more boxes instead of one,
 * joined with BREAK.
 *
 * The WebUI's own prompt box stays the one real prompt. The sections are only
 * another view of it: typing in a section writes all of them back into it,
 * joined with "\nBREAK\n", so generation, the infotext, PNG Info, styles and
 * every extension see the usual prompt with BREAK in it. Turned off, the
 * sections go away and the joined prompt is simply there in the one box.
 *
 * When something else changes the prompt (paste, Send to txt2img, PNG Info,
 * a style, another extension), the sections are rebuilt from it, split at
 * each BREAK.
 */
import { Plus, Rows3, X } from 'lucide-static';

import { adoptButtonClass } from '@/features/Share/createButton';
import { type GenTab, $, setInputValue } from '@/scripts/webui';

export interface PromptSectionsText {
  add: string;
  merge: string;
  section: string;
  toggle: string;
  tokens: string;
}

// the WebUI's own rule: re.compile(r"\s*\bBREAK\b\s*", re.S)
const SPLIT = /\s*\bBREAK\b\s*/;
const JOIN = '\nBREAK\n';
const MAX = 6;
const STORE = 'lobe-prompt-sections';
const STYLE_ID = 'lobe-prompt-sections-style';

const CSS = `
.lobe-sections { display: flex; flex-direction: column; gap: 8px; }
.lobe-sections[hidden] { display: none !important; }
.lobe-section { position: relative; display: flex; flex-direction: column; gap: 4px; }
.lobe-section-head { display: flex; align-items: center; gap: 8px; min-height: 22px; font-size: 12px; color: var(--body-text-color-subdued); }
.lobe-section-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--lobe-section-color); flex: none; }
.lobe-section-name { font-weight: 600; color: var(--body-text-color); }
.lobe-section-tokens { margin-left: auto; font-variant-numeric: tabular-nums; }
/* the WebUI's own token counter (the whole prompt) floats over the first section's corner */
.lobe-section:first-child .lobe-section-head { padding-right: 76px; }
.lobe-section-tokens.lobe-over { color: var(--color-accent, #f59e0b); font-weight: 600; }
.lobe-section textarea {
  box-sizing: border-box; width: 100%; min-height: 64px; resize: vertical; margin: 0;
  padding: var(--input-padding, 10px); font: inherit; font-size: var(--input-text-size, 14px); line-height: 1.5;
  color: var(--body-text-color); background: var(--input-background-fill);
  border: 1px solid var(--input-border-color, var(--border-color-primary));
  border-left: 3px solid var(--lobe-section-color);
  border-radius: var(--input-radius, 8px); outline: none;
}
.lobe-section textarea:focus { border-color: var(--lobe-section-color); box-shadow: 0 0 0 1px var(--lobe-section-color); }
.lobe-section-mini {
  display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px; padding: 0;
  color: var(--body-text-color-subdued); background: transparent; border: none; border-radius: 6px; cursor: pointer;
}
.lobe-section-mini:hover { color: var(--body-text-color); background: var(--background-fill-secondary, rgba(128,128,128,0.15)); }
.lobe-section-mini svg { width: 14px; height: 14px; }
.lobe-section-add {
  display: inline-flex; align-items: center; justify-content: center; gap: 6px; align-self: flex-start;
  min-height: 32px; padding: 4px 12px; font-size: 13px; cursor: pointer;
  color: var(--body-text-color-subdued); background: transparent;
  border: 1px dashed var(--border-color-primary); border-radius: var(--input-radius, 8px);
}
.lobe-section-add:hover { color: var(--body-text-color); border-color: var(--body-text-color-subdued); }
.lobe-section-add svg { width: 14px; height: 14px; }
.lobe-section-add[disabled] { opacity: 0.4; cursor: default; }
button.lobe-sections-toggle svg { width: 16px; height: 16px; }
button.lobe-sections-toggle.lobe-on { color: var(--color-accent, #7c5cff) !important; box-shadow: inset 0 0 0 1px currentColor; }
`;

const readStore = (): Record<string, boolean> => {
  try {
    return JSON.parse(localStorage.getItem(STORE) || '{}') || {};
  } catch {
    return {};
  }
};
const writeStore = (tab: GenTab, on: boolean) => {
  try {
    localStorage.setItem(STORE, JSON.stringify({ ...readStore(), [tab]: on }));
  } catch {
    /* private window */
  }
};

/** Roughly the CLIP tokens of a text, without weights and brackets: enough to see a section run past 75. */
export const estimateTokens = (text: string) => {
  const clean = text
    .replaceAll(/<[^>]*>/g, ' ')
    .replaceAll(/:\s*-?[\d.]+\s*\)/g, ')')
    .replaceAll(/[()[\]{}]/g, ' ');
  return (clean.match(/[\dA-Za-zÀ-ɏ]+|[^\s\w]/g) || []).length;
};

export const splitPrompt = (prompt: string) => prompt.split(SPLIT).map((part) => part.trim());
export const joinSections = (parts: string[]) =>
  parts
    .map((part) => part.trim())
    .filter(Boolean)
    .join(JOIN);

const icon = (svg: string, size = 16) =>
  svg.replace(/width="24"/, `width="${size}"`).replace(/height="24"/, `height="${size}"`);

interface Tab {
  add: HTMLButtonElement;
  boxes: HTMLTextAreaElement[];
  host: HTMLDivElement;
  last: string;
  on: boolean;
  prompt: HTMLElement;
  real: HTMLTextAreaElement;
  toggle: HTMLButtonElement;
}

export const startPromptSections = (options: { colors: string[]; text: PromptSectionsText }) => {
  const { colors, text } = options;
  const tabs = new Map<GenTab, Tab>();
  const cleanups: (() => void)[] = [];

  if (!document.getElementById(STYLE_ID)) {
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = CSS;
    document.head.append(style);
  }

  const write = (state: Tab) => {
    const joined = joinSections(state.boxes.map((box) => box.value));
    state.last = joined;
    if (state.real.value !== joined) setInputValue(state.real, joined);
  };

  const updateCounts = (state: Tab) => {
    for (const box of state.boxes) {
      const label = box.parentElement?.querySelector('.lobe-section-tokens');
      if (!label) continue;
      const count = estimateTokens(box.value);
      label.textContent = `≈ ${count} ${text.tokens}`;
      label.classList.toggle('lobe-over', count > 75);
    }
  };

  const render = (state: Tab, values: string[], focus?: number) => {
    const parts = [...values];
    while (parts.length < 2) parts.push('');
    parts.splice(MAX);
    state.host.replaceChildren();
    state.boxes = parts.map((part, index) => {
      const wrap = document.createElement('div');
      wrap.className = 'lobe-section';
      wrap.style.setProperty('--lobe-section-color', colors[index % colors.length]);

      const head = document.createElement('div');
      head.className = 'lobe-section-head';
      head.innerHTML =
        `<span class="lobe-section-dot"></span><span class="lobe-section-name"></span>` +
        `<span class="lobe-section-tokens"></span>`;
      (head.querySelector('.lobe-section-name') as HTMLElement).textContent = `${text.section} ${index + 1}`;
      if (parts.length > 2) {
        const merge = document.createElement('button');
        merge.type = 'button';
        merge.className = 'lobe-section-mini';
        merge.title = text.merge;
        merge.innerHTML = icon(X, 14);
        merge.addEventListener('click', () => {
          const values = state.boxes.map((box) => box.value);
          const [removed] = values.splice(index, 1);
          // its text is not lost: it goes to the end of the section before it (or after it, for the first)
          const into = Math.max(0, index - 1);
          if (removed.trim()) {
            values[into] = [values[into].trim().replace(/,\s*$/, ''), removed.trim()].filter(Boolean).join(', ');
          }
          render(state, values, into);
          write(state);
        });
        head.append(merge);
      }

      const box = document.createElement('textarea');
      box.value = part;
      box.rows = 3;
      box.spellcheck = false;
      box.addEventListener('input', () => {
        write(state);
        updateCounts(state);
      });
      // BREAK typed by hand: split there when the box is left
      box.addEventListener('change', () => {
        if (!SPLIT.test(box.value)) return;
        const values = state.boxes.flatMap((b) => (b === box ? splitPrompt(b.value) : [b.value]));
        render(state, values);
        write(state);
      });
      wrap.append(head, box);
      state.host.append(wrap);
      return box;
    });
    state.add.disabled = state.boxes.length >= MAX;
    state.host.append(state.add);
    updateCounts(state);
    if (focus !== undefined) state.boxes[Math.min(focus, state.boxes.length - 1)]?.focus();
  };

  const setOn = (tab: GenTab, on: boolean) => {
    const state = tabs.get(tab);
    if (!state) return;
    state.on = on;
    writeStore(tab, on);
    state.toggle.classList.toggle('lobe-on', on);
    if (on) {
      state.last = state.real.value;
      render(state, splitPrompt(state.real.value));
      state.prompt.style.display = 'none';
      state.host.hidden = false;
    } else {
      write(state);
      state.host.hidden = true;
      state.host.replaceChildren();
      state.boxes = [];
      state.prompt.style.display = '';
    }
  };

  const install = (tab: GenTab): boolean => {
    if (tabs.has(tab)) return true;
    const prompt = $(`#${tab}_prompt`);
    const real = $<HTMLTextAreaElement>(`#${tab}_prompt textarea`);
    const row = $(`#${tab}_tools > div.form`) || $(`#${tab}_tools`);
    if (!prompt || !real || !row) return false;

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.id = `lobe_${tab}_sections`;
    toggle.className = 'lg secondary gradio-button tool lobe-sections-toggle';
    adoptButtonClass(toggle, row);
    toggle.classList.add('lobe-sections-toggle');
    toggle.title = text.toggle;
    toggle.innerHTML = icon(Rows3);
    toggle.addEventListener('click', () => setOn(tab, !tabs.get(tab)?.on));
    row.append(toggle);

    const host = document.createElement('div');
    // "prompt": the WebUI's Ctrl+Up / Ctrl+Down weight keys work in the sections too
    host.className = 'lobe-sections prompt';
    host.id = `lobe_${tab}_sections_host`;
    host.hidden = true;
    prompt.parentElement?.insertBefore(host, prompt.nextSibling);

    const add = document.createElement('button');
    add.type = 'button';
    add.className = 'lobe-section-add';
    add.innerHTML = `${icon(Plus, 14)}<span></span>`;
    (add.querySelector('span') as HTMLElement).textContent = text.add;

    const state: Tab = { add, boxes: [], host, last: real.value, on: false, prompt, real, toggle };
    add.addEventListener('click', () => {
      render(state, [...state.boxes.map((box) => box.value), ''], state.boxes.length);
    });
    tabs.set(tab, state);
    cleanups.push(() => {
      if (state.on) {
        write(state);
        prompt.style.display = '';
      }
      toggle.remove();
      host.remove();
    });
    if (readStore()[tab]) setOn(tab, true);
    return true;
  };

  // the prompt changed from outside: paste, Send to, PNG Info, styles, other extensions
  const timer = window.setInterval(() => {
    for (const tab of ['txt2img', 'img2img'] as GenTab[]) {
      if (!tabs.has(tab)) {
        install(tab);
        continue;
      }
      const state = tabs.get(tab)!;
      if (!state.on || state.real.value === state.last) continue;
      if (state.host.contains(document.activeElement)) continue;
      state.last = state.real.value;
      render(state, splitPrompt(state.real.value));
    }
  }, 400);

  return () => {
    window.clearInterval(timer);
    for (const cleanup of cleanups) cleanup();
    document.getElementById(STYLE_ID)?.remove();
  };
};
