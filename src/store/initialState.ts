import type { SelectProps } from 'antd';

import type { NeutralColor, PrimaryColor } from '@/features/Setting/data';
import { DEFAULT_LOCALE_OPTIONS, DEFAULT_VERSION } from '@/store/api';
import type { I18n } from '@/types';

export interface WebuiSetting {
  accordionMode: 'free' | 'single';
  confirmPageUnload: boolean;
  cornerStyle: 'sharp' | 'soft' | 'round';
  density: 'comfortable' | 'compact';
  enableCommandPalette: boolean;
  enableExtraNetworkSidebar: boolean;
  enableHighlight: boolean;
  enableHistory: boolean;
  enableImageInfo: boolean;
  enableLoraTools: boolean;
  enableNotification: boolean;
  enablePresets: boolean;
  enableSidebar: boolean;
  enableSizeTools: boolean;
  enableSystemMonitor: boolean;
  enableTabProgress: boolean;
  enableWebFont: boolean;
  extraNetworkCardSize: number;
  extraNetworkFixedMode: 'fixed' | 'float';
  extraNetworkFolderTree: boolean;
  extraNetworkSidebarExpand: boolean;
  extraNetworkSidebarWidth: number;
  fontFamily: 'harmony' | 'inter' | 'geist' | 'manrope' | 'beVietnam' | 'system';
  fontMono: 'harmony' | 'geistMono' | 'jetbrains' | 'system';
  i18n: I18n;
  layoutHideFooter: boolean;
  layoutImageButtonsTop: boolean;
  layoutSplitPreview: boolean;
  liteAnimation: boolean;
  localAssets: boolean;
  logoCustomTitle: string | undefined;
  logoCustomUrl: string | undefined;
  logoType: 'lobe' | 'kitchen' | 'mark' | 'wordmark' | 'custom' | 'none';
  neutralColor: NeutralColor | undefined;
  primaryColor: PrimaryColor | undefined;
  promptEditor: boolean;
  promptTextareaType: 'scroll' | 'resizable';
  sidebarExpand: boolean;
  sidebarFixedMode: 'fixed' | 'float';
  sidebarSwap: boolean;
  sidebarWidth: number;
  surfaceStyle: 'flat' | 'glass' | 'elevated';
  svgIcon: boolean;
}

export type WebuiSettingKeys = keyof WebuiSetting;

export const DEFAULT_SETTING: WebuiSetting = {
  accordionMode: 'free',
  confirmPageUnload: false,
  cornerStyle: 'soft',
  density: 'comfortable',
  enableCommandPalette: true,
  enableExtraNetworkSidebar: true,
  enableHighlight: true,
  enableHistory: true,
  enableImageInfo: true,
  enableLoraTools: true,
  enableNotification: false,
  enablePresets: true,
  enableSidebar: true,
  enableSizeTools: true,
  enableSystemMonitor: true,
  enableTabProgress: true,
  enableWebFont: true,
  extraNetworkCardSize: 86,
  extraNetworkFixedMode: 'fixed',
  extraNetworkFolderTree: true,
  extraNetworkSidebarExpand: true,
  extraNetworkSidebarWidth: 340,
  fontFamily: 'harmony',
  fontMono: 'harmony',
  i18n: 'en_US',
  layoutHideFooter: false,
  layoutImageButtonsTop: true,
  layoutSplitPreview: false,
  liteAnimation: true,
  localAssets: true,
  logoCustomTitle: '',
  logoCustomUrl: '',
  logoType: 'lobe',
  neutralColor: undefined,
  primaryColor: undefined,
  promptEditor: false,
  promptTextareaType: 'resizable',
  sidebarExpand: true,
  sidebarFixedMode: 'fixed',
  sidebarSwap: false,
  sidebarWidth: 280,
  surfaceStyle: 'flat',
  svgIcon: true,
};

export interface StroeState {
  currentTab: string;
  loading: boolean;
  localeOptions: SelectProps['options'];
  setting: WebuiSetting;
  themeMode: 'light' | 'dark';
  version: string;
}

export const initialState: StroeState = {
  currentTab: 'tab_txt2img',
  loading: true,
  localeOptions: DEFAULT_LOCALE_OPTIONS,
  setting: DEFAULT_SETTING,
  themeMode: 'dark',
  version: DEFAULT_VERSION,
};
