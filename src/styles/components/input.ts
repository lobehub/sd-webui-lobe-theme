import { Theme, css } from 'antd-style';

export default (token: Theme) => {
  return css`
    .block.gradio-checkbox {
      margin: 0 !important;
    }

    .block.gradio-slider {
      input[type='number'] {
        margin-left: 12px;
      }
    }

    label:has(input[type='radio']),
    label:has(input[type='checkbox']) {
      border-radius: ${token.borderRadius}px !important;
    }

    /* Gradio 4 file / checkbox polish */
    .block.gradio-file,
    .block.gradio-uploadbutton {
      border-radius: ${token.borderRadius}px !important;
    }

    .wrap.default.full {
      border-radius: ${token.borderRadius}px;
    }

    input {
      &:not(
        [type='range'],
        [type='checkbox'],
        [type='number'],
        [type='radio'],
        [type='file'],
        .border-none
      ) {
        resize: none;

        overflow: hidden;

        width: 100%;
        height: var(--button-lg-tool-height) !important;
        border-radius: ${token.borderRadius}px;

        text-overflow: ellipsis;
        white-space: nowrap;
      }

      &[type='checkbox'],
      &[type='radio'] {
        cursor: pointer;

        flex: 0;

        width: ${token.fontSize}px;
        min-width: ${token.fontSize}px;
        max-width: ${token.fontSize}px;
        height: ${token.fontSize}px;
        min-height: ${token.fontSize}px;
        max-height: ${token.fontSize}px;

        appearance: none !important;
      }

      &[type='checkbox'] {
        --ring-color: transparent;

        position: relative;

        border: 1px solid ${token.colorBorder} !important;
        border-radius: ${token.borderRadiusSM}px !important;

        line-height: var(--line-sm);

        background-color: ${token.colorFillTertiary} !important;

        &:checked {
          border-color: ${token.colorPrimaryBorder} !important;
          background-color: ${token.colorPrimary} !important;
          background-image: var(--checkbox-check) !important;
        }
      }

      &[type='number'] {
        height: var(--button-lg-tool-height) !important;
        border-radius: ${token.borderRadius}px;
      }
    }
  `;
};
