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

        .float {
          ${stylish.blur};
          border-top-left-radius: 0;
          border-top-right-radius: 0;
          border-bottom-left-radius: 0;
        }

        [id^='html_info_']:has(div.prose) {
          p {
            padding: 8px;

            font-family: ${token.fontFamilyCode};
            font-size: 13px !important;
            color: ${token.colorInfo} !important;

            background: ${token.colorInfoBg};
            border: 1px solid ${token.colorInfoBorder};
            border-radius: ${token.borderRadius}px;
          }
        }

        #txt2img_styles_edit_button， #img2img_styles_edit_button {
          max-width: 36px !important;
        }

        #txt2img_generate,
        #img2img_generate,
        #extras_generate {
          border-radius: ${token.borderRadius}px !important;
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
      `,
      splitView: css`
        #txt2img_toprow,
        #img2img_toprow {
          flex-direction: column !important;
          padding: 0 !important;
          background: transparent !important;
        }
      `,
      text2img: css`
        button[id$='_generate'] {
          height: 44px !important;
          min-height: 44px !important;
          max-height: 44px !important;
        }

        #txt2img_accordions,
        #img2img_accordions {
          padding: 0 !important;
          background: transparent !important;

          > div {
            background-color: ${token.colorBgContainer}!important;
          }
        }

        #img2img_toprow .interrogate-col {
          flex-flow: row wrap;
          min-width: 100% !important;
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
          }
        }

        #img2img_column_batch {
          min-width: 100% !important;
        }

        #tab_txt2img,
        #tab_img2img {
          [id$='_settings'] {
            min-width: 0 !important;

            div.svelte-15lo0d8 > *,
            div.svelte-15lo0d8 > .form > * {
              flex: 1;
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
      `,
      textares: css`
        [id$='2img_prompt'],
        [id$='2img_neg_prompt'] {
          textarea {
            resize: ${isPromptResizable ? 'vertical' : 'none'};

            overflow-y: auto;

            padding: 8px !important;

            font-family: ${token.fontFamilyCode};
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
          top: -12px;
          right: 4px;
          scale: 0.8;

          background: ${token.colorBgContainer} !important;

          > .translucent {
            display: none;
          }

          span {
            display: inline-block;
            font-family: ${token.fontFamilyCode};
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

        #text2img_prompt,
        #text2img_neg_prompt {
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
    };
  },
);
