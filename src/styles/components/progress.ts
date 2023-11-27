import {Theme, css, keyframes} from 'antd-style';

const progressAnimation = keyframes`
      0% {
        background-position: 0 0;
      }
      100% {
        background-position: 24px 24px;
      }
    `;

export default (token: Theme) => css`
  .progress-container {
    flex-direction: column;
  }

  .eta-bar {
    overflow: hidden;

    opacity: 1 !important;
    background: ${token.colorFillQuaternary} !important;
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
    position: relative !important;
    top: 0 !important;
    overflow: hidden;
    background: ${token.colorFillSecondary} !important;

    > .progress {
      position: relative;

      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: flex-start;

      font-family: var(--font-mono);
      font-size: var(--text-md);
      font-weight: 600 !important;
      text-shadow: 0 1px 4px rgb(0 0 0 / 80%);

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
