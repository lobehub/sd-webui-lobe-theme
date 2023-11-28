const addShareButton = (id: string, onClick: () => void): HTMLButtonElement => {
  const button = document.createElement('button');
  button.id = id;
  button.type = 'button';
  button.innerHTML = '💞';
  button.title = 'Share';
  button.className = 'lg secondary gradio-button tool svelte-cmf5ev';
  button.addEventListener('click', onClick);
  return button;
};

export default (type: string, onClick: () => void) => {
  const id = `lobe_share_${type}`;
  const isInit = document.querySelector(`#${id}`);
  if (isInit) return;
  const container = document.querySelector(`#image_buttons_${type}2img > .form`) as HTMLDivElement;
  if (!container) return;
  container.append(addShareButton(id, onClick));
};
