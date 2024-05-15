import { Converter } from '@/scripts/formatPrompt';
import { parseFromRawInfo } from '@bluelovers/auto1111-pnginfo';

const formatPrompt = (prompt: string) => {
  let newPrompt = prompt.replaceAll('&lt;', '<').replaceAll('&gt;', '>');
  return Converter.convert(newPrompt);
};

export const formatInfo = (info: string) => {
  if (!info || info === 'undefined') return;
  if (!info.includes('<br>')) return;

  let {
    prompt: position,
    negative_prompt: negative,
    ...config,
  } = parseFromRawInfo(info, {
    isIncludePrompts: true,
  })

  position = position.trim().replaceAll('<br>', '\n').replace(/[\s\r\n]+$/g, '');
  negative = negative.trim().replaceAll('<br>', '\n').replace(/[\s\r\n]+$/g, '');

  position = position ? formatPrompt(position) : '';
  negative = negative ? formatPrompt(negative) : '';

  return {
    config,
    negative: negative,
    positive: position,
  };
};
