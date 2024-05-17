import { parseFromRawInfo } from '@bluelovers/auto1111-pnginfo';

import { splitSmartly } from 'split-smartly2';

const formatPrompt = (prompt: string) => {
  let newPrompt = prompt
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replace(/^[\x00\s,，。]+$/gm, '')
    .replace(/\n{2,}/g, '\n')
  ;

  const entries = splitSmartly(newPrompt.replace(/\n/g, '<br>'), [',','，','。'], {
    brackets: true,
    trimSeparators: true,
  }) as string[];

  return entries
    .filter(line => line.length)
    .join(', ')
    .replace(/<br>/g, '\n')
    .replace(/^\s+|\s+$/gm, '')
    ;
};

export const formatInfo = (info: string) => {
  if (!info || info === 'undefined') return;
  if (!info.includes('<br>')) return;

  let {
    prompt: position,
    negative_prompt: negative,
    ...config
  } = parseFromRawInfo(info, {
    isIncludePrompts: true,
  });

  position = position.trim().replaceAll('<br>', '\n').replaceAll(/\s+$/g, '');
  negative = negative.trim().replaceAll('<br>', '\n').replaceAll(/\s+$/g, '');

  position = position ? formatPrompt(position) : '';
  negative = negative ? formatPrompt(negative) : '';

  return {
    config,
    negative: negative,
    positive: position,
  };
};
