import { createStyles } from 'antd-style';
import { rgba } from 'polished';

export const useStyles = createStyles(
  ({ css, cx, stylish, token }, { headerHeight = 64 }: { headerHeight?: number }) => ({
    container: cx(
      stylish.blur,
      css`
        position: relative;

        overflow-x: hidden;
        overflow-y: auto;
        display: flex;
        flex-direction: column;

        height: calc(100vh - ${headerHeight}px);
        padding: 16px;

        background: ${rgba(token.colorBgLayout, 0.5)};
      `,
    ),
  }),
);
