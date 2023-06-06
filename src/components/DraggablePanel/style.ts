import { createStyles, css, cx } from 'antd-style';

const offset = 17;
const toggleLength = 40;
const toggleShort = 16;

export const useStyle = createStyles(({ token }, prefix: string) => {
  const commonHandle = css`
    position: relative;
    &::before {
      content: '';
      position: absolute;
      z-index: 50;
      transition: all 0.2s ${token.motionEaseOut};
    }

    &:hover,
    &:active {
      &::before {
        background: ${token.colorPrimary};
      }
    }
  `;

  const commonToggle = css`
    position: absolute;
    z-index: 1001;
    opacity: 0;
    transition: all 0.2s ${token.motionEaseOut};

    &:hover {
      opacity: 1 !important;
    }

    &:active {
      opacity: 1 !important;
    }

    > div {
      cursor: pointer;

      position: absolute;

      color: ${token.colorTextTertiary};

      background: ${token.colorFillTertiary};
      border-color: ${token.colorBorderSecondary};
      border-style: solid;
      border-width: 1px;
      border-radius: 4px;

      transition: all 0.2s ${token.motionEaseOut};

      &:hover {
        color: ${token.colorTextSecondary};
        background: ${token.colorFillSecondary};
      }

      &:active {
        color: ${token.colorText};
        background: ${token.colorFill};
      }
    }
  `;

  const float = css`
    position: absolute;
    z-index: 2000;
  `;

  return {
    container: cx(
      prefix,
      css`
        flex-shrink: 0;
        border: 0 solid ${token.colorBorderSecondary};

        &:hover {
          .${prefix}-toggle {
            opacity: 1;
          }
        }
      `,
    ),
    fixed: css`
      position: relative;
    `,
    leftFloat: cx(
      float,
      css`
        top: 0;
        bottom: 0;
        left: 0;
        height: 100%;
      `,
    ),
    rightFloat: cx(
      float,
      css`
        top: 0;
        right: 0;
        bottom: 0;
        height: 100%;
      `,
    ),
    topFloat: cx(
      float,
      css`
        top: 0;
        right: 0;
        left: 0;
        width: 100%;
      `,
    ),
    bottomFloat: cx(
      float,
      css`
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
      `,
    ),
    toggleLeft: cx(
      `${prefix}-toggle`,
      `${prefix}-toggle-left`,
      commonToggle,
      css`
        left: -${offset}px;
        width: ${toggleShort}px;
        height: 100%;
        > div {
          top: 50%;

          width: ${toggleShort}px;
          height: ${toggleLength}px;
          margin-top: -20px;

          border-radius: 4px 0 0 4px;
        }
      `,
    ),
    toggleRight: cx(
      `${prefix}-toggle`,
      `${prefix}-toggle-right`,
      commonToggle,
      css`
        right: -${offset}px;
        width: ${toggleShort}px;
        height: 100%;
        > div {
          top: 50%;

          width: ${toggleShort}px;
          height: ${toggleLength}px;
          margin-top: -20px;

          border-radius: 0 4px 4px 0;
        }
      `,
    ),
    toggleTop: cx(
      `${prefix}-toggle`,
      `${prefix}-toggle-top`,
      commonToggle,
      css`
        top: -${offset}px;
        width: 100%;
        height: ${toggleShort}px;

        > div {
          left: 50%;

          width: ${toggleLength}px;
          height: ${toggleShort}px;
          margin-left: -20px;

          border-radius: 4px 4px 0 0;
        }
      `,
    ),
    toggleBottom: cx(
      `${prefix}-toggle`,
      `${prefix}-toggle-bottom`,
      commonToggle,
      css`
        bottom: -${offset}px;
        width: 100%;
        height: ${toggleShort}px;

        > div {
          left: 50%;

          width: ${toggleLength}px;
          height: 16px;
          margin-left: -20px;

          border-radius: 0 0 4px 4px;
        }
      `,
    ),
    panel: cx(
      `${prefix}-fixed`,
      css`
        overflow: hidden;
        background: ${token.colorBgContainer};
        transition: all 0.2s ${token.motionEaseOut};
      `,
    ),
    handlerIcon: css`
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ${token.motionEaseOut};
    `,
    leftHandle: cx(
      css`
        ${commonHandle};

        &::before {
          left: 50%;
          width: 2px;
          height: 100%;
        }
      `,
      `${prefix}-left-handle`,
    ),
    rightHandle: cx(
      css`
        ${commonHandle};
        &::before {
          right: 50%;
          width: 2px;
          height: 100%;
        }
      `,
      `${prefix}-right-handle`,
    ),
    topHandle: cx(
      `${prefix}-top-handle`,
      css`
        ${commonHandle};

        &::before {
          top: 50%;
          width: 100%;
          height: 2px;
        }
      `,
    ),
    bottomHandle: cx(
      `${prefix}-bottom-handle`,
      css`
        ${commonHandle};

        &::before {
          bottom: 50%;
          width: 100%;
          height: 2px;
        }
      `,
    ),
  };
});
