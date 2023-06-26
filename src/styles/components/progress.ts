import { Theme, css } from 'antd-style';

export default (token: Theme) => css`
  .progressDiv {
    background: ${token.colorBgElevated} !important;

    .progress {
      background: ${token.colorInfo} !important;
    }
  }

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
  }
`;
