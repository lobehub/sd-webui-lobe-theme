import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  container: css`
    display: flex;
    flex-direction: column;

    width: 100%;
    min-height: 100px;
    max-height: 800px;
  `,
  editor: css`
    resize: vertical;

    font-family: ${token.fontFamilyCode} !important;
    font-size: 13px;
    line-height: 18.2px;

    background: ${token.colorFillTertiary};
    border: 1px solid ${token.colorBorderSecondary};
    border-radius: ${token.borderRadius}px;

    &:focus,
    &:active,
    &:hover {
      border: 1px solid ${token.colorBorder};
    }

    pre {
      word-wrap: break-word;
      white-space: pre-wrap;
    }
  `,
  handle: css`
    cursor: row-resize;
    width: 100%;
    height: 2px;
    background-color: transparent;

    &:hover {
      background: ${token.colorPrimary};
    }
  `,
  textarea: css`
    height: 100% !important;

    &::placeholder {
      color: ${token.colorTextQuaternary};
    }

    &::selection {
      color: #000;
      background: ${token.yellow3A};
    }

    &:focus {
      border: none !important;
      outline: none !important;
      box-shadow: none !important;
    }
  `,
}));
