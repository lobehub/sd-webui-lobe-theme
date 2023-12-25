import { Theme, css } from 'antd-style';
import { readableColor } from 'polished';

export default (token: Theme) => {
  return css`
    body {
      height: 100vh !important;
    }

    .gradio-group,
    .gradio-row {
      gap: 12px !important;
    }

    &.gradio-box,
    &.gradio-accordion {
      &:not(.hidden):has(div) {
        margin: 0 !important;
        padding: 16px !important;
        border: 1px solid ${token.colorBorderSecondary} !important;
      }
    }

    .block.padded {
      &.gradio-box:not(.gradio-accordion) {
        padding: 16px !important;
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

    #img2img_results,
    #txt2img_results,
    #extras_results {
      position: sticky;
      top: 80px !important;
    }

    #context-menu {
      overflow: hidden;

      color: ${token.colorText};

      background: ${token.colorBgElevated} !important;
      border: 1px solid ${token.colorBorder} !important;
      border-radius: ${token.borderRadiusLG}px !important;
      box-shadow: ${token.boxShadow} !important;

      a {
        padding: 8px;
        font-weight: 400;
        color: ${token.colorText};

        &:hover {
          font-weight: 600;
          color: ${readableColor(token.colorPrimary)};
          background: ${token.colorPrimary};
        }
      }
    }

    #tabs_extensions > .tabitem > .gap > .gradio-row {
      overflow: auto;
    }

    gradio-app #imageARPreview {
      background: ${token.colorError}4d;
      backdrop-filter: brightness(1.2);
      border-color: ${token.colorError};
      border-style: solid;
      border-width: 2px;
    }
  `;
};
