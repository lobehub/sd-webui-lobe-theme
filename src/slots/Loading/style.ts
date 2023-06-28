import { createStyles } from 'antd-style';
import { adjustHue, rgba } from 'polished';

export const useStyles = createStyles(
  (
    { css, stylish, cx, token },
    { isPrimaryColor, liteAnimation }: { isPrimaryColor?: boolean; liteAnimation?: boolean },
  ) => ({
    canvas: cx(
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

        position: absolute;
        z-index: 10;
        top: -250px;
        left: 50%;
        transform: translateX(-50%) scale(1.5);

        width: 75vw;
        height: 400px;

        opacity: 0.2;
        filter: blur(100px);
      `,
    ),
    container: cx(
      !liteAnimation && stylish.blur,
      css`
        position: fixed;
        z-index: 9999;
        inset: 0;

        display: flex;
        align-items: center;
        justify-content: center;

        width: 100vw;
        height: 100vh;

        background: ${liteAnimation ? token.colorBgLayout : rgba(token.colorBgLayout, 0.5)};
      `,
    ),
    icon: css`
      color: ${token.colorPrimary};
    `,
    inner: css`
      display: flex;
      flex-direction: column;
      gap: 16px;
      align-items: center;
      justify-content: center;

      width: min(50%, 580px);
    `,
  }),
);
