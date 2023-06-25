import { Theme, css } from 'antd-style';

export default (token: Theme) => css`
  .block.gradio-html:has(div.prose) {
    display: block;

    p {
      color: ${token.cyan8};

      b {
        color: ${token.cyan9};
      }
    }
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
    > fieldset,
    > .gradio-row {
      flex-flow: row wrap;
      gap: 12px;

      margin: 0 !important;
      padding: 16px !important;

      background-color: ${token.colorBgContainer}!important;
      border-radius: ${token.borderRadius}px !important;
    }

    .gradio-tabitem,
    .gradio-group {
      background: ${token.colorFillTertiary} !important;
    }

    .gradio-accordion {
      box-shadow: none;
    }

    div[id$='_script_container'] {
      display: flex;
      flex-direction: column;
      gap: 12px;

      .gradio-group:not(.hidden):has(div),
      #script_list {
        display: flex;
        flex-direction: column;

        margin: 0;
        padding: 16px;

        background-color: ${token.colorBgContainer};
        border: 1px solid ${token.colorBorderSecondary} !important;
        border-radius: ${token.borderRadius}px !important;

        > div {
          padding: 0;
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
    gap: 8px !important;
  }

  #tabs > div {
    padding: unset;
    border: none;
  }
`;
