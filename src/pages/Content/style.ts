import { createStyles } from 'antd-style';
import { adjustHue, rgba } from 'polished';

const MIN_HEIGHT = 88;
const GALLERY_LIGHT =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAAFpJREFUWAntljEKADAIA23p6v//qQ+wfUEcCu1yriEgp0FHRJSJcnehmmWm1Dv/lO4HIg1AAAKjTqm03ea88zMCCEDgO4HV5bS757f+7wRoAAIQ4B9gByAAgQ3pfiDmXmAeEwAAAABJRU5ErkJggg==';
const GALLERY_DARK =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAABGdBTUEAALGPC/xhBQAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAIKADAAQAAAABAAAAIAAAAACPTkDJAAAAZUlEQVRIDe2VMQoAMAgDa9/g/1/oIzrpZBCh2dLFkkoDF0Fz99OdiOjks+2/7S8fRRmMMIVoRGSoYzvvqF8ZIMKlC1GhQBc6IkPzq32QmdAzkEGihpWOSPsAss8HegYySNSw0hE9WQ4StafZFqkAAAAASUVORK5CYII=';
export const useStyles = createStyles(
  (
    { cx, css, token, stylish, isDarkMode },
    { isPromptResizable, isPrimaryColor }: { isPrimaryColor: boolean; isPromptResizable: boolean },
  ) => {
    const galleryBackground = css`
      background: url(${isDarkMode ? GALLERY_DARK : GALLERY_LIGHT}) 0% 0% / 20px !important;
      border: 2px solid ${token.colorBorderSecondary} !important;
      border-radius: ${token.borderRadius}px !important;
    `;
    return {
      autocompleteResults: css`
        .autocompleteResults {
          font-family: ${token.fontFamilyCode};

          background: ${token.colorBgElevated} !important;
          border-color: ${token.colorBorder} !important;
          border-radius: ${token.borderRadius}px !important;
          box-shadow: ${token.boxShadow};

          li:nth-child(odd) {
            background: transparent !important;
          }

          li {
            border-bottom: 1px solid ${token.colorBorder};

            &:hover {
              background: ${token.colorFillSecondary} !important;
            }
          }
        }
      `,
      background: cx(
        stylish.gradientAnimation,
        isPrimaryColor &&
          css`
            background-image: linear-gradient(
              -45deg,
              ${token.colorPrimary},
              ${adjustHue(45, token.colorPrimary)},
              ${token.colorPrimary},
              ${adjustHue(-45, token.colorPrimary)}
            );
          `,
        css`
          pointer-events: none;

          position: absolute !important;
          z-index: 0;
          top: -100px;
          right: -20vw;
          transform: rotate(4deg);

          width: 60vw;
          height: 200px;

          opacity: 0.2;
          filter: blur(100px);
        `,
      ),
      container: css`
        position: relative;
        flex: 1;
        min-width: 0;

        .float {
          ${stylish.blur};
          border-top-left-radius: 0;
          border-top-right-radius: 0;
          border-bottom-left-radius: 0;
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
      `,
      draggablePanel: css`
        .draggable-line {
          flex: none !important;

          width: 2px;
          min-width: 2px !important;
          max-width: 2px !important;

          border-left: 1px dashed ${token.colorBorderSecondary};

          transition: all 0.3s ease-in-out;

          &:hover,
          &:active {
            cursor: col-resize;
            border-left: 2px solid ${token.colorPrimary};
          }
        }

        .draggable-container {
          flex-wrap: nowrap !important;
          gap: 12px;
          align-items: stretch !important;
        }
      `,
      gallery: css`
        .livePreview,
        .gradio-gallery,
        .gradio-image,
        .gradio-video,
        .gradio-file {
          ${galleryBackground}
        }

        div.block {
          &.livePreview,
          &.gradio-gallery,
          &.gradio-image,
          &.gradio-video,
          &.gradio-file {
            ${galleryBackground}
          }
        }

        div.svelte-awbtu4 {
          .livePreview,
          .gradio-gallery,
          .gradio-image,
          .gradio-video,
          .gradio-file {
            ${galleryBackground}
          }
        }

        button.thumbnail-item {
          background: ${token.colorBgContainer} !important;
        }

        div.preview.fixed-height {
          background: ${rgba(token.colorBgLayout, 0.5)};
        }
      `,
      text2img: css`
        [id$='img_gallery_container'] {
          div:not(.livePreview) {
            position: relative;
            box-sizing: border-box;
          }

          .livePreview {
            top: 46px;
            left: 20px;
          }
        }

        [id$='img_settings'],
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

          [id$='_script_container'] {
            display: flex;
            flex-direction: column;
            gap: 12px;

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
            div.svelte-15lo0d8 > *,
            div.svelte-15lo0d8 > .form > * {
              flex: 1;
            }
          }

          #txt2img_gallery {
            overflow: hidden !important;
            border-radius: var(--border-radius) !important;
          }

          .image-buttons button {
            min-width: min(160px, 100%) !important;
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

        #interrogate,
        #deepbooru {
          display: block !important;
        }
      `,
      textares: css`
        [id$='2img_prompt'],
        [id$='2img_neg_prompt'] {
          textarea {
            overflow-y: auto;

            min-height: ${isPromptResizable ? 'unset' : `${MIN_HEIGHT}px`};
            max-height: ${isPromptResizable ? 'unset' : `${MIN_HEIGHT}px`};
            padding: 12px;

            font-family: ${token.fontFamilyCode};
          }
        }

        [id$='2img_prompt'] textarea {
          color: ${token.colorSuccessTextHover};

          &:focus {
            color: ${token.colorSuccessText};
          }
        }

        [id$='2img_neg_prompt'] textarea {
          color: ${token.colorErrorTextHover};

          &:focus {
            color: ${token.colorError};
          }
        }

        .block.token-counter span {
          ${stylish.blur};
          display: inline-block;
          font-family: ${token.fontFamilyCode};
        }
      `,
    };
  },
);
