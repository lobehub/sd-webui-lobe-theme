import {
  archiveRestore,
  arrowDownLeft,
  arrowDownWideNarrow,
  arrowRight,
  arrowRightLeft,
  arrowUpDown,
  clipboardList,
  cornerRightUp,
  dices,
  folderClosed,
  laptop2,
  panelRight,
  play,
  refreshCcw,
  ruler,
  save,
  settings,
  trash,
  wand2,
  webcam, // @ts-ignore
} from 'lucide-static';

const replaceIcon = (button: HTMLButtonElement, emoji: string[], svg: string) => {
  if (!button?.textContent || !svg) return;
  for (const e of emoji) {
    if (button?.textContent?.includes(e)) {
      button.innerHTML = svg
        .replace(`width="24"`, `width="16"`)
        .replace(`height="24"`, `height="16"`);
    }
  }
};

export default () => {
  console.time('🤯 [svgIcon] replace');
  for (const button of document.querySelectorAll('button')) {
    replaceIcon(button, ['📂'], folderClosed);
    replaceIcon(button, ['🔄', '🔁', '♻️'], refreshCcw);
    replaceIcon(button, ['↙️'], arrowDownLeft);
    replaceIcon(button, ['⤴'], cornerRightUp);
    replaceIcon(button, ['↕️'], arrowDownWideNarrow);
    replaceIcon(button, ['🗑️'], trash);
    replaceIcon(button, ['📋'], clipboardList);
    replaceIcon(button, ['💾'], save);
    replaceIcon(button, ['🎲️'], dices);
    replaceIcon(button, ['🪄'], wand2);
    replaceIcon(button, ['⚙️'], settings);
    replaceIcon(button, ['➡️'], arrowRight);
    replaceIcon(button, ['⇅'], arrowUpDown);
    replaceIcon(button, ['⇄'], arrowRightLeft);
    replaceIcon(button, ['🎴'], panelRight);
    replaceIcon(button, ['🌀'], archiveRestore);
    replaceIcon(button, ['💥'], play);
    replaceIcon(button, ['📷'], webcam);
    replaceIcon(button, ['📝'], laptop2);
    replaceIcon(button, ['📐'], ruler);
  }
  console.timeEnd('🤯 [svgIcon] replace');
};
