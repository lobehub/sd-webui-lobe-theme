import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token, cx, stylish, prefixCls }) => {
  const prefix = `${prefixCls}-highlighter`;
  return {
    container: css`
      pointer-events: none;
      position: absolute;
      overflow: hidden auto;
      padding: calc(8px + var(--input-border-width));

      pre {
        font-family: ${token.fontFamilyCode} !important;
        font-size: 13px !important;
        line-height: 1.5 !important;
        word-wrap: break-word !important;
        white-space: pre-wrap !important;
        vertical-align: bottom !important;
      }
    `,
    loading: cx(
      stylish.blur,
      css`
        position: absolute;
        z-index: 10;
        top: 0;
        right: 0;

        display: flex;
        align-items: center;
        justify-content: center;

        height: 34px;
        padding: 0 8px;

        font-family: ${token.fontFamilyCode};
        color: ${token.colorTextTertiary};

        border-radius: ${token.borderRadius};
      `,
    ),
    shiki: cx(
      `${prefix}-shiki`,
      css`
        margin: 0;

        .shiki {
          overflow-x: auto;
          padding: 0;
          background: none !important;

          code,
          code span {
            font-family: ${token.fontFamilyCode} !important;
          }
        }
      `,
    ),
  };
});
