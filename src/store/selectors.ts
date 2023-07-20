import { DEFAULT_SETTING } from './initialState';
import type { Store } from './store';

const currentSetting = (s: Store) => ({ ...DEFAULT_SETTING, ...s.setting });
const currentTab = (s: Store) => s.currentTab;
const themeMode = (s: Store) => s.themeMode;
export const selectors = {
  currentSetting,
  currentTab,
  themeMode,
};
