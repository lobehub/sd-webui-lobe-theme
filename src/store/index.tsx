import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { I18n } from '@/i18n';

export const SETTING_KEY = 'SD-LOBE-SETTING';
export const FALLBACK_SETTING_KEY = 'SD-KITCHEN-SETTING';

export type PrimaryColor =
  | 'blue'
  | 'cyan'
  | 'geekblue'
  | 'gold'
  | 'green'
  | 'lime'
  | 'magenta'
  | 'orange'
  | 'purple'
  | 'red'
  | 'volcano'
  | 'yellow'
  | 'kitchen';

export type NeutralColor = 'mauve' | 'slate' | 'sage' | 'olive' | 'sand' | 'kitchen';

export interface WebuiSetting {
  enableExtraNetworkSidebar: boolean;
  enableHighlight: boolean;
  enableSidebar: boolean;
  enableWebFont: boolean;
  extraNetworkCardSize: number;
  extraNetworkFixedMode: 'fixed' | 'float';
  extraNetworkSidebarExpand: boolean;
  extraNetworkSidebarWidth: number;
  i18n: I18n;
  layoutHideFooter: boolean;
  layoutSplitPreview: boolean;
  liteAnimation: boolean;
  logoCustomTitle: string | undefined;
  logoCustomUrl: string | undefined;
  logoType: 'lobe' | 'kitchen' | 'custom';
  neutralColor: NeutralColor | undefined;
  primaryColor: PrimaryColor | undefined;
  promptEditor: boolean;
  promptTextareaType: 'scroll' | 'resizable';
  sidebarExpand: boolean;
  sidebarFixedMode: 'fixed' | 'float';
  sidebarWidth: number;
  svgIcon: boolean;
}

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
export interface AppState {
  currentTab: string;
  loading: boolean;
  onInit: () => void;
  onLoadSetting: () => void;
  onSetSetting: (setting: WebuiSetting) => void;
  onSetThemeMode: (themeMode: 'light' | 'dark') => void;
  setCurrentTab: () => void;
  setting: WebuiSetting;
  themeMode: 'light' | 'dark';
}
export const useAppStore = create<AppState>()(
  devtools((set, get) => ({
    currentTab: 'tab_txt2img',
    loading: true,
    onInit: () => {
      get().onLoadSetting();
    },
    onLoadSetting: () => {
      console.time('🤯 [setting] loaded');
      let localSetting: any = localStorage.getItem(SETTING_KEY);
      const fallbackLocalSetting: any = localStorage.getItem(FALLBACK_SETTING_KEY);
      const webuiSetting: any = (window as any)?.opts?.['opts.lobe_theme_config'];

      if (localSetting) {
        console.info('🤯 [setting] loaded local setting');
        localSetting = JSON.parse(localSetting);
      } else if (fallbackLocalSetting) {
        console.info('🤯 [setting] loaded fallback local setting');
        localSetting = JSON.parse(fallbackLocalSetting);
      } else if (webuiSetting) {
        console.info('🤯 [setting] loaded webui setting');
        localSetting = JSON.parse(webuiSetting);
      } else {
        console.info('🤯 [setting] loaded default setting');
        localSetting = defaultSetting;
      }
      const setting = { ...defaultSetting, ...localSetting };

      set(() => ({ loading: false, setting }), false, 'onLoadSetting');
      console.table(setting);
      console.timeEnd('🤯 [setting] loaded');
    },
    onSetSetting: (setting) => {
      localStorage.setItem(SETTING_KEY, JSON.stringify(setting));
      //TODO FIX ME (nevysha: I needed this for testing purpose)
      // sending settings to server.
      (async() => {
        await fetch('/lobe/config', {
          body: JSON.stringify(setting),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        });
      })();

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
  })),
);
