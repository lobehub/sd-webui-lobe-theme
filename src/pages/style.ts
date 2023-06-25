import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, stylish, cx }, headerHeight: number) => ({
  background: cx(
    stylish.gradientAnimation,
    css`
      pointer-events: none;

      position: absolute;
      z-index: 0;
      top: -100px;
      right: -20vw;
      transform: rotate(4deg);

      width: 60vw;
      height: 200px;

      opacity: 0.2;
      filter: blur(100px);
    `,
  ),
  sidebar: css`
    height: calc(100vh - ${headerHeight}px);
  `,
}));
