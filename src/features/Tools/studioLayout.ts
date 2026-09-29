/**
 * The Studio layouts of txt2img and img2img: a column of controls and the
 * result side by side, each as tall as the window, instead of the prompt
 * across the top with the settings and the result under it.
 *
 * The controls column shows one thing at a time, chosen at its top:
 *   Prompt       the prompt and negative prompt, with their tools and styles
 *   Parameters   sampler, size, seed, Hires. fix... (and img2img's image)
 *   Extensions   the extensions' blocks (ADetailer, ControlNet...) and scripts
 * Generate stays in view in all three.
 *
 * Only the layout changes: the WebUI's own blocks are laid out with a CSS grid
 * (their wrappers become `display: contents`); nothing is moved or rebuilt,
 * so every extension finds its elements where it expects them. The one thing
 * added is the switcher at the top of the column.
 */
import { PenLine, Puzzle, SlidersHorizontal } from 'lucide-static';

import { $ } from '@/scripts/webui';

export interface StudioText {
  extensions: string;
  parameters: string;
  prompt: string;
}

type Panel = 'prompt' | 'params' | 'ext';

const STYLE_ID = 'lobe-studio-style';
const STORE = 'lobe-studio-panel';
const HTML_CLASS = 'lobe-studio';
const MIRROR_CLASS = 'lobe-studio-mirror';
const TABS = ['txt2img', 'img2img'] as const;

const css = () => {
  const rules: string[] = [];
  for (const tab of TABS) {
    const root = `html.${HTML_CLASS} #tab_${tab}:not([style*="display: none"])`;
    rules.push(`@media (min-width: 1001px) {
${root} {
  display: grid !important;
  grid-template-columns: minmax(340px, var(--lobe-studio-left, 36%)) minmax(0, 1fr);
  grid-template-rows: auto auto minmax(0, 1fr);
  column-gap: 16px; row-gap: 10px;
  height: calc(100vh - 32px); min-height: 0; padding: 0 !important;
}
html.${MIRROR_CLASS} #tab_${tab}:not([style*="display: none"]) {
  grid-template-columns: minmax(0, 1fr) minmax(340px, var(--lobe-studio-left, 36%));
}
${root} > .gap, ${root} > .gap > #${tab}_toprow,
${root} > #${tab}_render, ${root} > #${tab}_render > .gap, ${root} > #${tab}_render > .gap > .gradio-row {
  display: contents !important;
}
${root} .lobe-studio-switch { grid-column: 1; grid-row: 1; }
${root} #${tab}_actions_column { grid-column: 1; grid-row: 2; min-width: 0 !important; max-width: none !important; margin: 0 !important; }
${root} #${tab}_prompt_container, ${root} #${tab}_settings {
  grid-column: 1; grid-row: 3; min-width: 0 !important; min-height: 0; overflow: hidden auto; max-width: none !important;
  margin: 0 !important; padding-inline-end: 4px; flex-wrap: nowrap !important;
}
${root} #${tab}_settings > * { flex-shrink: 0 !important; }
${root} #${tab}_prompt_container { display: flex !important; flex-direction: column; gap: 14px; padding-top: 12px !important; }
${root} #${tab}_prompt_container > .prompt-row { flex: 1 1 0; min-height: 120px; }
${root} #${tab}_prompt_container > .prompt-row :is(.form, .block, label, .lobe-sections):not(.token-counter, .token-counter *) { height: 100%; }
/* the WebUI's token counters float in the prompt's corner: their own size, not the prompt's */
${root} #${tab}_prompt_container .token-counter, ${root} #${tab}_prompt_container .token-counter * { height: auto !important; min-height: 0 !important; }
${root} #${tab}_prompt_container > .prompt-row textarea { height: 100% !important; max-height: none !important; }
${root} #${tab}_render > .gap > .gradio-row > .resize-handle { display: none !important; }
${root} #${tab}_results {
  grid-column: 2; grid-row: 1 / span 3; min-width: 0 !important; min-height: 0; max-width: none !important;
  display: flex !important; flex-direction: column; overflow: hidden auto; margin: 0 !important;
}
html.${MIRROR_CLASS} #tab_${tab}:not([style*="display: none"]) :is(.lobe-studio-switch, #${tab}_actions_column, #${tab}_prompt_container, #${tab}_settings) { grid-column: 2; }
html.${MIRROR_CLASS} #tab_${tab}:not([style*="display: none"]) #${tab}_results { grid-column: 1; }
/* the image fills the column; the generation info, the Impact ADetailer comparer and anything else
   under the gallery come after it, and the column scrolls. Nothing may squeeze the gallery. */
${root} #${tab}_results > .panel, ${root} #${tab}_results_panel { flex: none !important; display: flex !important; flex-direction: column; min-height: 100%; }
${root} #${tab}_results_panel > * { flex-shrink: 0 !important; }
${root} #${tab}_gallery_container { flex: none !important; height: auto !important; min-height: 0; }
${root} #${tab}_gallery { flex: none !important; height: max(320px, calc(100vh - 72px)) !important; }
${root} #${tab}_gallery_container:has(#iad-dock:not([style*="display: none"])) #${tab}_gallery { height: max(280px, 52vh) !important; }

/* one panel at a time */
${root}[data-lobe-panel="prompt"] #${tab}_settings { display: none !important; }
${root}:is([data-lobe-panel="params"], [data-lobe-panel="ext"]) #${tab}_prompt_container,
${root}:is([data-lobe-panel="params"], [data-lobe-panel="ext"]) :is(#${tab}_tools, #${tab}_styles_row) { display: none !important; }
${root}[data-lobe-panel="params"] #${tab}_script_container { display: none !important; }
${root}[data-lobe-panel="ext"] #${tab}_settings > :not(#${tab}_script_container) { display: none !important; }
}`);
  }
  rules.push(`
.lobe-studio-switch {
  display: flex; gap: 4px; padding: 4px; border-radius: 10px;
  background: var(--background-fill-secondary, rgba(128,128,128,0.08));
  border: 1px solid var(--border-color-primary);
}
.lobe-studio-switch > button {
  flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 6px;
  min-height: 34px; padding: 0 10px; cursor: pointer; font-size: 13px; font-weight: 500;
  color: var(--body-text-color-subdued); background: transparent; border: none; border-radius: 7px;
}
.lobe-studio-switch > button:hover { color: var(--body-text-color); background: var(--background-fill-primary, rgba(128,128,128,0.12)); }
.lobe-studio-switch > button[aria-pressed="true"] {
  color: var(--button-primary-text-color, #fff); background: var(--button-primary-background-fill, var(--color-accent));
}
.lobe-studio-switch svg { width: 16px; height: 16px; flex: none; }
/* narrow windows: the usual layout, without the switcher */
@media (max-width: 1000px) { .lobe-studio-switch { display: none !important; } }
`);
  return rules.join('\n');
};

const readStore = (): Record<string, Panel> => {
  try {
    return JSON.parse(localStorage.getItem(STORE) || '{}') || {};
  } catch {
    return {};
  }
};

const icon = (svg: string) => svg.replace(/width="24"/, 'width="16"').replace(/height="24"/, 'height="16"');

export const startStudioLayout = (options: { mirror: boolean; text: StudioText }) => {
  const { mirror, text } = options;
  const root = document.documentElement;
  root.classList.add(HTML_CLASS);
  root.classList.toggle(MIRROR_CLASS, mirror);
  if (!document.getElementById(STYLE_ID)) {
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = css();
    document.head.append(style);
  }

  const switches: HTMLElement[] = [];
  const install = (tab: (typeof TABS)[number]) => {
    const tabRoot = $(`#tab_${tab}`);
    const actions = $(`#${tab}_actions_column`);
    if (!tabRoot || !actions || tabRoot.querySelector('.lobe-studio-switch')) return !!tabRoot?.querySelector('.lobe-studio-switch');
    const bar = document.createElement('div');
    bar.className = 'lobe-studio-switch';
    bar.setAttribute('role', 'group');
    const set = (panel: Panel) => {
      tabRoot.dataset.lobePanel = panel;
      for (const button of bar.querySelectorAll('button')) {
        button.setAttribute('aria-pressed', String(button.dataset.panel === panel));
      }
      try {
        localStorage.setItem(STORE, JSON.stringify({ ...readStore(), [tab]: panel }));
      } catch {
        /* private window */
      }
    };
    for (const [panel, svg, label] of [
      ['prompt', PenLine, text.prompt],
      ['params', SlidersHorizontal, text.parameters],
      ['ext', Puzzle, text.extensions],
    ] as [Panel, string, string][]) {
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.panel = panel;
      button.title = label;
      button.innerHTML = `${icon(svg)}<span></span>`;
      (button.querySelector('span') as HTMLElement).textContent = label;
      button.addEventListener('click', () => set(panel));
      bar.append(button);
    }
    // inside the tab's first wrapper, which the grid flattens: a grid item like the rest
    (tabRoot.querySelector(':scope > .gap') || tabRoot).prepend(bar);
    switches.push(bar);
    set(readStore()[tab] || 'prompt');
    return true;
  };

  const done = new Set<string>();
  let timer: number | undefined;
  const tick = () => {
    for (const tab of TABS) if (!done.has(tab) && install(tab)) done.add(tab);
    if (done.size === TABS.length) window.clearInterval(timer);
  };
  timer = window.setInterval(tick, 500);
  tick();

  return () => {
    window.clearInterval(timer);
    root.classList.remove(HTML_CLASS, MIRROR_CLASS);
    for (const bar of switches) bar.remove();
    for (const tab of TABS) $(`#tab_${tab}`)?.removeAttribute('data-lobe-panel');
    document.getElementById(STYLE_ID)?.remove();
  };
};
