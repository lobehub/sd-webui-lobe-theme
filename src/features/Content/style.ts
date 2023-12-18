import { createStyles } from 'antd-style';

const TEXT2IMG_PROMPT_HEIGHT = 74;
const IMG2IMG_PROMPT_HEIGHT = 98;
export const useStyles = createStyles(
  (
    { css, token, stylish, isDarkMode, responsive },
    {
      isPromptResizable,
      layoutSplitPreview,
    }: { isPromptResizable: boolean; layoutSplitPreview: boolean },
  ) => {
    return {
      container: css`
        position: relative;
        flex: 1;
        min-width: ${layoutSplitPreview ? '200px' : '0'};

        .app {
          padding: 0 !important;
        }

        .gap:has(#quicksettings):first-child {
          gap: 0;
        }

        .float {
          ${stylish.blur};
          border: none;
          border-top-left-radius: 0;
          border-top-right-radius: 0;
          border-bottom-left-radius: 0;
        }

        [id^='html_info_']:has(div.prose) {
          p {
            color: ${token.colorTextDescription} !important;
          }
        }

        [id^='html_info_']:has(div.prose),
        [id^='html_log_']:has(div.prose) {
          .pending {
            opacity: 1;
          }
        }

        #extras_generate {
          border-radius: ${token.borderRadius}px !important;
        }

        [id$='img_styles_dialog'] {
          label {
            white-space: normal;
          }

          .gradio-row:not(:first-child) {
            margin-top: 1em;
          }
        }

        .block.border_focus {
          border-color: ${token.colorPrimary} !important;
        }

        #txt2img_results,
        #img2img_results,
        #extras_results {
          padding: 0 !important;
          background: transparent !important;
        }

        #txt2img_render,
        #img2img_render {
          display: block !important;
          margin-top: 16px;
          padding: 0 !important;
          background: transparent;
        }

        .block.gradio-html:has(div.prose) {
          display: block;

          p {
            color: ${isDarkMode ? token.colorPrimaryText : token.colorPrimaryTextHover};

            b {
              color: ${isDarkMode ? token.colorPrimaryText : token.colorPrimaryTextHover};
            }
          }
        }

        #tab_pnginfo {
          #pnginfo_image {
            height: auto !important;
          }

          .block.gradio-html:has(div.prose) p {
            color: ${token.colorText};
          }
        }

        [id$='_override_settings_row']:has(div.hidden) {
          display: none;
        }

        .gradio-group:has(.gradio-group:has(div:empty)) {
          display: none;
        }

        ${responsive.mobile} {
          .gradio-row:has([id$='2img_results'], [id$='2img_results']) {
            flex-direction: column-reverse;
          }
        }

        .extra-networks {
          .tab-nav [id*='_extra_'] {
            margin: 0;
          }

          .gradio-button {
            &[id$='_extra_sortorder'],
            &[id$='_extra_refresh'] {
              align-self: center;
            }

            &.secondary.lg[id$='_extra_refresh'] {
              max-width: fit-content;
              height: var(--button-lg-tool-height) !important;
              min-height: var(--button-lg-tool-height) !important;
              max-height: var(--button-lg-tool-height) !important;

              font-size: var(--text-md);
            }
          }
        }

        .extra-network-cards .card {
          box-shadow: 0 0 0 3px ${token.colorFillSecondary};
          transition: var(--button-transition);

          &:hover {
            box-shadow: 0 0 0 3px ${token.colorPrimary};
          }

          .actions {
            background: rgb(0 0 0 / 30%);
            backdrop-filter: saturate(120%) blur(4px);
            box-shadow: none;

            .name {
              font-size: var(--text-lg);
              word-break: break-word;
              line-break: auto;
            }

            &:hover {
              .description {
                max-height: none;
              }
            }
          }
        }
      `,
      splitView: css`
        #txt2img_toprow,
        #img2img_toprow {
          flex-direction: column !important;
          padding: 0 !important;
          background: transparent !important;
        }
      `,
      textares: css`
        [id$='2img_prompt'],
        [id$='2img_neg_prompt'] {
          textarea {
            resize: ${isPromptResizable ? 'vertical' : 'none'};

            overflow-y: auto;

            padding: 8px !important;

            font-family: ${token.fontFamilyCode} !important;
            font-size: 13px !important;
            line-height: 1.5 !important;
            word-wrap: break-word !important;
            white-space: pre-wrap !important;

            transition:
              all 0.3s,
              height 0s;
          }
        }

        [id$='2img_prompt'] > label > textarea {
          color: ${token.colorSuccessTextHover};

          &:focus {
            color: ${token.colorSuccessText};
          }
        }

        [id$='2img_neg_prompt'] > label > textarea {
          color: ${token.colorErrorTextHover};

          &:focus {
            color: ${token.colorError};
          }
        }

        .block.token-counter {
          z-index: 10 !important;
          top: -14px;
          right: 4px;
          scale: 0.8;

          background: ${token.colorBgContainer} !important;
          border-radius: 0.4em !important;

          > .translucent {
            display: none;
          }

          span {
            display: inline-block;
            font-family: var(--font-mono);
            border: 2px solid ${token.colorFillSecondary} !important;
          }

          span,
          &.error span {
            box-shadow: none;
          }
        }

        #lobe_txt2img_prompt .prompt_editor {
          min-height: ${TEXT2IMG_PROMPT_HEIGHT}px;
          max-height: ${isPromptResizable ? 'unset' : `${TEXT2IMG_PROMPT_HEIGHT}px`};
        }

        #lobe_img2img_prompt .prompt_editor {
          min-height: ${IMG2IMG_PROMPT_HEIGHT}px;
          max-height: ${isPromptResizable ? 'unset' : `${IMG2IMG_PROMPT_HEIGHT}px`};
        }

        #txt2img_prompt,
        #txt2img_neg_prompt {
          textarea {
            min-height: ${TEXT2IMG_PROMPT_HEIGHT}px;
            max-height: ${isPromptResizable ? 'unset' : `${TEXT2IMG_PROMPT_HEIGHT}px`};
          }
        }

        #img2img_prompt,
        #img2img_neg_prompt {
          textarea {
            min-height: ${IMG2IMG_PROMPT_HEIGHT}px;
            max-height: ${isPromptResizable ? 'unset' : `${IMG2IMG_PROMPT_HEIGHT}px`};
          }
        }
      `,
      txt2img: css`
        button[id$='_generate'] {
          height: var(--button-lg-height) !important;
          min-height: var(--button-lg-height) !important;
          max-height: var(--button-lg-height) !important;
        }

        [id$='img_settings'],
        .gradio-column.compact {
          display: flex !important;
          flex-direction: column !important;
          gap: 12px !important;

          .gradio-column:has(#img2img_res_switch_btn, #txt2img_res_switch_btn) {
            min-width: min(36px, 100%) !important;
          }

          > div:not([id$='_script_container'], .gradio-tabs):has(div),
          > fieldset {
            gap: 12px;

            margin: 0 !important;
            padding: 16px !important;

            background-color: ${token.colorBgContainer};
            border-radius: ${token.borderRadius}px;
          }

          .gradio-tabitem:has(.gradio-image) {
            background: ${token.colorFillQuaternary};
          }

          [id$='_script_container'] {
            display: flex;
            flex-direction: column;
            gap: 12px;

            * {
              --layout-gap: 12px !important;
            }

            > div {
              display: flex;
              flex-direction: column;
              gap: 12px;

              > div.gr-group.gradio-group:has(.label-wrap) {
                gap: 12px !important;

                margin: 0 !important;
                padding: 16px !important;

                background-color: ${token.colorBgContainer}!important;
                border: 1px solid ${token.colorBorderSecondary} !important;
                border-radius: ${token.borderRadius}px !important;
              }
            }

            .gradio-accordion:not(.hidden):has(div) {
              padding: 0 !important;
              border: none !important;
            }

            #script_list,
            > .gradio-group:not(.hidden):has(div) {
              display: flex;
              flex-direction: column;

              margin: 0;
              padding: 16px;

              background-color: ${token.colorBgContainer} !important;
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

            #axis_options {
              margin: 16px 0;
            }
          }
        }

        #txt2img_accordions,
        #img2img_accordions {
          flex-direction: column;
          padding: 0 !important;
          background: transparent !important;

          > div {
            background-color: ${token.colorBgContainer};
            border-radius: ${token.borderRadius}px !important;
          }

          span.icon {
            margin-right: 0;
          }
        }

        #img2img_toprow .interrogate-col {
          flex-direction: row !important;
          min-width: 100% !important;
        }

        #img2img_column_batch {
          min-width: 100% !important;
        }

        #tab_txt2img,
        #tab_img2img {
          [id$='_settings'] {
            min-width: 0 !important;

            [id^='img2img_tab_resize_'].tabitem.gradio-tabitem {
              padding: 16px 0 !important;
            }

            [id$='img_seed_extras'],
            #inpaint_controls {
              div {
                flex: 1;
              }
            }
          }

          #txt2img_gallery {
            overflow: hidden !important;
            border-radius: var(--border-radius) !important;
          }

          [id$='2img_tools'] > div {
            display: flex;
            justify-content: center;

            button {
              max-width: unset !important;
            }
          }

          .gradio-html[id^='img2img_label_copy_to'] {
            display: none;
          }

          .gradio-row[id^='img2img_copy_to'],
          .gap.compact,
          .image-buttons,
          .image_buttons_extras {
            gap: 8px !important;
          }
        }

        #npw {
          padding: 16px !important;

          background-color: ${token.colorBgContainer} !important;
          border: 1px solid ${token.colorBorderSecondary} !important;
          border-radius: ${token.borderRadius}px !important;
          box-shadow: none;
        }
      `,
    };
  },
);
