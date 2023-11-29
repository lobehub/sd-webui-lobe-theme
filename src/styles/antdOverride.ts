import { Theme, css } from 'antd-style';
import { readableColor } from 'polished';

export default (token: Theme) => css`
  html,
  body,
  #__next,
  .ant-app {
    position: relative;
    overscroll-behavior: none;
    height: 100% !important;
    min-height: 100% !important;

    ::-webkit-scrollbar {
      display: none;
      width: 0;
      height: 0;
    }
  }

  .ant-slider-track,
  .ant-tabs-ink-bar,
  .ant-switch-checked {
    background: ${token.colorPrimary} !important;
  }

  .ant-btn-primary:not(.ant-btn-dangerous) {
    color: ${readableColor(token.colorPrimary)};
    background: ${token.colorPrimary};

    &:hover {
      color: ${readableColor(token.colorPrimary)} !important;
      background: ${token.colorPrimaryHover} !important;
    }

    &:active {
      color: ${readableColor(token.colorPrimaryActive)} !important;
      background: ${token.colorPrimaryActive} !important;
    }
  }
`;
