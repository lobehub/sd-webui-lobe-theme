import { parseFromRawInfo } from '@bluelovers/auto1111-pnginfo';
import { splitSmartly } from 'split-smartly2';

const formatPrompt = (prompt: string) => {
  let newPrompt = prompt
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    // eslint-disable-next-line no-control-regex
    .replaceAll(/^[\s\u0000,。，]+$/gm, '')
    .replaceAll(/\n{2,}/g, '\n');
  const entries = splitSmartly(newPrompt.replaceAll('\n', '<br>'), [',', '，', '。'], {
    brackets: true,
    trimSeparators: true,
  }) as string[];

  return entries
    .filter((line) => line.length)
    .join(', ')
    .replaceAll('<br>', '\n')
    .replaceAll(/^\s+|\s+$/gm, '');
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
