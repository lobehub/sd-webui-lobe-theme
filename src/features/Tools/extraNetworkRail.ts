/**
 * Extra network types (Textual Inversion, Hypernetworks, Checkpoints, Lora...)
 * as a vertical rail down the side of the Extra Network sidebar, instead of
 * a row of tabs that wraps into two or three lines in a narrow panel.
 *
 * The tab buttons stay the WebUI's own; only their layout changes. The one
 * DOM move: the WebUI puts the search and sort controls inside the tab row
 * (extraNetworks.js appends them there); here they go right after it, above
 * the cards, so the rail holds nothing but the tabs.
 */
import { Box, Layers, Network, Puzzle, Sparkles, Type } from 'lucide-static';

const STYLE_ID = 'lobe-extra-network-rail-style';
const RAIL = 72;

// [label test, key, icon, short label for the rail]
const ICONS: [RegExp, string, string, string][] = [
  [/textual|embedding/i, 'ti', Type, 'Embedding'],
  [/hypernet/i, 'hn', Network, 'Hypernet'],
  [/checkpoint/i, 'ckpt', Box, 'Checkpoint'],
  [/lora|lycoris|lyco/i, 'lora', Layers, 'LoRA'],
  [/wildcard|style/i, 'misc', Sparkles, ''],
];

const maskUrl = (svg: string) =>
  `url("data:image/svg+xml,${encodeURIComponent(svg.replaceAll(/\s+/g, ' ').replace('currentColor', 'black'))}")`;

const css = () => {
  const icons = [...ICONS.map(([, key, svg]) => [key, svg] as const), ['other', Puzzle] as const]
    .map(
      ([key, svg]) =>
        `.lobe-rail > .tab-nav > button[data-lobe-rail="${key}"]::before { -webkit-mask-image: ${maskUrl(svg)}; mask-image: ${maskUrl(svg)}; }`,
    )
    .join('\n');
  return `
.extra-networks.lobe-rail {
  display: grid !important; grid-template-columns: ${RAIL}px minmax(0, 1fr); grid-template-rows: auto minmax(0, 1fr);
  height: 100%; min-height: 0;
}
.extra-networks.lobe-rail > .tab-nav {
  grid-column: 1; grid-row: 1 / span 2;
  display: flex !important; flex-direction: column !important; flex-wrap: nowrap !important; align-items: stretch !important;
  justify-content: flex-start !important; gap: 4px; margin: 0 !important; padding: 8px 5px !important;
  overflow: hidden auto; border: none !important; border-inline-end: 1px solid var(--border-color-primary) !important;
}
.extra-networks.lobe-rail > .tab-nav > button {
  display: flex !important; flex-direction: column; align-items: center; justify-content: center; gap: 4px;
  flex: none !important; width: 100% !important; min-width: 0 !important; height: auto !important; min-height: 56px;
  margin: 0 !important; padding: 8px 2px !important;
  font-size: 0 !important; line-height: 1.15 !important; text-align: center;
  color: var(--body-text-color-subdued) !important; background: transparent !important;
  border: none !important; border-radius: 8px !important; box-shadow: none !important;
}
.extra-networks.lobe-rail > .tab-nav > button:first-child { display: none !important; }
.extra-networks.lobe-rail > .tab-nav > button:hover { color: var(--body-text-color) !important; background: var(--background-fill-secondary, rgba(128,128,128,0.12)) !important; }
.extra-networks.lobe-rail > .tab-nav > button.selected {
  color: var(--color-accent, var(--body-text-color)) !important;
  background: var(--button-secondary-background-fill-hover, rgba(128,128,128,0.2)) !important;
}
.lobe-rail > .tab-nav > button::after {
  content: attr(data-lobe-short); display: block; max-width: 100%; overflow: hidden; text-overflow: ellipsis;
  white-space: nowrap; font-size: 10px; font-weight: 500; letter-spacing: 0.01em;
}
.lobe-rail > .tab-nav > button::before {
  content: ''; flex: none; width: 20px; height: 20px; background: currentColor;
  -webkit-mask-position: center; mask-position: center; -webkit-mask-size: contain; mask-size: contain;
  -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat;
}
${icons}
.extra-networks.lobe-rail > .extra-networks-controls-div { grid-column: 2; grid-row: 1; min-width: 0; padding: 12px 12px 4px; }
.extra-networks.lobe-rail > .extra-networks-controls-div .extra-network-control { flex-wrap: wrap; gap: 6px; }
.extra-networks.lobe-rail > .tabitem { grid-column: 2; grid-row: 2; min-width: 0; min-height: 0; }
`;
};

const railOf = (label: string) => {
  const found = ICONS.find(([test]) => test.test(label));
  return { key: found?.[1] || 'other', short: found?.[3] || label.trim() };
};

/** The per-tab holder in the sidebar's footer, for what extensions add to the tabs row. */
const footerBox = (root: HTMLElement) => {
  const slot = document.querySelector('#lobe-extra-network-footer-slot');
  if (!slot) return null;
  const tab = root.id.replace(/_extra_tabs$/, '');
  let box = slot.querySelector<HTMLElement>(`:scope > [data-tab="${tab}"]`);
  if (!box) {
    box = document.createElement('div');
    box.dataset.tab = tab;
    slot.append(box);
  }
  // only the open tab's controls show
  box.hidden = !root.offsetParent;
  return box;
};

const install = (root: HTMLElement) => {
  const nav = root.querySelector(':scope > .tab-nav');
  if (!nav) return;
  root.classList.add('lobe-rail');
  for (const button of nav.querySelectorAll(':scope > button')) {
    const { key, short } = railOf(button.textContent || '');
    if (button.getAttribute('data-lobe-rail') !== key) button.setAttribute('data-lobe-rail', key);
    if (button.getAttribute('data-lobe-short') !== short) button.setAttribute('data-lobe-short', short);
    if (!button.getAttribute('title')) button.setAttribute('title', (button.textContent || '').trim());
  }
  const controls = nav.querySelector(':scope > .extra-networks-controls-div');
  if (controls) nav.after(controls);
  // anything else an extension put in the tabs row (a card-size slider, a button...) would be
  // squeezed into the rail: it goes to the sidebar's footer, next to the card size slider
  // (the same for what is added beside the tabs row: in the grid it would push the cards down)
  const box = footerBox(root);
  if (box) {
    const strays = [
      ...[...nav.children].filter(
        (child) => child.tagName !== 'BUTTON' && !child.classList.contains('extra-networks-controls-div'),
      ),
      ...[...root.children].filter(
        (child) =>
          child !== nav &&
          !child.classList.contains('extra-networks-controls-div') &&
          !child.classList.contains('tabitem') &&
          !(child instanceof HTMLStyleElement) &&
          !(child instanceof HTMLScriptElement),
      ),
    ];
    for (const child of strays) {
      child.setAttribute('data-lobe-moved', child.parentElement === nav ? 'nav' : 'root');
      box.append(child);
    }
  }
};

const restore = (root: HTMLElement) => {
  root.classList.remove('lobe-rail');
  const nav = root.querySelector(':scope > .tab-nav');
  const controls = root.querySelector(':scope > .extra-networks-controls-div');
  if (nav && controls) nav.append(controls);
  const tab = root.id.replace(/_extra_tabs$/, '');
  const box = document.querySelector(`#lobe-extra-network-footer-slot > [data-tab="${tab}"]`);
  if (nav && box) {
    for (const child of [...box.children]) {
      const from = child.getAttribute('data-lobe-moved');
      child.removeAttribute('data-lobe-moved');
      (from === 'root' ? root : nav).append(child);
    }
    box.remove();
  }
};

export const startExtraNetworkRail = () => {
  if (!document.getElementById(STYLE_ID)) {
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = css();
    document.head.append(style);
  }
  const roots = () =>
    ['txt2img', 'img2img']
      .map((tab) => gradioApp().querySelector<HTMLElement>(`#${tab}_extra_tabs`))
      .filter(Boolean) as HTMLElement[];

  // the WebUI moves the controls into the tab row once its cards load, extensions add tabs and
  // controls later, and the footer shows the open tab's: look again now and then (cheap)
  const tick = () => {
    for (const root of roots()) install(root);
  };
  tick();
  const timer = window.setInterval(tick, 500);

  return () => {
    window.clearInterval(timer);
    for (const root of roots()) restore(root);
    document.getElementById(STYLE_ID)?.remove();
  };
};
