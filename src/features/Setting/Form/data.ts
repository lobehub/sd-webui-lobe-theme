import {
  neutralColors as nc,
  neutralColorsSwatches as ncs,
  primaryColorsSwatches as pcs,
  primaryColors as ps,
} from '@lobehub/ui';

import { kitchenNeutral, kitchenPrimary } from '@/styles/kitchenColors';

export const primaryColors = {
  kitchen: kitchenPrimary.dark.colorPrimary,
  ...ps,
};

export const primaryColorsSwatches = [primaryColors.kitchen, ...pcs];

export const neutralColors = {
  kitchen: kitchenNeutral.dark.colorNeutral,
  ...nc,
};

export const neutralColorsSwatches = [neutralColors.kitchen, ...ncs];

export const findCustomThemeName = (type: 'primary' | 'neutral', value?: string): any => {
  if (!value) return '';
  let res = type === 'primary' ? primaryColors : neutralColors;
  let result = Object.entries(res).find((item) => {
    return item[1] === value;
  });
  return result === null || result === void 0 ? void 0 : result[0];
};

export type PrimaryColor = keyof typeof primaryColors;

export type NeutralColor = keyof typeof neutralColors;
