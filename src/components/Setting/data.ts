import { colors as lobeColor } from '@lobehub/ui';

import { PrimaryColor } from '@/store';
import { kitchenNeutral, kitchenPrimary } from '@/styles/kitchenColors';
import { neutralColorScales } from '@/styles/neutralColors';

export const colors = {
  blue: lobeColor.blue.dark[9],
  cyan: lobeColor.cyan.dark[9],
  geekblue: lobeColor.geekblue.dark[9],
  gold: lobeColor.gold.dark[9],
  green: lobeColor.green.dark[9],
  kitchen: kitchenPrimary.dark.colorPrimary,
  lime: lobeColor.lime.dark[9],
  magenta: lobeColor.magenta.dark[9],
  orange: lobeColor.orange.dark[9],
  purple: lobeColor.purple.dark[9],
  red: lobeColor.red.dark[9],
  volcano: lobeColor.volcano.dark[9],
  yellow: lobeColor.yellow.dark[9],
};

export const primaryColors = [
  kitchenPrimary.dark.colorPrimary,
  lobeColor.red.dark[9],
  lobeColor.orange.dark[9],
  lobeColor.gold.dark[9],
  lobeColor.yellow.dark[9],
  lobeColor.lime.dark[9],
  lobeColor.green.dark[9],
  lobeColor.cyan.dark[9],
  lobeColor.blue.dark[9],
  lobeColor.geekblue.dark[9],
  lobeColor.purple.dark[9],
  lobeColor.magenta.dark[9],
  lobeColor.volcano.dark[9],
];

export const neutralColors = {
  kitchen: kitchenNeutral.dark.colorNeutral,
  mauve: neutralColorScales.mauve.dark[9],
  olive: neutralColorScales.olive.dark[9],
  sage: neutralColorScales.sage.dark[9],
  sand: neutralColorScales.sand.dark[9],
  slate: neutralColorScales.slate.dark[9],
};

export const findKey = (object: { [key in string]: string }, value: string): any => {
  const res: { [key: string]: PrimaryColor } = {};
  for (const key of Object.keys(object)) {
    // @ts-ignore
    res[object[key]] = key;
  }
  return res[value];
};
