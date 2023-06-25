import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const SETTING_KEY = 'SD-KITCHEN-SETTING';

export interface WebuiSetting {
  enableExtraNetworkSidebar: boolean;
  extraNetworkCardSize: number;
  extraNetworkFixedMode: 'fixed' | 'float';
  extraNetworkSidebarExpand: boolean;
  extraNetworkSidebarWidth: number;
  promotTextarea: 'scroll' | 'resizable';
  sidebarExpand: boolean;
  sidebarFixedMode: 'fixed' | 'float';
  sidebarWidth: number;
  svgIcon: boolean;
}

export const defaultSetting: WebuiSetting = {
  enableExtraNetworkSidebar: true,
  extraNetworkCardSize: 86,
  extraNetworkFixedMode: 'fixed',
  extraNetworkSidebarExpand: true,
  extraNetworkSidebarWidth: 340,
  promotTextarea: 'scroll',
  sidebarExpand: true,
  sidebarFixedMode: 'fixed',
  sidebarWidth: 280,
  svgIcon: false,
};
export interface AppState {
  currentTab: string;
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
    onInit: () => {
      get().onLoadSetting();
    },
    onLoadSetting: () => {
      let setting: any = localStorage.getItem(SETTING_KEY);
      if (setting) {
        setting = JSON.parse(setting);
      } else {
        setting = defaultSetting;
        localStorage.setItem(SETTING_KEY, JSON.stringify(defaultSetting));
      }
      set(() => ({ setting: { ...defaultSetting, ...setting } }), false, 'onLoadSetting');
    },
    onSetSetting: (setting) => {
      localStorage.setItem(SETTING_KEY, JSON.stringify(setting));
      set(() => ({ setting }), false, 'onSetSetting');
    },
    onSetThemeMode: (themeMode) => {
      set(() => ({ themeMode }), false, 'onSetThemeMode');
    },
    setCurrentTab: () => {
      const currentTab = get_uiCurrentTabContent()?.id;
      if (currentTab && currentTab !== get().currentTab) {
        set({ currentTab }, false, 'setCurrentTab');
      }
    },
    setting: defaultSetting,
    themeMode: 'dark',
  })),
);
