import { colors as colorScales } from '@lobehub/ui';
import { ThemeAppearance } from 'antd-style';

export const themeConfig: any = (isDarkMode: ThemeAppearance) => {
  const type = isDarkMode ? 'dark' : 'light';

  const colorTextTertiary = isDarkMode ? colorScales.gray[type][6] : colorScales.gray[type][7];
  const colorYellow = isDarkMode ? colorScales.yellow[type][9] : colorScales.yellow[type][10];
  const colorOrange = isDarkMode ? colorScales.gold[type][9] : colorScales.orange[type][9];
  const colorGreen = isDarkMode ? colorScales.lime[type][9] : colorScales.green[type][10];
  const colorBlue = isDarkMode ? colorScales.blue[type][9] : colorScales.geekblue[type][8];
  const colorPurple = isDarkMode ? colorScales.purple[type][10] : colorScales.purple[type][9];
  return {
    colors: {
      'editor.foreground': colorGreen,
    },
    name: type,
    tokenColors: [
      {
        scope: 'comma',
        settings: {
          foreground: colorTextTertiary,
        },
      },
      {
        scope: 'func',
        settings: {
          foreground: colorBlue,
        },
      },
      {
        scope: 'and',
        settings: {
          fontStyle: 'bold',
          foreground: colorBlue,
        },
      },
      {
        scope: 'bracket',
        settings: {
          foreground: colorBlue,
        },
      },
      {
        scope: 'model-type',
        settings: {
          fontStyle: 'italic',
          foreground: colorOrange,
        },
      },
      {
        scope: 'model-name',
        settings: {
          fontStyle: 'bold',
          foreground: colorOrange,
        },
      },
      {
        scope: 'model-bracket',
        settings: {
          foreground: colorOrange,
        },
      },
      {
        scope: 'number',
        settings: {
          foreground: colorPurple,
        },
      },
      {
        scope: 'wildcards',
        settings: {
          fontStyle: 'italic',
          foreground: colorYellow,
        },
      },
    ],
    type,
  };
};
