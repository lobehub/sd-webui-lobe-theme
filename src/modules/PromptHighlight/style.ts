import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  container: css`
    pointer-events: none;

    position: absolute;

    overflow-x: hidden;
    overflow-y: auto;

    padding: 8px;

    pre {
      font-family: ${token.fontFamilyCode} !important;
      font-size: 13px;
      line-height: 18.2px;
      color: ${token.colorSuccess};
      word-wrap: break-word;
      white-space: pre-wrap;
    }
  `,
}));
