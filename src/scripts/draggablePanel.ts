const MIN_WIDTH = 240;

const addDraggable = (tabId: string) => {
  const settings = document.querySelector(`#${tabId}_settings`) as HTMLDivElement;
  const checkDraggableLine = document.querySelector(
    `#tab_${tabId} .draggable-line`,
  ) as HTMLDivElement;
  if (!settings || checkDraggableLine) return;

  settings.style.minWidth = `min(${MIN_WIDTH}px, 100%)`;

  const lineWrapper = document.createElement('div');
  lineWrapper.classList.add('draggable-line');

  settings.after(lineWrapper);

  const container: HTMLElement | any = settings.parentElement;
  container.classList.add('draggable-container');

  let results: HTMLDivElement = document.querySelector(`#${tabId}_results`) as HTMLDivElement;

  if (!results) return;

  if (tabId === 'extras') results = results.parentElement as HTMLDivElement;

  results.style.minWidth = `${MIN_WIDTH}px`;

  let linePosition = 50;
  settings.style.flexBasis = `${linePosition}%`;
  results.style.flexBasis = `${100 - linePosition}%`;

  let isDragging = false;

  lineWrapper.addEventListener('mousedown', (e) => {
    isDragging = true;
    e.preventDefault();
  });

  document.addEventListener('mousemove', (event) => {
    if (!isDragging) return;

    const tab = document.querySelector(`#tab_${tabId}`) as HTMLDivElement;
    if (!tab) return;

    let offsetX = tab.offsetLeft;
    let parent = tab.offsetParent as HTMLDivElement;

    while (parent) {
      offsetX += parent.offsetLeft;
      parent = parent.offsetParent as HTMLDivElement;
    }

    const containerWidth = container.offsetWidth;
    const mouseX = event.clientX;
    const linePosition = ((mouseX - offsetX) / containerWidth) * 100;

    if (linePosition <= (MIN_WIDTH / containerWidth) * 100) return;
    if (linePosition >= (1 - MIN_WIDTH / containerWidth) * 100) return;

    settings.style.flexBasis = `${linePosition}%`;
    results.style.flexBasis = `${100 - linePosition}%`;
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });
};

export default () => {
  console.time('🤯 [layout] inject - DraggablePanel');
  addDraggable('txt2img');
  addDraggable('img2img');
  const extrasSetting = document.querySelector('#extras_results')?.parentElement
    ?.previousElementSibling as HTMLDivElement;
  if (extrasSetting) {
    extrasSetting.id = 'extras_settings';
    addDraggable('extras');
  }
  console.timeEnd('🤯 [layout] inject - DraggablePanel');
};
