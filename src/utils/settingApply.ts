import type { WebuiSetting } from '@/store/initialState';

/** Changing these requires DOM reinject / full UI restart */
export const LAYOUT_RELOAD_KEYS: (keyof WebuiSetting)[] = [
  'enableSidebar',
  'enableExtraNetworkSidebar',
  'layoutSplitPreview',
  'layoutHideFooter',
  'promptTextareaType',
  'enableHighlight',
  'enableImageInfo',
  'promptEditor',
  'svgIcon',
  'enableWebFont',
  'logoType',
  'logoCustomTitle',
  'logoCustomUrl',
  'sidebarFixedMode',
  'extraNetworkFixedMode',
  'sidebarExpand',
  'extraNetworkSidebarExpand',
  'sidebarWidth',
  'extraNetworkSidebarWidth',
  'extraNetworkCardSize',
];

export const needsLayoutReload = (prev: WebuiSetting, next: Partial<WebuiSetting>): boolean =>
  LAYOUT_RELOAD_KEYS.some((key) => key in next && next[key] !== prev[key]);
