import { Theme, css } from 'antd-style';

export default (token: Theme) => {
  return css`
    .gradio-group,
    .gradio-row {
      gap: 12px !important;
    }

    .block.padded {
      &.gradio-box:not(.gradio-accordion) {
        padding: 16px !important;
      }

      &.gradio-box,
      &.gradio-accordion {
        &:not(.hidden):has(div) {
          margin: 0 !important;
          padding: 16px !important;
          border: 1px solid ${token.colorBorderSecondary} !important;
        }
      }
    }

    .panel {
      margin: 0 !important;
      padding: 16px !important;
    }

    .compact,
    .wrap {
      gap: 12px !important;
    }

    #tabs > div {
      padding: unset;
      border: none;
    }

    #system_info {
      align-items: flex-start;
      justify-content: flex-start;
    }
  `;
};
