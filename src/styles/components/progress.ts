import { Theme, css, keyframes } from 'antd-style';

const auroraFlow = keyframes`
  to {
    background-position: -300% 0;
  }
`;

const auroraSheen = keyframes`
  0% {
    background-position: 150% 0;
  }

  100% {
    background-position: -100% 0;
  }
`;

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

  /* Gradio's progress / queue status over a component (svelte hash differs per version) */
  .wrap.default:not(.hide):has(.meta-text, .meta-text-center, .progress-text) {
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

  /* Aurora (Theme Settings > Appearance > Progress bar): a flowing gradient,
     a sheen, a glowing head, and the theme's own label (step, percent, ETA). */
  .lobe-progress-label {
    display: none;
  }

  body.lobe-bar-aurora .progressDiv {
    height: 26px !important;
    background: ${token.colorFillTertiary} !important;
    border: none !important;
    border-radius: 8px !important;

    > .progress {
      height: 100% !important;

      font-size: 0 !important;
      color: transparent !important;
      text-shadow: none !important;

      background: linear-gradient(
        100deg,
        var(--lobe-aurora-1, ${token.colorPrimary}),
        var(--lobe-aurora-0, ${token.colorPrimary}),
        var(--lobe-aurora-2, ${token.colorPrimary}),
        var(--lobe-aurora-0, ${token.colorPrimary}),
        var(--lobe-aurora-1, ${token.colorPrimary})
      ) !important;
      background-size: 300% 100% !important;
      border-radius: 8px;
      box-shadow: 0 0 18px -2px var(--lobe-aurora-0, ${token.colorPrimary});

      transition: width 600ms cubic-bezier(0.2, 0.8, 0.2, 1);
      animation: ${auroraFlow} 4s linear infinite;

      &::before {
        background-image: linear-gradient(90deg, transparent 0 40%, rgb(255 255 255 / 35%) 50%, transparent 60% 100%);
        background-size: 250% 100%;
        mix-blend-mode: overlay;
        animation: ${auroraSheen} 2.4s ease-in-out infinite;
      }

      &::after {
        inset: 50% 3px auto auto;

        width: 12px;
        height: 12px;
        margin-top: -6px;

        background: #fff;
        background-image: none;
        border-radius: 50%;
        box-shadow: 0 0 14px 4px var(--lobe-aurora-0, ${token.colorPrimary});
      }
    }

    > .lobe-progress-label {
      pointer-events: none;

      position: absolute;
      z-index: 2;
      inset: 0;

      display: flex;
      align-items: center;
      justify-content: space-between;

      padding: 0 10px;

      font-family: var(--font-mono);
      font-size: 12px;
      font-weight: 700;
      font-variant-numeric: tabular-nums;
      color: #fff;
      text-shadow: 0 1px 3px rgb(0 0 0 / 70%);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    body.lobe-bar-aurora .progressDiv > .progress,
    body.lobe-bar-aurora .progressDiv > .progress::before {
      animation: none;
    }
  }
`;
