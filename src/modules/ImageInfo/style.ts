import { colors as colorScales } from '@lobehub/ui';
import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token, isDarkMode }) => {
  const type = isDarkMode ? 'dark' : 'light';
  const color = isDarkMode ? colorScales.lime[type][9] : colorScales.green[type][10];

  return {
    configTitle: css`
      color: ${token.colorTextSecondary};
    `,
    configValue: css`
      color: ${token.colorInfoText};
      text-align: right;
      word-break: break-word;
    `,
    container: css`
      padding: 16px 10px 16px 24px;

      font-family: ${token.fontFamilyCode};
      font-size: 13px;

      background: ${token.colorFillTertiary};
      border-radius: ${token.borderRadius}px;
    `,
    highlight: css`
      pre {
        font-family: ${token.fontFamilyCode} !important;
        font-size: 13px !important;
        line-height: 1.5 !important;
        word-wrap: break-word !important;
        white-space: pre-wrap !important;
        vertical-align: bottom !important;
      }
    `,
    negative: css`
      span[style='color:${color.toUpperCase()}'] {
        color: ${token.colorErrorTextHover} !important;
      }
    `,
  };
});
