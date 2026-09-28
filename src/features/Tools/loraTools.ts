/**
 * Extra tools on the WebUI's own LoRA cards (the cards stay the WebUI's, so
 * its search, sort, refresh and metadata editor keep working):
 * - a star to mark favourites, and the model family the LoRA was trained for;
 * - a weight control per LoRA: the weight used when the card is clicked, and
 *   the weight of that LoRA's tag if it is already in the prompt;
 * - a button that adds the LoRA's trigger words to the prompt;
 * - a filter bar: all, favourites, recently used, compatible with the model.
 */
import { readableColor } from 'polished';
import { type GenTab, appendToPrompt, promptBox, setInputValue, webuiOpts } from '@/scripts/webui';

import type { Arch, LoraInfo } from './api';
import {
  ARCH_LABEL,
  cardAlias,
  currentArch,
  defaultWeight,
  formatWeight,
  isCompatible,
  loadLoraLists,
  presetValue,
  loadLoras,
  loraTagPattern,
  pushRecent,
  setWeight,
  toggleFavorite,
  weightOf,
} from './loraData';

type Filter = 'all' | 'favorites' | 'recent' | 'compatible';

export interface LoraToolsText {
  all: string;
  compatible: string;
  favorite: string;
  favorites: string;
  recent: string;
  triggerWords: string;
  weight: string;
}

const CONTAINERS = '[id$="_lora_cards"]';
const STAR = '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z"/></svg>';
const TAG = '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.6 2.6A2 2 0 0 0 11.2 2H4a2 2 0 0 0-2 2v7.2a2 2 0 0 0 .6 1.4l8.7 8.7a2.4 2.4 0 0 0 3.4 0l6.6-6.6a2.4 2.4 0 0 0 0-3.4z"/><circle cx="7.5" cy="7.5" r="1.5" fill="currentColor"/></svg>';

const CSS = `
.lobe-lora-hidden { display: none !important; }
[id$="_lora_cards"] .card { position: relative; }
.lobe-lora-corner { position: absolute; z-index: 3; top: 4px; left: 4px; display: flex; flex-direction: column; gap: 3px; align-items: flex-start; pointer-events: none; }
.lobe-lora-corner > * { pointer-events: auto; }
.lobe-lora-star { display: none; align-items: center; justify-content: center; width: 22px; height: 22px; padding: 0; color: rgb(255 255 255 / 85%); cursor: pointer; background: rgb(0 0 0 / 45%); border: none; border-radius: 6px; }
.lobe-lora-star svg { fill: none; }
.lobe-lora-star.active { display: flex; color: #fadb14; }
.lobe-lora-star.active svg { fill: currentColor; }
.card:hover .lobe-lora-star { display: flex; }
.lobe-lora-star:hover { color: #fadb14; }
.lobe-lora-badge { padding: 1px 5px; font-size: 10px; font-weight: 600; line-height: 14px; color: #fff; letter-spacing: 0.02em; background: rgb(0 0 0 / 55%); border-radius: 4px; }
.lobe-lora-badge.incompatible { color: #ffccc7; background: rgb(168 7 26 / 70%); }
.lobe-lora-badge.weight { color: var(--lobe-tools-on-primary, #fff); background: var(--lobe-tools-primary, #1677ff); }
.card:hover .lobe-lora-badge.weight { display: none; }
.lobe-lora-controls { display: none; gap: 2px; align-items: center; justify-content: center; width: fit-content; margin: 0 auto 4px; padding: 1px; background: rgb(0 0 0 / 55%); border-radius: 8px; }
.card:hover .lobe-lora-controls { display: flex; }
.lobe-lora-controls button { display: flex; align-items: center; justify-content: center; min-width: 20px; height: 22px; padding: 0 4px; font-size: 14px; line-height: 1; color: #fff; cursor: pointer; background: transparent; border: none; border-radius: 6px; }
.lobe-lora-controls button:hover { background: rgb(255 255 255 / 18%); }
.lobe-lora-controls .value { min-width: 30px; font-size: 12px; font-variant-numeric: tabular-nums; cursor: ns-resize; }
.lobe-lora-controls .value.custom { color: var(--lobe-tools-primary-light, #69b1ff); font-weight: 600; }
.lobe-lora-filter { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; padding: 0 16px 8px; }
.lobe-lora-filter button { padding: 2px 10px; font-size: 12px; line-height: 20px; color: var(--body-text-color, inherit); cursor: pointer; background: var(--lobe-tools-fill, rgb(128 128 128 / 12%)); border: 1px solid transparent; border-radius: 999px; }
.lobe-lora-filter button:hover { border-color: var(--lobe-tools-primary, #1677ff); }
.lobe-lora-filter button.active { color: var(--lobe-tools-on-primary, #fff); background: var(--lobe-tools-primary, #1677ff); }
.lobe-lora-filter .count { margin-left: auto; font-size: 12px; opacity: 0.6; }
`;

const round = (value: number) => Math.round(value * 100) / 100;
const clamp = (value: number) => Math.min(5, Math.max(-5, value));

const cardName = (card: HTMLElement) => card.dataset.name || '';

const tabOfContainer = (container: Element): GenTab =>
  container.id.startsWith('img2img') ? 'img2img' : 'txt2img';

export const startLoraTools = ({ colors, text }: { colors: { fill: string; primary: string; primaryLight: string }; text: LoraToolsText }) => {
  let infos = new Map<string, LoraInfo>();
  let favorites = new Set<string>();
  let recent: string[] = [];
  let modelArch: Arch = 'unknown';
  const filters = new Map<string, Filter>();
  let refetched = false;

  const style = document.createElement('style');
  style.id = 'lobe-lora-tools-style';
  style.textContent = CSS;
  document.head.append(style);
  document.documentElement.style.setProperty('--lobe-tools-primary', colors.primary);
  document.documentElement.style.setProperty('--lobe-tools-on-primary', readableColor(colors.primary, '#111', '#fff', false));
  document.documentElement.style.setProperty('--lobe-tools-primary-light', colors.primaryLight);
  document.documentElement.style.setProperty('--lobe-tools-fill', colors.fill);

  const renderCard = (card: HTMLElement) => {
    const name = cardName(card);
    if (!name) return;
    const info = infos.get(name);
    card.dataset.lobeLora = name;
    card.querySelector('.lobe-lora-corner')?.remove();
    card.querySelector('.lobe-lora-controls')?.remove();

    const corner = document.createElement('div');
    corner.className = 'lobe-lora-corner';
    const star = document.createElement('button');
    star.type = 'button';
    star.className = 'lobe-lora-star' + (favorites.has(name) ? ' active' : '');
    star.title = text.favorite;
    star.innerHTML = STAR;
    star.dataset.action = 'favorite';
    corner.append(star);
    const archLabel = info ? ARCH_LABEL[info.arch] : '';
    if (archLabel) {
      const badge = document.createElement('span');
      badge.className = 'lobe-lora-badge' + (isCompatible(info?.arch, modelArch) ? '' : ' incompatible');
      badge.textContent = archLabel;
      corner.append(badge);
    }
    const weight = weightOf(name);
    const custom = weight !== defaultWeight();
    if (custom) {
      const badge = document.createElement('span');
      badge.className = 'lobe-lora-badge weight';
      badge.textContent = formatWeight(weight);
      corner.append(badge);
    }

    const controls = document.createElement('div');
    controls.className = 'lobe-lora-controls';
    controls.innerHTML =
      `<button type="button" data-action="minus" title="${text.weight} −0.1">−</button>` +
      `<button type="button" class="value${custom ? ' custom' : ''}" data-action="reset" title="${text.weight}">${formatWeight(weight)}</button>` +
      `<button type="button" data-action="plus" title="${text.weight} +0.1">+</button>`;
    if (info?.triggerWords?.length) {
      const trigger = document.createElement('button');
      trigger.type = 'button';
      trigger.dataset.action = 'trigger';
      trigger.title = `${text.triggerWords}: ${info.triggerWords.join(', ')}`;
      trigger.innerHTML = TAG;
      controls.append(trigger);
    }
    // in the name block at the bottom, so the picture stays one big click target
    const actions = card.querySelector('.actions');
    if (actions) actions.prepend(controls);
    else card.append(controls);
    card.append(corner);
  };

  const applyFilter = (container: HTMLElement) => {
    const filter = filters.get(container.id) || 'all';
    const cards = [...container.querySelectorAll<HTMLElement>('.card')];
    let shown = 0;
    for (const card of cards) {
      const name = cardName(card);
      let visible = true;
      switch (filter) {
      case 'favorites': {
      visible = favorites.has(name);
      break;
      }
      case 'recent': {
      visible = recent.includes(name);
      break;
      }
      case 'compatible': { {
      visible = isCompatible(infos.get(name)?.arch, modelArch);
      // No default
      }
      break;
      }
      }
      card.classList.toggle('lobe-lora-hidden', !visible);
      card.style.order = filter === 'recent' && visible ? String(recent.indexOf(name)) : '';
      if (visible && card.style.display !== 'none') shown++;
    }
    const bar = container.previousElementSibling;
    if (bar?.classList.contains('lobe-lora-filter')) {
      for (const button of bar.querySelectorAll<HTMLButtonElement>('button[data-filter]')) {
        button.classList.toggle('active', button.dataset.filter === filter);
      }
      const archButton = bar.querySelector<HTMLButtonElement>('button[data-filter="compatible"]');
      if (archButton) {
        const label = ARCH_LABEL[modelArch];
        archButton.textContent = label ? `${text.compatible} · ${label}` : text.compatible;
      }
      const count = bar.querySelector('.count');
      if (count) count.textContent = filter === 'all' ? '' : `${shown} / ${cards.length}`;
    }
  };

  const refreshAll = () => {
    for (const card of document.querySelectorAll<HTMLElement>(`${CONTAINERS} .card`)) renderCard(card);
    for (const container of document.querySelectorAll<HTMLElement>(CONTAINERS)) applyFilter(container);
  };

  const ensureBar = (container: HTMLElement) => {
    const previous = container.previousElementSibling;
    if (previous?.classList.contains('lobe-lora-filter')) return;
    const bar = document.createElement('div');
    bar.className = 'lobe-lora-filter';
    const items: [Filter, string][] = [
      ['all', text.all],
      ['favorites', `★ ${text.favorites}`],
      ['recent', text.recent],
      ['compatible', text.compatible],
    ];
    for (const [filter, label] of items) {
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.filter = filter;
      button.textContent = label;
      bar.append(button);
    }
    const count = document.createElement('span');
    count.className = 'count';
    bar.append(count);
    bar.addEventListener('click', async(event) => {
      const button = (event.target as HTMLElement).closest<HTMLButtonElement>('button[data-filter]');
      if (!button) return;
      const filter = button.dataset.filter as Filter;
      filters.set(container.id, filter);
      if (filter === 'compatible') {
        modelArch = await currentArch();
        refreshAll();
      }
      applyFilter(container);
    });
    container.before(bar);
  };

  const decorate = () => {
    let missing = false;
    for (const container of document.querySelectorAll<HTMLElement>(CONTAINERS)) {
      ensureBar(container);
      for (const card of container.querySelectorAll<HTMLElement>('.card')) {
        const name = cardName(card);
        if (card.dataset.lobeLora === name && card.querySelector('.lobe-lora-corner')) continue;
        if (name && !infos.has(name)) missing = true;
        renderCard(card);
      }
      applyFilter(container);
    }
    // cards for LoRAs added since the list was fetched (WebUI refresh button)
    if (missing && !refetched) {
      refetched = true;
      loadLoras(true).then((map) => {
        infos = map;
        refreshAll();
        setTimeout(() => {
          refetched = false;
        }, 5000);
      });
    }
  };

  /** Change a LoRA's weight, and its tag in the prompt if it is there. */
  const changeWeight = (card: HTMLElement, weight: number | undefined) => {
    const name = cardName(card);
    setWeight(name, weight === undefined ? undefined : round(clamp(weight)));
    const value = weight === undefined ? defaultWeight() : round(clamp(weight));
    const alias = cardAlias(card) || name;
    const container = card.closest(CONTAINERS);
    const box = container ? promptBox(tabOfContainer(container)) : null;
    if (box) {
      const pattern = loraTagPattern(alias);
      if (pattern.test(box.value)) {
        setInputValue(box, box.value.replace(loraTagPattern(alias), (_m, _w, rest) => `<lora:${alias}:${formatWeight(value)}${rest}>`));
      }
    }
    renderCard(card);
  };

  const onClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const card = target.closest<HTMLElement>(`${CONTAINERS} .card`);
    if (!card) return;
    const actionElement = target.closest<HTMLElement>('[data-action]');
    const action = actionElement && card.contains(actionElement) ? actionElement.dataset.action : undefined;
    const name = cardName(card);
    if (action) {
      // a theme control on the card: keep the WebUI's card click from running
      event.stopPropagation();
      event.preventDefault();
      switch (action) {
      case 'favorite': {
        toggleFavorite(name).then((isFavorite) => {
          if (isFavorite) favorites.add(name);
          else favorites.delete(name);
          renderCard(card);
          const container = card.closest<HTMLElement>(CONTAINERS);
          if (container) applyFilter(container);
        });
      
      break;
      }
      case 'minus': {
        changeWeight(card, weightOf(name) - 0.1);
      
      break;
      }
      case 'plus': {
        changeWeight(card, weightOf(name) + 0.1);
      
      break;
      }
      case 'reset': {
        changeWeight(card, undefined);
      
      break;
      }
      case 'trigger': {
        const words = infos.get(name)?.triggerWords || [];
        const container = card.closest(CONTAINERS);
        if (words.length > 0 && container) {
          const tab = tabOfContainer(container);
          const current = promptBox(tab)?.value.toLowerCase() || '';
          const missingWords = words.filter((word) => !current.includes(word.toLowerCase()));
          if (missingWords.length > 0) appendToPrompt(tab, missingWords.join(', '));
        }
      
      break;
      }
      // No default
      }
      return;
    }
    // A plain card click: the WebUI inserts the tag with the default
    // multiplier, read from `opts` when the click runs. Use this LoRA's
    // weight for that one click.
    pushRecent(name).then(() => {
      recent = [name, ...recent.filter((item) => item !== name)].slice(0, 40);
    });
    const options = webuiOpts();
    const weight = weightOf(name);
    if (options && weight !== defaultWeight()) {
      const original = options.extra_networks_default_multiplier;
      options.extra_networks_default_multiplier = weight;
      setTimeout(() => {
        options.extra_networks_default_multiplier = original;
      }, 0);
    }
  };

  const onWheel = (event: WheelEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest('.lobe-lora-controls .value')) return;
    const card = target.closest<HTMLElement>(`${CONTAINERS} .card`);
    if (!card) return;
    event.preventDefault();
    changeWeight(card, weightOf(cardName(card)) + (event.deltaY < 0 ? 0.05 : -0.05));
  };

  let scheduled = false;
  const schedule = () => {
    if (scheduled) return;
    scheduled = true;
    setTimeout(() => {
      scheduled = false;
      decorate();
    }, 250);
  };
  const observer = new MutationObserver((records) => {
    for (const record of records) {
      if (record.type !== 'childList') continue;
      for (const node of record.addedNodes) {
        if (node instanceof HTMLElement && (node.matches?.('.card, [id$="_lora_cards"]') || node.querySelector?.('.card'))) {
          schedule();
          return;
        }
      }
    }
  });

  document.addEventListener('click', onClick, true);
  document.addEventListener('wheel', onWheel, { capture: true, passive: false });

  Promise.all([loadLoras(), loadLoraLists(), currentArch()]).then(([map, lists, arch]) => {
    infos = map;
    favorites = new Set(lists.favorites);
    recent = lists.recent;
    modelArch = arch;
    decorate();
    // the theme moves the extra-network panes into its sidebar, outside #tabs
    observer.observe(document.body, { childList: true, subtree: true });
  });

  // badges and the "compatible" filter follow Forge's UI preset as it changes
  let lastPreset = presetValue();
  const presetTimer = setInterval(async() => {
    const preset = presetValue();
    if (preset === lastPreset) return;
    lastPreset = preset;
    modelArch = await currentArch();
    refreshAll();
  }, 1000);

  return () => {
    observer.disconnect();
    clearInterval(presetTimer);
    document.removeEventListener('click', onClick, true);
    document.removeEventListener('wheel', onWheel, true);
    style.remove();
    for (const element of document.querySelectorAll('.lobe-lora-corner, .lobe-lora-controls, .lobe-lora-filter')) element.remove();
  };
};
