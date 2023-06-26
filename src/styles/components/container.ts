import { Theme, css } from 'antd-style';

export default (token: Theme) => {
  return css`
    .gradio-tabitem {
      overflow: auto;
    }

    .gradio-group,
    .gradio-row {
      gap: 12px !important;
    }

    div.gradio-box.block.padded:not(.gradio-accordion) {
      padding: 16px !important;
    }

    div.block.padded.gradio-box:not(.hidden):has(div),
    div.block.padded.gradio-accordion:not(.hidden):has(div) {
      display: flex;
      flex-direction: column;

      margin: 0 !important;
      padding: 16px !important;

      background-color: ${token.colorBgContainer} !important;
      border: 1px solid ${token.colorBorderSecondary} !important;
      border-radius: ${token.borderRadius}px !important;
      box-shadow: none;
    }

    div[id$='img_settings'],
    .gradio-column.compact {
      display: flex !important;
      flex-direction: column !important;
      gap: 12px !important;

      .gradio-column:has(button) {
        min-width: min(36px, 100%) !important;
      }

      > div:not([id$='_script_container'], .gradio-tabs):has(div),
      > fieldset {
        flex-flow: row wrap;
        gap: 12px;

        margin: 0 !important;
        padding: 16px !important;

        background-color: ${token.colorBgContainer}!important;
        border-radius: ${token.borderRadius}px !important;
      }

      .gradio-tabitem {
        background: ${token.colorFillTertiary} !important;
      }

      div[id$='_script_container'] {
        display: flex;
        flex-direction: column;
        gap: 12px;

        #script_list,
        > .gradio-group:not(.hidden):has(div) {
          display: flex;
          flex-direction: column;

          margin: 0;
          padding: 16px;

          background-color: ${token.colorBgContainer};
          border: 1px solid ${token.colorBorderSecondary} !important;
          border-radius: ${token.borderRadius}px !important;
          box-shadow: none;

          > .gradio-accordion {
            padding: 0 !important;
            border: none !important;
          }
        }

        #script_list {
          padding: 8px 16px 12px !important;
        }
      }
    }

    div.compact,
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
