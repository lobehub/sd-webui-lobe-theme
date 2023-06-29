import { Theme, css, keyframes } from 'antd-style';

const progressAnimation = keyframes`
      0% {
        background-position: 0 0;
      }
      100% {
        background-position: 24px 24px;
      }
    `;

export default (token: Theme) => css`
  .eta-bar {
    overflow: hidden;

    opacity: 1 !important;
    background: linear-gradient(
      to right,
      ${token.colorFillQuaternary},
      ${token.colorFill}
    ) !important;
    backdrop-filter: saturate(180%) blur(10px);
    border: 1px solid ${token.colorBorder};
    border-radius: ${token.borderRadius}px;
  }

  .wrap.svelte-j1gjts:has(div) {
    overflow: hidden;

    min-height: 36px;

    background: ${token.colorBgContainer} !important;
    border-radius: ${token.borderRadius}px;
    box-shadow: 0 0 0 2px ${token.colorBgContainer};

    .meta-text,
    .meta-text-center {
      font-size: 12px;
      color: ${token.colorTextDescription};
    }
  }

  .progressDiv {
    position: relative;
    overflow: hidden;
    background: ${token.colorBgElevated} !important;

    > .progress {
      position: relative;

      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      line-height: 1;
      text-shadow: 0 1px 1px rgba(0, 0, 0, 40%);

      &::before {
        content: '';

        position: absolute;
        z-index: 1;
        inset: 0;

        overflow: hidden;

        background-image: linear-gradient(
          -45deg,
          rgba(255, 255, 255, 20%) 25%,
          transparent 25%,
          transparent 50%,
          rgba(255, 255, 255, 20%) 50%,
          rgba(255, 255, 255, 20%) 75%,
          transparent 75%,
          transparent
        );
        background-size: 24px 24px;

        animation: ${progressAnimation} 2s linear infinite;
      }

      &::after {
        content: '';

        position: absolute;
        z-index: 1;
        inset: 0;

        overflow: hidden;

        background-image: linear-gradient(to bottom, rgba(255, 255, 255, 40%), transparent 50%);
      }
    }
  }
`;
