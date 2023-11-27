import { consola } from 'consola';
import {
  archiveRestore,
  arrowDown,
  arrowDownLeft,
  arrowDownWideNarrow,
  arrowLeft,
  arrowRight,
  arrowRightLeft,
  arrowUpDown,
  book,
  box,
  brush,
  clipboardList,
  cornerRightUp,
  dices,
  download,
  fileArchive,
  folderClosed,
  grid2x2,
  image,
  laptop2,
  maximize,
  panelRight,
  paperclip,
  penSquare,
  pencilRuler,
  play,
  refreshCcw,
  save,
  settings,
  trash,
  undo,
  wand2,
  webcam,
  x, // @ts-ignore
} from 'lucide-static';

const replaceIcon = (element: HTMLElement, emoji: string[], svg: string, size: number) => {
  if (!element?.textContent || !svg) return;
  for (const e of emoji) {
    if (element?.textContent?.includes(e)) {
      element.innerHTML = svg
        .replace(`width="24"`, `width="${size}"`)
        .replace(`height="24"`, `height="${size}"`);
    }
  }
};

export default () => {
  for (const button of document.querySelectorAll('button')) {
    replaceIcon(button, ['🖌️'], penSquare, 16);
    replaceIcon(button, ['🗃️'], fileArchive, 16);
    replaceIcon(button, ['🖼️'], image, 16);
    replaceIcon(button, ['🎨️'], brush, 16);
    replaceIcon(button, ['📂'], folderClosed, 16);
    replaceIcon(button, ['🔄', '🔁', '♻️'], refreshCcw, 16);
    replaceIcon(button, ['↙️'], arrowDownLeft, 16);
    replaceIcon(button, ['⤴'], cornerRightUp, 16);
    replaceIcon(button, ['↕️'], arrowDownWideNarrow, 16);
    replaceIcon(button, ['🗑️'], trash, 16);
    replaceIcon(button, ['📋'], clipboardList, 16);
    replaceIcon(button, ['💾'], save, 16);
    replaceIcon(button, ['🎲️'], dices, 16);
    replaceIcon(button, ['🪄'], wand2, 16);
    replaceIcon(button, ['⚙️'], settings, 16);
    replaceIcon(button, ['➡️'], arrowRight, 16);
    replaceIcon(button, ['⇅'], arrowUpDown, 16);
    replaceIcon(button, ['⇄'], arrowRightLeft, 16);
    replaceIcon(button, ['🎴'], panelRight, 16);
    replaceIcon(button, ['🌀'], archiveRestore, 16);
    replaceIcon(button, ['💥'], play, 16);
    replaceIcon(button, ['📷'], webcam, 16);
    replaceIcon(button, ['📝'], laptop2, 16);
    replaceIcon(button, ['📐'], pencilRuler, 16);
    replaceIcon(button, ['⬇️'], arrowDown, 16);
    replaceIcon(button, ['↩'], undo, 16);
    replaceIcon(button, ['📒'], book, 16);
    replaceIcon(button, ['📎'], paperclip, 16);
    replaceIcon(button, ['📦'], box, 16);
  }

  for (const span of document.querySelectorAll('span')) {
    replaceIcon(span, ['⤡'], maximize, 36);
    replaceIcon(span, ['⊞'], grid2x2, 36);
    replaceIcon(span, ['🖫'], download, 36);
    replaceIcon(span, ['×'], x, 36);
  }

  for (const a of document.querySelectorAll('a')) {
    replaceIcon(a, ['❮'], arrowLeft, 36);
    replaceIcon(a, ['❯'], arrowRight, 36);
  }
  consola.success('🤯 [svgIcon] replace');
};
