export const createButton = (type: string, setOpen: (open: boolean) => void): HTMLButtonElement => {
  const button = document.createElement('button');
  button.id = `lobe_share_${type}`;
  button.type = 'button';
  button.innerHTML = '💞';
  button.title = 'Share';
  button.className = 'lg secondary gradio-button tool svelte-cmf5ev';
  button.addEventListener('click', () => setOpen(true));
  return button;
};
