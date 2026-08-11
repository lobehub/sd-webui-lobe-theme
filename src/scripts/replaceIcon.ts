import { consola } from 'consola';
import {
  ArchiveRestore,
  ArrowDown,
  ArrowDownLeft,
  ArrowDownWideNarrow,
  ArrowLeft,
  ArrowRight,
  ArrowRightLeft,
  ArrowUpDown,
  Book,
  Box,
  Brush,
  ClipboardList,
  CornerRightUp,
  Dices,
  Download,
  FileArchive,
  FolderClosed,
  Grid2x2,
  Image,
  Laptop2,
  Maximize,
  PanelRight,
  Paperclip,
  PencilRuler,
  Play,
  RefreshCcw,
  Save,
  Scaling,
  Settings,
  Share2,
  SquarePen,
  Trash,
  Undo,
  Wand2,
  Webcam,
  X,
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

// Extra-network cards (LoRA/checkpoints/...) can number in the thousands and never
// contain the toolbar emoji we replace here. Skipping their subtree avoids iterating
// tens of thousands of nodes on startup, which otherwise freezes the UI.
const isInExtraNetworkCard = (element: HTMLElement) => !!element.closest('.extra-network-cards');

export default () => {
  for (const button of document.querySelectorAll('button')) {
    if (isInExtraNetworkCard(button)) continue;
    replaceIcon(button, ['🖌️'], SquarePen, 16);
    replaceIcon(button, ['🗃️'], FileArchive, 16);
    replaceIcon(button, ['🖼️'], Image, 16);
    replaceIcon(button, ['🎨️'], Brush, 16);
    replaceIcon(button, ['📂'], FolderClosed, 16);
    replaceIcon(button, ['🔄', '🔁', '♻️'], RefreshCcw, 16);
    replaceIcon(button, ['↙️'], ArrowDownLeft, 16);
    replaceIcon(button, ['⤴'], CornerRightUp, 16);
    replaceIcon(button, ['↕️'], ArrowDownWideNarrow, 16);
    replaceIcon(button, ['🗑️'], Trash, 16);
    replaceIcon(button, ['📋'], ClipboardList, 16);
    replaceIcon(button, ['💾'], Save, 16);
    replaceIcon(button, ['🎲️'], Dices, 16);
    replaceIcon(button, ['🪄'], Wand2, 16);
    replaceIcon(button, ['⚙️'], Settings, 16);
    replaceIcon(button, ['➡️'], ArrowRight, 16);
    replaceIcon(button, ['⇅'], ArrowUpDown, 16);
    replaceIcon(button, ['⇄'], ArrowRightLeft, 16);
    replaceIcon(button, ['🎴'], PanelRight, 16);
    replaceIcon(button, ['🌀'], ArchiveRestore, 16);
    replaceIcon(button, ['💥'], Play, 16);
    replaceIcon(button, ['📷'], Webcam, 16);
    replaceIcon(button, ['📝'], Laptop2, 16);
    replaceIcon(button, ['📐'], PencilRuler, 16);
    replaceIcon(button, ['⬇️'], ArrowDown, 16);
    replaceIcon(button, ['↩'], Undo, 16);
    replaceIcon(button, ['📒'], Book, 16);
    replaceIcon(button, ['📎'], Paperclip, 16);
    replaceIcon(button, ['📦'], Box, 16);
    replaceIcon(button, ['💞'], Share2, 16);
    replaceIcon(button, ['✨'], Scaling, 16);
  }

  for (const span of document.querySelectorAll('span')) {
    if (isInExtraNetworkCard(span)) continue;
    replaceIcon(span, ['⤡'], Maximize, 36);
    replaceIcon(span, ['⊞'], Grid2x2, 36);
    replaceIcon(span, ['🖫'], Download, 36);
    replaceIcon(span, ['×'], X, 36);
  }

  for (const a of document.querySelectorAll('a')) {
    if (isInExtraNetworkCard(a)) continue;
    replaceIcon(a, ['❮'], ArrowLeft, 36);
    replaceIcon(a, ['❯'], ArrowRight, 36);
  }
  consola.success('🤯 [svgIcon] replace');
};
