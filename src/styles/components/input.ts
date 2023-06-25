import { Theme, css } from 'antd-style';

export default (token: Theme) => {
  return css`
    .block.gradio-checkbox {
      margin: 0 !important;
    }

    label {
      position: relative;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    label > span,
    input:not([type='range'], [type='checkbox']) {
      overflow: hidden;
      width: 100%;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    input:not([type='range'], [type='checkbox'], [type='number'], [type='radio'], .border-none) {
      resize: none;
      height: 36px !important;
      border-radius: ${token.borderRadius}px;
    }

    input[type='number'] {
      height: 28px !important;
      border-radius: ${token.borderRadius}px;
    }
  `;
};
