const cardsNeedLoad = (root: Element): boolean => {
  const panes = root.querySelectorAll('.extra-network-pane, .tabitem');
  if (panes.length === 0) return true;

  for (const pane of panes) {
    // Skip Generation tab content if it somehow remains
    if (pane.id?.includes('_render') || pane.id?.includes('_generation')) continue;

    const cards = pane.querySelectorAll('.card');
    const nocards = pane.querySelector('.nocards');
    const pending = pane.querySelector('.pending');
    if (pending) return true;
    if (nocards || cards.length === 0) return true;
  }

  return false;
};

const scheduleExtraNetworkRefresh = (fn: () => void, delayMs: number) => {
  if (typeof requestIdleCallback === 'function' && delayMs < 500) {
    requestIdleCallback(fn, { timeout: Math.max(delayMs, 1000) });
  } else {
    setTimeout(fn, delayMs);
  }
};
/**
 * After lobe moves Extra Networks into the sidebar, Forge still needs a
 * "search all" / tab activation pass so card HTML is populated.
 * Runs idle + one delayed retry; skips work when cards are already present.
 */
export const refreshExtraNetwork = (type: 'txt' | 'img') => {
  const rootSelector = `#${type}2img_extra_tabs`;

  const run = () => {
    const root = document.querySelector(rootSelector);
    if (!root) return;

    const tabNav = root.querySelector(':scope > .tab-nav');
    const buttons = Array.from(
      tabNav?.querySelectorAll(':scope > button') ?? [],
    ) as HTMLButtonElement[];

    // buttons[0] = Generation (hidden in sidebar); open first Extra Networks page
    const enButton =
      buttons.find((btn, index) => {
        if (index === 0) return false;
        return !btn.classList.contains('hidden') && btn.style.display !== 'none';
      }) ?? buttons[1];

    if (enButton) {
      const alreadyActive =
        enButton.getAttribute('aria-selected') === 'true' ||
        enButton.classList.contains('selected');
      if (!alreadyActive) enButton.click();
    }

    if (!cardsNeedLoad(root)) return;

    const searchAll = Array.from(root.querySelectorAll('button.search-all')) as HTMLButtonElement[];
    for (const btn of searchAll) {
      const pane = btn.closest('.extra-network-pane') || btn.closest('.tabitem');
      if (!pane) {
        btn.click();
        continue;
      }
      const hasCards = pane.querySelectorAll('.card').length > 0;
      const empty = !!pane.querySelector('.nocards') || !hasCards;
      if (empty) btn.click();
    }
  };

  // First pass soon after inject; second pass after Forge finishes HTML fill
  scheduleExtraNetworkRefresh(run, 200);
  scheduleExtraNetworkRefresh(run, 1500);
};
