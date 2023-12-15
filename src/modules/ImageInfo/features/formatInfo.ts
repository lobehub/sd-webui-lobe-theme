import { Converter } from '@/scripts/formatPrompt';

const formatPrompt = (prompt: string) => {
  let newPrompt = prompt.replaceAll('&lt;', '<').replaceAll('&gt;', '>');
  return Converter.convert(newPrompt);
};

export const formatInfo = (info: string) => {
  if (!info || info === 'undefined') return;
  if (!info.includes('<br>')) return;

  let position: any = '';
  let negative: any = '';
  let config: any = '';

  let data = info?.split('Negative prompt:').filter(Boolean);
  if (data[1]) {
    position = data[0];
    data = data[1].split('Steps:');
    negative = `Negative prompt: ${data[0]}`;
    config = `Steps: ${data[1]}`;
  } else {
    data = data[0].split('Steps:');
    position = data[0];
    config = `Steps: ${data[1]}`;
  }

  position = position.trim().replaceAll('<br>', '');
  negative = negative.trim().replaceAll('<br>', '');
  config = config.trim().replaceAll('<br>', '');

  if (!config.includes(',')) return;
  const clearConfigs = config
    .split(',')
    .map((item: any) => item?.trim())
    .filter(Boolean);

  const configs: any = {};

  for (const item of clearConfigs) {
    const items = item.split(':');
    configs[items[0]?.trim()] = items[1]?.trim();
  }

  position = position ? formatPrompt(position) : '';
  negative = negative ? formatPrompt(negative.split('Negative prompt: ')[1]) : '';

  return {
    config: configs,
    negative: negative,
    positive: position,
  };
};
