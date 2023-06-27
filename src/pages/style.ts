import { createStyles } from 'antd-style';
import { adjustHue } from 'polished';

export const useStyles = createStyles(
  (
    { cx, css, stylish, token },
    { headerHeight, isPrimaryColor }: { headerHeight: number; isPrimaryColor: boolean },
  ) => ({
    background: cx(
      stylish.gradientAnimation,
      isPrimaryColor &&
        css`
          background-image: linear-gradient(
            -45deg,
            ${token.colorPrimary},
            ${adjustHue(45, token.colorPrimary)},
            ${token.colorPrimary},
            ${adjustHue(-45, token.colorPrimary)}
          );
        `,
      css`
        pointer-events: none;

        position: absolute !important;
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
    panel: css`
      .draggable-panel {
        border-style: dashed;
      }
    `,
    sidebar: css`
      height: calc(100vh - ${headerHeight}px);
    `,
  }),
);
