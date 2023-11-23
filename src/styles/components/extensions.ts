import { Theme, css } from 'antd-style';

export default (token: Theme) => {
    return css`
    #root {
      /* sd-webui-prompt-all-in-one */
      .physton-highlight-prompt {
        color: ${token.colorPrimary} !important;

        -webkit-text-fill-color: ${token.colorPrimary} !important;
      }

      /* openOutpaint */
      #tab_openOutpaint {
        position: relative;
        height: 100vh;
        padding: 0 !important;

        #openoutpaint-iframe {
          width: 100% !important;
        }
      }

      /* autocomplete */
      .autocompleteResults {
        min-width: 400px;

        font-family: ${token.fontFamilyCode};
        font-size: 12px;

        background: ${token.colorBgElevated} !important;
        border-color: ${token.colorBorder} !important;
        border-radius: ${token.borderRadius}px !important;
        box-shadow: ${token.boxShadow};

        ul {
          padding: 0 !important;
        }

        li {
          border-bottom: 1px solid ${token.colorBorder};

          &:hover {
            background: ${token.colorFillSecondary} !important;
          }

          &:nth-of-type(odd) {
            background: transparent !important;
          }
        }
      }

      /* ADetailer */
      [id*='img_adetailer_ad_toprow_prompt'] {
        margin-bottom: var(--spacing-lg);
      }

      [id*='_adetailer_ad_detection_accordion'].block.padded.gradio-accordion,
      [id*='_adetailer_ad_mask_preprocessing_accordion'].block.padded.gradio-accordion,
      [id*='_adetailer_ad_inpainting_accordion'].block.padded.gradio-accordion {
        margin: var(--spacing-lg) 0 !important;

        .label-wrap.open {
          margin-bottom: 0;
          padding-bottom: 8px;
        }
      }

      /* ControlNet */
      .cnet-badge.primary {
        font-size: var(--text-xs);
        line-height: 1.3;
        color: var(--body-background-fill);
        background-color: ${token.colorSuccess};
      }

      .tab-nav button {
        &.cnet-unit-active,
        &.selected.cnet-unit-active {
          color: ${token.colorSuccess} !important;
        }
      }

      /* Aspect Ratio selector */
      [id$='2img_container_aspect_ratio'] {
        padding: var(--block-padding);
        border: 1px solid var(--block-border-color);
        border-radius: 8px;

        #arc_empty_space {
          display: none;
        }

        button[id$='_calculator_button'] {
          max-width: fit-content !important;
          height: var(--button-lg-tool-height) !important;
          min-height: var(--button-lg-tool-height) !important;
          max-height: var(--button-lg-tool-height) !important;
          padding: 0 1.25em !important;

          font-size: var(--text-md);
          font-weight: 500;

          border: none;
          border-radius: 0.5em;
        }

        #arc_panel {
          .block.gradio-markdown.padded.hide-container {
            .hide,
            .pending {
              display: none;
            }
          }

          .gradio-column:has([id$='_arc_tool_buttons']) {
            justify-content: space-between;
          }
        }
      }

      [id$='2img_container_aspect_ratio'],
      [id$='2img_row_resolutions'] {
        gap: 0.5em !important;
      }

      /* Inpaint Anything */
      #padding_btn {
        margin-top: auto;
      }

      /* Model Toolkit */
      #tab_checkpoint_toolkit {
        button {
          align-self: end;
        }
      }
    }
  `;
};
