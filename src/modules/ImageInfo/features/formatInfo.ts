import { Converter } from '@/scripts/formatPrompt';

const formatPrompt = (prompt: string) => {
  let newPrompt = prompt.replaceAll('&lt;', '<').replaceAll('&gt;', '>');
  return Converter.convert(newPrompt);
};

export const formatInfo = (info: string) => {
  if (!info || info === 'undefined') return;
  if (!info.includes('<br>')) return;
  const data = info.split('<br>').filter(Boolean);
  const config = data[2] || data[1];
  if (!config.includes(',')) return;
  const clearConfigs = config
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

  const configs: any = {};

  for (const item of clearConfigs) {
    const items = item.split(':');
    configs[items[0].trim()] = items[1].trim();
  }

  let position = data[0];
  let negative = data[2] ? data[1] : '';

  if (position.includes('Negative prompt:')) {
    negative = position;
    position = '';
  }

  position = formatPrompt(position);
  negative = formatPrompt(negative.split('Negative prompt: ')[1]);

  return {
    config: configs,
    negative: negative,
    positive: position,
  };
};
