import { createStyles } from 'antd-style';
import { rgba } from 'polished';

export const useStyles = createStyles(({ css, stylish, cx, token }) => ({
  container: cx(
    stylish.blur,
    css`
      position: fixed;
      z-index: 9999;
      inset: 0;

      display: flex;
      align-items: center;
      justify-content: center;

      width: 100vw;
      height: 100vh;

      background: ${rgba(token.colorBgLayout, 0.5)};
    `,
  ),
  inner: css`
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
    justify-content: center;

    width: min(50%, 580px);
  `,
}));
