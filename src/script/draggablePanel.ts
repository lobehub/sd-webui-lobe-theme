const MIN_WIDTH = 240;

const addDraggable = (tabId: string) => {
    const settings: any = document.querySelector(`#${tabId}_settings`);
    const checkDraggableLine = document.querySelector(`#tab_${tabId} .draggable-line`);
    if (!settings || checkDraggableLine) return;

    settings.style.minWidth = `min(${MIN_WIDTH}px, 100%)`;

    const lineWrapper = document.createElement('div');
    lineWrapper.classList.add('draggable-line');

    settings.after(lineWrapper);

    const container: HTMLElement | any = settings.parentElement;
    container.classList.add('draggable-container');

    const results: any = document.querySelector(`#${tabId}_results`);
    if (!results) return;

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

        const tab: HTMLElement | any = document.querySelector(`#tab_${tabId}`);
        if (!tab) return;

        let offsetX = tab.offsetLeft;
        let parent = tab.offsetParent;

        while (parent) {
            offsetX += parent.offsetLeft;
            parent = parent.offsetParent;
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
    addDraggable('txt2img');
    addDraggable('img2img');
};
