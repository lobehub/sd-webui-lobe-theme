/**
 * Follow every generation the WebUI starts, without changing how it runs.
 *
 * All supported WebUIs start a job the same way: ui.js calls the global
 * `requestProgress(id_task, progressbarContainer, gallery, atEnd, onProgress)`
 * from progressbar.js, which polls /internal/progress until the job ends and
 * then calls `atEnd`. Wrapping that one global gives start, progress and end
 * for txt2img, img2img, extras and jobs restored after a page reload.
 */
import { bus } from './bus';

let installed = false;

const tabOf = (gallery?: HTMLElement | null, container?: HTMLElement | null) => {
  const id = gallery?.id || container?.id || '';
  const match = id.match(/^([\da-z]+)_(gallery|results_panel)/);
  return match ? match[1] : 'other';
};

export const installProgressHook = (): boolean => {
  if (installed) return true;
  const w = window as any;
  const original = w.requestProgress;
  if (typeof original !== 'function') return false;
  installed = true;
  w.requestProgress = function(
    this: unknown,
    idTask: string,
    container: HTMLElement,
    gallery: HTMLElement | null,
    atEnd?: (...args: unknown[]) => unknown,
    onProgress?: (response: any) => unknown,
    ...rest: unknown[]
  ) {
    const tab = tabOf(gallery, container);
    let ended = false;
    const end = () => {
      if (ended) return;
      ended = true;
      bus.emit('gen:end', { id: idTask, tab });
    };
    bus.emit('gen:start', { gallery, id: idTask, tab });
    return original.call(
      this,
      idTask,
      container,
      gallery,
      function(this: unknown, ...args: unknown[]) {
        try {
          return atEnd?.apply(this, args);
        } finally {
          end();
        }
      },
      function(this: unknown, response: any) {
        bus.emit('gen:progress', {
          id: idTask,
          info: {
            eta: typeof response?.eta === 'number' ? response.eta : undefined,
            progress: Number(response?.progress) || 0,
            textinfo: response?.textinfo || undefined,
          },
          tab,
        });
        return onProgress?.call(this, response);
      },
      ...rest,
    );
  };
  return true;
};
