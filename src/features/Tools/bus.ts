/**
 * A tiny event bus shared by the theme's tools: generation start/progress/end
 * (from the WebUI's progress polling), finished history entries, and requests
 * to open a panel (from the command palette or the header).
 */
import type { GenTab } from '@/scripts/webui';

import type { HistoryEntry } from './api';

export interface ProgressInfo {
  eta?: number;
  progress: number;
  textinfo?: string;
}

export interface BusEvents {
  'gen:end': { id: string; tab: GenTab | string };
  'gen:progress': { id: string; info: ProgressInfo; tab: GenTab | string };
  'gen:start': { gallery?: HTMLElement | null; id: string; tab: GenTab | string };
  'history:added': HistoryEntry;
  'open:history': undefined;
  'open:palette': undefined;
  'open:presets': undefined;
  'open:settings': undefined;
  'presets:changed': undefined;
}

type Handler<T> = (payload: T) => void;
const handlers = new Map<keyof BusEvents, Set<Handler<any>>>();

export const bus = {
  emit<K extends keyof BusEvents>(event: K, ...payload: BusEvents[K] extends undefined ? [] : [BusEvents[K]]) {
    for (const handler of handlers.get(event) || []) {
      try {
        (handler as Handler<unknown>)(payload[0]);
      } catch (error) {
        console.error('[lobe] bus handler', event, error);
      }
    }
  },
  on<K extends keyof BusEvents>(event: K, handler: Handler<BusEvents[K]>) {
    let set = handlers.get(event);
    if (!set) {
      set = new Set();
      handlers.set(event, set);
    }
    set.add(handler);
    return () => {
      set?.delete(handler);
    };
  },
};
