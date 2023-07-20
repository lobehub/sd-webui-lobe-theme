import type { SelectProps } from 'antd';

import type { NeutralColor, PrimaryColor } from '@/components/Setting/data';
import { DEFAULT_LOCALE_OPTIONS, DEFAULT_VERSION } from '@/store/api';
import type { I18n } from '@/types';

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

export type WebuiSettingKeys = keyof WebuiSetting;

export const DEFAULT_SETTING: WebuiSetting = {
  enableExtraNetworkSidebar: true,
  enableHighlight: true,
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

export interface StroeState {
  currentTab: string;
  latestVersion: string;
  loading: boolean;
  localeOptions: SelectProps['options'];
  setting: WebuiSetting;
  themeMode: 'light' | 'dark';
  version: string;
}

export const initialState: StroeState = {
  currentTab: 'tab_txt2img',
  latestVersion: DEFAULT_VERSION,
  loading: true,
  localeOptions: DEFAULT_LOCALE_OPTIONS,
  setting: DEFAULT_SETTING,
  themeMode: 'dark',
  version: DEFAULT_VERSION,
};
