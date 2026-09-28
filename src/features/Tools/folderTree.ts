/**
 * Extra network folders as a tree. The WebUI lists every folder and
 * sub-folder as a flat row of buttons ("characters/", "characters/anime/",
 * "styles/film/bw/"...). Here only the top level shows; a folder with
 * sub-folders gets a caret, and clicking it shows its children right after
 * it. The buttons stay the WebUI's own (same click, same search), they are
 * only reordered, labelled with their last part and shown or hidden.
 *
 * The WebUI reads the folder to search for from the clicked button's text
 * and matches it against the model paths as they are on disk, so the button
 * keeps its exact text, separators included ("characters\\anime\\" on
 * Windows, "/characters/" with the leading-slash option): the parent part and
 * the trailing separator go in hidden spans, only the folder name shows.
 * Pointer events are off on the spans so the button is always the click
 * target.
 */

const STYLE_ID = 'lobe-folder-tree-style';
const CSS = `
.extra-network-dirs.lobe-tree {
  display: flex !important; flex-direction: column !important; flex-wrap: nowrap !important;
  align-items: stretch !important; gap: 2px !important;
  max-height: 30vh; overflow: hidden auto; padding: 4px 12px 8px !important;
}
.extra-network-dirs.lobe-tree > button {
  display: flex !important; align-items: center; justify-content: flex-start !important; gap: 6px;
  width: 100% !important; min-width: 0 !important; min-height: 32px !important; height: 32px !important; margin: 0 !important;
  padding: 0 10px 0 calc(10px + var(--lobe-depth, 0) * 16px) !important;
  font-size: 13px !important; line-height: 1.2 !important;
  text-align: start !important; white-space: nowrap !important; overflow: hidden;
  color: var(--body-text-color-subdued) !important; background: transparent !important;
  border: none !important; box-shadow: none !important; border-radius: var(--radius-md, 6px) !important;
  flex: none !important;
}
.extra-network-dirs.lobe-tree > button:hover { color: var(--body-text-color) !important; background: var(--background-fill-secondary, rgba(128,128,128,0.12)) !important; }
.extra-network-dirs.lobe-tree > button[data-lobe-active] {
  color: var(--body-text-color) !important; background: var(--button-secondary-background-fill-hover, rgba(128,128,128,0.2)) !important;
  font-weight: 600;
}
.extra-network-dirs.lobe-tree > button > span { pointer-events: none; }
.extra-network-dirs.lobe-tree .lobe-tree-name { overflow: hidden; text-overflow: ellipsis; }
.extra-network-dirs.lobe-tree .lobe-tree-parent,
.extra-network-dirs.lobe-tree .lobe-tree-sep { display: none; }
.extra-network-dirs.lobe-tree > button.lobe-tree-hidden { display: none !important; }
/* caret for folders with sub-folders, a same-width gap for the rest */
.extra-network-dirs.lobe-tree > button::before {
  content: ''; order: -2; flex: none; width: 12px; height: 12px;
  background: currentColor; opacity: 0;
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Cpath d='M4 2.5 7.5 6 4 9.5' fill='none' stroke='black' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center / contain no-repeat;
          mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Cpath d='M4 2.5 7.5 6 4 9.5' fill='none' stroke='black' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center / contain no-repeat;
  transition: transform 150ms;
}
.extra-network-dirs.lobe-tree > button[data-lobe-children]::before { opacity: 0.7; }
.extra-network-dirs.lobe-tree > button[data-lobe-open]::before { transform: rotate(90deg); }
/* folder glyph */
.extra-network-dirs.lobe-tree > button:not(.search-all)::after {
  content: ''; order: -1; flex: none; width: 14px; height: 14px;
  background: currentColor; opacity: 0.55;
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M1.5 4.5a1 1 0 0 1 1-1h3.6l1.5 1.5h5.9a1 1 0 0 1 1 1v6.5a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1z' fill='none' stroke='black' stroke-width='1.3' stroke-linejoin='round'/%3E%3C/svg%3E") center / contain no-repeat;
          mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M1.5 4.5a1 1 0 0 1 1-1h3.6l1.5 1.5h5.9a1 1 0 0 1 1 1v6.5a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1z' fill='none' stroke='black' stroke-width='1.3' stroke-linejoin='round'/%3E%3C/svg%3E") center / contain no-repeat;
}
`;

/** The folder path with "/" separators and no leading or trailing slash, for the tree only. */
const normalise = (raw: string) =>
  raw.trim().replaceAll('\\', '/').replace(/^\/+/, '').replace(/\/+$/, '');

const pathOf = (button: HTMLElement) => button.dataset.lobePath ?? normalise(button.textContent || '');

const expanded = new Map<string, Set<string>>(); // per folder list (by id), the open folders

const apply = (box: HTMLElement) => {
  const buttons = [...box.querySelectorAll<HTMLButtonElement>(':scope > button')];
  if (buttons.length === 0) return;
  const key = box.id || 'dirs';
  const open = expanded.get(key) || new Set<string>();
  expanded.set(key, open);

  const folders = buttons.filter((b) => !b.classList.contains('search-all'));
  const paths = new Map(folders.map((b) => [b, pathOf(b)]));
  // Only folders deeper than one level make a tree worth drawing.
  if (![...paths.values()].some((p) => p.includes('/'))) {
    box.classList.remove('lobe-tree');
    return;
  }

  for (const [b, path] of paths) {
    if (b.dataset.lobePath === undefined) {
      const raw = (b.textContent || '').trim();
      const body = raw.replace(/[/\\]+$/, '');
      const cut = Math.max(body.lastIndexOf('/'), body.lastIndexOf('\\'));
      const parts = [
        ['lobe-tree-parent', body.slice(0, cut + 1)],
        ['lobe-tree-name', body.slice(cut + 1)],
        ['lobe-tree-sep', raw.slice(body.length)],
      ];
      b.textContent = '';
      for (const [className, text] of parts) {
        const span = document.createElement('span');
        span.className = className;
        span.textContent = text;
        b.append(span);
      }
      b.dataset.lobePath = path;
      b.title = raw;
    }
    const depth = path.split('/').length;
    b.dataset.lobeDepth = String(depth);
    b.style.setProperty('--lobe-depth', String(depth - 1));
    const hasChildren = [...paths.values()].some((p) => p.startsWith(path + '/'));
    if (hasChildren) b.dataset.lobeChildren = '';
    else delete b.dataset.lobeChildren;
    if (open.has(path)) b.dataset.lobeOpen = '';
    else delete b.dataset.lobeOpen;
  }

  // Depth-first order: every folder right after its parent.
  const sorted = [...folders].sort((a, b) => {
    const pa = paths.get(a)!.split('/');
    const pb = paths.get(b)!.split('/');
    for (let i = 0; i < Math.min(pa.length, pb.length); i++) {
      if (pa[i] !== pb[i]) return pa[i].localeCompare(pb[i], undefined, { numeric: true, sensitivity: 'base' });
    }
    return pa.length - pb.length;
  });
  const all = buttons.find((b) => b.classList.contains('search-all'));
  const order = all ? [all, ...sorted] : sorted;
  if (order.some((b, i) => box.children[i] !== b)) box.append(...order);

  for (const [b, path] of paths) {
    const parts = path.split('/');
    let visible = true;
    for (let i = 1; i < parts.length; i++) {
      if (!open.has(parts.slice(0, i).join('/'))) visible = false;
    }
    b.classList.toggle('lobe-tree-hidden', !visible);
  }
  if (all && !box.querySelector(':scope > button[data-lobe-active]')) all.dataset.lobeActive = '';
  box.classList.add('lobe-tree');
};

export const startFolderTree = () => {
  if (!document.getElementById(STYLE_ID)) {
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = CSS;
    document.head.append(style);
  }
  const root: Document | HTMLElement = (window as any).gradioApp?.() || document;

  const scan = () => {
    for (const box of root.querySelectorAll<HTMLElement>('.extra-network-dirs')) apply(box);
  };

  const onClick = (event: Event) => {
    const button = (event.target as HTMLElement | null)?.closest?.('button');
    const box = button?.parentElement;
    if (!button || !box?.classList.contains('lobe-tree')) return;
    // the folder the cards are filtered to (the WebUI does not mark it)
    for (const b of box.querySelectorAll<HTMLElement>(':scope > button[data-lobe-active]')) delete b.dataset.lobeActive;
    button.dataset.lobeActive = '';
    if (button.dataset.lobeChildren === undefined) return;
    const key = box.id || 'dirs';
    const open = expanded.get(key) || new Set<string>();
    const path = pathOf(button);
    if (open.has(path)) {
      for (const p of open) if (p === path || p.startsWith(path + '/')) open.delete(p);
    } else {
      open.add(path);
    }
    expanded.set(key, open);
    apply(box);
  };

  // The lists are rebuilt when networks are refreshed: re-apply then.
  let pending = 0;
  const observer = new MutationObserver((records) => {
    if (pending) return;
    if (!records.some((r) => (r.target as HTMLElement).closest?.('.extra-network-dirs') || [...r.addedNodes].some((n) => n instanceof HTMLElement && (n.matches('.extra-network-dirs') || n.querySelector?.('.extra-network-dirs')))))
      return;
    pending = window.setTimeout(() => {
      pending = 0;
      scan();
    }, 50);
  });

  scan();
  root.addEventListener('click', onClick, true);
  observer.observe(root instanceof Document ? root.body : root, { childList: true, subtree: true });
  return () => {
    root.removeEventListener('click', onClick, true);
    observer.disconnect();
    window.clearTimeout(pending);
  };
};
