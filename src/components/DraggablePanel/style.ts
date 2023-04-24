import { createStyles, css, cx } from 'antd-style'
import { rgba } from 'polished'

export const useStyle = createStyles(({ token }, props: { prefix?: string; maxHeight?: boolean }) => {
  const { prefix, maxHeight } = props
  const commonHandle = css`
    position: relative;
    &::before {
      content: '';
      position: absolute;
      z-index: 50;
      transition: all 0.3s ease-in-out;
    }
    &:hover,
    &:active {
      &::before {
        background: ${token.colorPrimary};
      }
    }
  `

  const commonToggle = css`
    cursor: pointer;

    position: absolute;
    z-index: 1001;

    color: ${token.colorTextTertiary};

    opacity: 0;
    background: ${token.colorBgElevated};
    border-color: ${token.colorBorder};
    border-style: solid;
    border-width: 1px;
    border-radius: 4px;

    transition: opacity 0.1s;
    &:hover {
      color: ${token.colorTextSecondary};
      background: ${token.colorFillQuaternary};
    }
  `

  const offset = 17
  const toggleLength = 40
  const toggleShort = 16

  return {
    container: cx(
      prefix,
      css`
        position: relative;
        flex-shrink: 0;
        border: 0 solid ${token.colorSplit};
        &:hover {
          .${prefix}-toggle {
            opacity: 1;
          }
        }
      `
    ),
    toggleLeft: cx(
      `${prefix}-toggle`,
      `${prefix}-toggle-left`,
      commonToggle,
      css`
        top: 50%;
        left: -${offset}px;

        width: ${toggleShort}px;
        height: ${toggleLength}px;
        margin-top: -20px;

        border-right-width: 0;
        border-radius: 4px 0 0 4px;
      `
    ),
    toggleRight: cx(
      `${prefix}-toggle`,
      `${prefix}-toggle-right`,
      commonToggle,
      css`
        top: 50%;
        right: -${offset}px;

        width: ${toggleShort}px;
        height: ${toggleLength}px;
        margin-top: -20px;

        border-left-width: 0;
        border-radius: 0 4px 4px 0;
      `
    ),
    toggleTop: cx(
      `${prefix}-toggle`,
      `${prefix}-toggle-top`,
      commonToggle,
      css`
        top: -${offset}px;
        left: 50%;

        width: ${toggleLength}px;
        height: ${toggleShort}px;
        margin-left: -20px;

        border-bottom-width: 0;
        border-radius: 4px 4px 0 0;
      `
    ),
    toggleBottom: cx(
      `${prefix}-toggle`,
      `${prefix}-toggle-bottom`,
      commonToggle,
      css`
        bottom: -${offset}px;
        left: 50%;

        width: ${toggleLength}px;
        height: 16px;
        margin-left: -20px;

        border-top-width: 0;
        border-radius: 0 0 4px 4px;
      `
    ),
    fixed: cx(
      `${prefix}-fixed`,
      css`
        position: relative;
        overflow: hidden;
        background: ${rgba(token.colorBgContainer, 0.75)};
        backdrop-filter: blur(40px);

        ${maxHeight ? 'height: 100% !important;' : ''}
      `
    ),
    float: cx(
      `${prefix}-float`,
      css`
        position: relative;
        z-index: 2000;

        overflow: hidden;

        background: ${rgba(token.colorBgElevated, 0.75)};
        backdrop-filter: blur(40px);
        border-radius: 8px;
        box-shadow: ${token.boxShadowSecondary};
      `
    ),
    leftHandle: cx(
      css`
        ${commonHandle};
        &::before {
          left: 50%;
          width: 2px;
          height: 100%;
        }
      `,
      `${prefix}-left-handle`
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
      `${prefix}-right-handle`
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
      `
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
      `
    ),
  }
})
