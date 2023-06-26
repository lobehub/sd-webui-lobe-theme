import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const SETTING_KEY = 'SD-KITCHEN-SETTING';

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
  | 'yellow';

export type NeutralColor = 'mauve' | 'slate' | 'sage' | 'olive' | 'sand';

export interface WebuiSetting {
  enableExtraNetworkSidebar: boolean;
  extraNetworkCardSize: number;
  extraNetworkFixedMode: 'fixed' | 'float';
  extraNetworkSidebarExpand: boolean;
  extraNetworkSidebarWidth: number;
  logoCustomTitle: string | undefined;
  logoCustomUrl: string | undefined;
  logoType: 'lobe' | 'kitchen' | 'custom';
  neutralColor: NeutralColor | undefined;
  primaryColor: PrimaryColor | undefined;
  promptEditor: boolean;
  promptTextarea: 'scroll' | 'resizable';
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
  logoCustomTitle: '',
  logoCustomUrl: '',
  logoType: 'lobe',
  neutralColor: undefined,
  primaryColor: undefined,
  promptEditor: true,
  promptTextarea: 'scroll',
  sidebarExpand: true,
  sidebarFixedMode: 'fixed',
  sidebarWidth: 280,
  svgIcon: true,
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
