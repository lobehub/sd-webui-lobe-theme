/**
 * Extra network folders as a tree. The WebUI lists every folder and
 * sub-folder as a flat row of buttons ("characters/", "characters/anime/",
 * "styles/film/bw/"...). Here only the top level shows; a folder with
 * sub-folders gets a caret, and clicking it shows its children right after
 * it. The buttons stay the WebUI's own (same click, same search), they are
 * only reordered, labelled with their last part and shown or hidden.
 *
 * The WebUI reads the folder to search for from the clicked button's text,
 * so the full path stays in the button (the parent part in a hidden span,
 * with pointer events off so the button itself is always the click target).
 */

const STYLE_ID = 'lobe-folder-tree-style';
const CSS = `
.extra-network-dirs.lobe-tree > button { display: inline-flex; align-items: center; gap: 4px; }
.extra-network-dirs.lobe-tree > button > span { pointer-events: none; }
.extra-network-dirs.lobe-tree .lobe-tree-parent { display: none; }
.extra-network-dirs.lobe-tree > button.lobe-tree-hidden { display: none !important; }
.extra-network-dirs.lobe-tree > button[data-lobe-children]::after {
  content: ''; width: 0; height: 0; margin-inline-start: 2px;
  border-block: 3.5px solid transparent; border-inline-start: 4.5px solid currentColor; opacity: 0.6;
  transition: transform 150ms;
}
.extra-network-dirs.lobe-tree > button[data-lobe-open]::after { transform: rotate(90deg); }
.extra-network-dirs.lobe-tree > button[data-lobe-depth]:not([data-lobe-depth='1']) { opacity: 0.85; border-style: dashed !important; }
.extra-network-dirs.lobe-tree > button[data-lobe-depth]:not([data-lobe-depth='1'])::before {
  content: ''; width: 6px; height: 6px; margin-inline-end: 2px;
  border-inline-start: 1px solid currentColor; border-block-end: 1px solid currentColor; opacity: 0.45;
}
`;

const pathOf = (button: HTMLElement) =>
  (button.dataset.lobePath ?? (button.textContent || '')).trim().replaceAll('\\', '/').replace(/\/+$/, '');

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
      const cut = path.lastIndexOf('/');
      const parent = cut >= 0 ? path.slice(0, cut + 1) : '';
      const leaf = path.slice(cut + 1) + '/';
      b.textContent = '';
      const hidden = document.createElement('span');
      hidden.className = 'lobe-tree-parent';
      hidden.textContent = parent;
      const label = document.createElement('span');
      label.textContent = leaf;
      b.append(hidden, label);
      b.dataset.lobePath = path;
      b.title = path + '/';
    }
    const depth = path.split('/').length;
    b.dataset.lobeDepth = String(depth);
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
