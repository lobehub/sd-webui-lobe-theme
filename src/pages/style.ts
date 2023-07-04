import { createStyles } from 'antd-style';
import { adjustHue } from 'polished';

export const useStyles = createStyles(
  (
    { cx, css, stylish, token, isDarkMode },
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
        right: -20vw;
        transform: rotate(4deg);

        width: 60vw;
        height: 200px;

        opacity: 0.2;
        filter: blur(100px);
      `,
    ),
    backgroundLite: css`
      pointer-events: none;

      position: absolute !important;
      top: -400px;
      left: 0;

      width: 100vw;
      height: 100%;

      opacity: ${isPrimaryColor ? (isDarkMode ? 0.2 : 0.05) : isDarkMode ? 0.15 : 0};
      background: radial-gradient(
        circle 600px at calc(100% - 300px) 300px,
        ${token.colorPrimary},
        transparent
      );
    `,
    panel: css`
      .draggable-panel {
        border-style: dashed;
      }
    `,
    quicksettings: css`
      #quicksettings {
        padding: 16px !important;
      }
    `,
    sidebar: css`
      height: calc(100vh - ${headerHeight}px);
    `,
  }),
);
