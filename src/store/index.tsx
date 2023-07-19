import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { type Store, createStore } from './store';

export const useAppStore = create<Store>()(devtools(createStore));

export { selectors } from './selectors';
export { type Store } from './store';
