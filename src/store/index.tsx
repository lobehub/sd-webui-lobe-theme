import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { version } from '@/../package.json';

import { AppState, FALLBACK_SETTING_KEY, SETTING_KEY, WebuiSetting } from './AppState';
import { getLatestVersion, getSetting, getVersion, postSetting } from './api';

export * from './AppState';

export const defaultSetting: WebuiSetting = {
  enableExtraNetworkSidebar: true,
  enableHighlight: false,
  enableSidebar: true,
  enableWebFont: true,
  extraNetworkCardSize: 86,
  extraNetworkFixedMode: 'fixed',
  extraNetworkSidebarExpand: true,
  extraNetworkSidebarWidth: 340,
  i18n: 'en_US',
  layoutHideFooter: false,
  layoutSplitPreview: false,
  liteAnimation: false,
  logoCustomTitle: '',
  logoCustomUrl: '',
  logoType: 'lobe',
  neutralColor: undefined,
  primaryColor: undefined,
  promptEditor: false,
  promptTextareaType: 'resizable',
  sidebarExpand: true,
  sidebarFixedMode: 'fixed',
  sidebarWidth: 280,
  svgIcon: true,
};

export const useAppStore = create<AppState>()(
  devtools((set, get) => ({
    currentTab: 'tab_txt2img',
    latestVersion: version,
    loading: true,
    onInit: async() => {
      const { onLoadSetting, onLoadVersion, onLoadLatestVersion } = get();
      await onLoadVersion();
      await onLoadLatestVersion();
      await onLoadSetting();
    },
    onLoadLatestVersion: async() => {
      const latestVersion = await getLatestVersion();
      set(() => ({ latestVersion }), false, 'onLoadLatestVersion');
    },
    onLoadSetting: async() => {
      console.time('🤯 [setting] loaded');
      let themeSetting;
      const webuiSetting: any = await getSetting();

      if (webuiSetting) {
        console.info('🤯 [setting] loaded webui setting');
        themeSetting = webuiSetting;
      }

      if (!themeSetting) {
        const localSetting: any = localStorage.getItem(SETTING_KEY);
        if (localSetting) {
          console.info('🤯 [setting] loaded local setting');
          themeSetting = JSON.parse(localSetting);
        }
      }

      if (!themeSetting) {
        const fallbackLocalSetting: any = localStorage.getItem(FALLBACK_SETTING_KEY);
        if (fallbackLocalSetting) {
          console.info('🤯 [setting] loaded fallback local setting');
          themeSetting = JSON.parse(fallbackLocalSetting);
        }
      }

      if (!themeSetting) {
        console.info('🤯 [setting] loaded default setting');
        themeSetting = defaultSetting;
      }

      const setting = { ...defaultSetting, ...themeSetting };

      await postSetting(setting);
      set(() => ({ loading: false, setting }), false, 'onLoadSetting');
      console.table(setting);
      console.timeEnd('🤯 [setting] loaded');
    },
    onLoadVersion: async() => {
      const version = await getVersion();
      set(() => ({ version }), false, 'onLoadVersion');
    },
    onSetSetting: async(setting) => {
      localStorage.setItem(SETTING_KEY, JSON.stringify(setting));
      await postSetting(setting);
      set(() => ({ setting }), false, 'onSetSetting');
    },
    onSetThemeMode: (themeMode) => {
      set(() => ({ themeMode }), false, 'onSetThemeMode');
    },
    setCurrentTab: () => {
      const currentTab = get_uiCurrentTabContent()?.id;
      console.debug('🤯 [tab] onChange', currentTab);
      if (currentTab && currentTab !== get().currentTab) {
        set({ currentTab }, false, 'setCurrentTab');
      }
    },
    setting: defaultSetting,
    themeMode: 'dark',
    version: version,
  })),
);
