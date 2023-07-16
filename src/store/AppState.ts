import { SelectProps } from 'antd';

import { I18n } from '@/types';

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

export interface AppState {
  currentTab: string;
  latestVersion: string;
  loading: boolean;
  localeOptions: SelectProps['options'];
  onInit: () => void;
  onLoadLatestVersion: () => void;
  onLoadLocalOptions: () => void;
  onLoadSetting: () => void;
  onLoadVersion: () => void;
  onSetSetting: (setting: WebuiSetting) => void;
  onSetThemeMode: (themeMode: 'light' | 'dark') => void;
  setCurrentTab: () => void;
  setting: WebuiSetting;
  themeMode: 'light' | 'dark';
  version: string;
}
