import { Converter } from '@/scripts/formatPrompt';

export const createButton = (type: 'txt' | 'img') => {
  const button = document.createElement('button');
  button.id = `${type}2img_formatconvert`;
  button.type = 'button';
  button.innerHTML = '🪄';
  button.title = 'Format prompt~🪄';
  button.className = 'lg secondary gradio-button tool';
  button.addEventListener('click', () => Converter.onClickConvert(type));
  return button;
};
