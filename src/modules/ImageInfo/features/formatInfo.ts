import { Converter } from '@/scripts/formatPrompt';

const formatPrompt = (prompt: string) => {
  let newPrompt = prompt.replaceAll('&lt;', '<').replaceAll('&gt;', '>');
  return Converter.convert(newPrompt);
};

function infoparser(lineInput: string) {
  let output: Record<string, string> = {};
  let buffer = '';
  let key: string;
  let quotes = false;
  let line = lineInput;
  if (line.at(-1) === ':') line = line.slice(0, -1);

  let c_pre: string;

  for (let i = 0; i < line.length; i++) {
    let c = line[i];
    let sp = true;

    if (c === '"') {
      quotes = !quotes;
    }

    if (!quotes) {
      if (c === ':') {
        key = buffer.trim();
        buffer = '';
        sp = false;
      } else if (c === ',') {
        // @ts-ignore
        if (key === 'Cutoff targets' && c_pre !== ']') {
          //
        } else {
          // @ts-ignore
          output[key] = buffer.slice(1);
          buffer = '';
          sp = false;
        }
      }
    }

    if (sp) {
      buffer += c;
    }

    c_pre = c;
  }
  // @ts-ignore
  if (key) output[key] = buffer.slice(1);
  return output
}

export const formatInfo = (info: string) => {
  if (!info || info === 'undefined') return;
  if (!info.includes('<br>')) return;

  let position: string = '';
  let negative: string = '';
  let config: string = '';

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

  position = position.trim().replaceAll('<br>', '\n');
  negative = negative.trim().replaceAll('<br>', '\n');
  config = config.trim().replaceAll('<br>', '\n');

  if (!config.includes(',')) return;

  const configs = infoparser(config);

  position = position ? formatPrompt(position) : '';
  negative = negative ? formatPrompt(negative.split('Negative prompt: ')[1]) : '';

  return {
    config: configs,
    negative: negative,
    positive: position,
  };
};
