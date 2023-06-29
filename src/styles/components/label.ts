import { css } from 'antd-style';

export default () => {
  return css`
    [id$='_settings'] {
      label.svelte-1ojmf70 {
        overflow: hidden;
        display: block !important;
      }
    }

    label {
      position: relative;
      min-width: 64px;
      text-overflow: ellipsis;
      white-space: nowrap;

      &.svelte-1pie7s6 {
        display: unset !important;
      }

      > span.svelte-1gfkn6j {
        overflow: hidden;
        width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  `;
};
