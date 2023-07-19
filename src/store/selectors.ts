import { defaults } from 'lodash-es';

import { DEFAULT_SETTING } from './initialState';
import { Store } from './store';

const currentSetting = (s: Store) => defaults(s.setting, DEFAULT_SETTING);
const currentTab = (s: Store) => s.currentTab;
const themeMode = (s: Store) => s.themeMode;
export const selectors = {
  currentSetting,
  currentTab,
  themeMode,
};
