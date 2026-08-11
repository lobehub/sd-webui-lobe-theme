import { css } from 'antd-style';

export default () => {
  return css`
    [id$='_settings'] {
      label {
        overflow: hidden;
        display: block !important;
      }
    }

    label {
      position: relative;
      min-width: 64px;
      text-overflow: ellipsis;
      white-space: nowrap;

      > span {
        overflow: hidden;
        width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  `;
};
