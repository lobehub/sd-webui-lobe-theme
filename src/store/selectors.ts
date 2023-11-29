import { DEFAULT_SETTING } from './initialState';
import type { Store } from './store';

const currentSetting = (s: Store) => ({ ...DEFAULT_SETTING, ...s.setting });

const currentLanguage = (s: Store) => currentSetting(s).i18n;
const currentTab = (s: Store) => s.currentTab;
const themeMode = (s: Store) => s.themeMode;
export const selectors = {
  currentLanguage,
  currentSetting,
  currentTab,
  themeMode,
};
