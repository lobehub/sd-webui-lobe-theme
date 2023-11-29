import { Converter } from '@/scripts/formatPrompt';

const formatPrompt = (prompt: string) => {
  let newPrompt = prompt.replaceAll('&lt;', '<').replaceAll('&gt;', '>');
  return Converter.convert(newPrompt);
};

export const formatInfo = (info: string) => {
  if (!info || info === 'undefined') return;
  if (!info.includes('<br>')) return;
  const data = info?.split('<br>').filter(Boolean);

  let position: any;
  let negative: any;
  let config: any;

  switch (data.length) {
    case 1: {
      config = data[0] || info;
      break;
    }
    case 2: {
      if (data[0].includes('Negative prompt:')) {
        negative = data[0];
        config = data[1];
      } else {
        position = data[0];
        config = data[1];
      }
      break;
    }
    case 3: {
      position = data[0];
      negative = data[1];
      config = data[2];
    }
  }

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
