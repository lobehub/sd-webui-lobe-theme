import { Theme, css } from 'antd-style';

export default (token: Theme) => {
  const cardStylish = css`
    display: flex;
    flex-direction: column;

    background-color: ${token.colorBgContainer} !important;
    border-radius: ${token.borderRadius}px !important;
    box-shadow: none;
  `;
  return css`
    .gradio-tabitem {
      overflow: auto;
    }

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
          ${cardStylish};
          margin: 0 !important;
          padding: 16px !important;
          border: 1px solid ${token.colorBorderSecondary} !important;
        }
      }
    }

    .panel {
      margin: 0 !important;
      padding: 16px !important;
      ${cardStylish};
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

    #txt2img_dimensions_row,
    #img2img_dimensions_row {
      min-width: 36px !important;
    }
  `;
};
