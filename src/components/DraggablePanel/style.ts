import { createStyles, css, cx } from 'antd-style'
import { rgba } from 'polished'

export const useStyle = createStyles(({ token }, prefix: string) => {
  const commonHandle = css`
    position: relative;
    &::before {
      position: absolute;
      z-index: 50;
      transition: all 0.3s ease-in-out;
      content: '';
    }
    &:hover,
    &:active {
      &::before {
        background: ${token.colorPrimary};
      }
    }
  `

  const commonToggle = css`
    position: absolute;
    opacity: 0;
    z-index: 1001;
    transition: opacity 0.1s;
    border-radius: 4px;
    cursor: pointer;
    background: ${token.colorBgElevated};
    border-width: 1px;
    border-style: solid;
    color: ${token.colorTextTertiary};
    border-color: ${token.colorBorder};
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
        flex-shrink: 0;
        position: relative;
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
        width: ${toggleShort}px;
        height: ${toggleLength}px;
        left: -${offset}px;
        top: 50%;
        margin-top: -20px;
        border-radius: 4px 0 0 4px;
        border-right-width: 0;
      `
    ),
    toggleRight: cx(
      `${prefix}-toggle`,
      `${prefix}-toggle-right`,
      commonToggle,
      css`
        width: ${toggleShort}px;
        height: ${toggleLength}px;
        right: -${offset}px;
        top: 50%;
        margin-top: -20px;
        border-radius: 0 4px 4px 0;
        border-left-width: 0;
      `
    ),
    toggleTop: cx(
      `${prefix}-toggle`,
      `${prefix}-toggle-top`,
      commonToggle,
      css`
        height: ${toggleShort}px;
        width: ${toggleLength}px;
        top: -${offset}px;
        left: 50%;
        margin-left: -20px;
        border-radius: 4px 4px 0 0;
        border-bottom-width: 0;
      `
    ),
    toggleBottom: cx(
      `${prefix}-toggle`,
      `${prefix}-toggle-bottom`,
      commonToggle,
      css`
        height: 16px;
        width: ${toggleLength}px;
        bottom: -${offset}px;
        left: 50%;
        margin-left: -20px;
        border-radius: 0 0 4px 4px;
        border-top-width: 0;
      `
    ),
    fixed: cx(
      `${prefix}-fixed`,
      css`
        background: ${rgba(token.colorBgContainer, 0.75)};
        backdrop-filter: blur(40px);
        overflow: hidden;
      `
    ),
    float: cx(
      `${prefix}-float`,
      css`
        overflow: hidden;
        border-radius: 8px;
        background: ${rgba(token.colorBgElevated, 0.75)};
        backdrop-filter: blur(40px);
        box-shadow: ${token.boxShadowSecondary};
        z-index: 2000;
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
          height: 2px;
          width: 100%;
        }
      `
    ),
    bottomHandle: cx(
      `${prefix}-bottom-handle`,
      css`
        ${commonHandle};
        &::before {
          bottom: 50%;
          height: 2px;
          width: 100%;
        }
      `
    ),
  }
})
