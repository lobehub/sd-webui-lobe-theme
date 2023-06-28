import { Theme, css } from 'antd-style';

export default (token: Theme) => css`
  button {
    cursor: pointer;
    min-width: fit-content !important;

    &.gradio-button {
      &.tool {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 36px;
        min-width: 36px !important;
        max-width: 36px !important;
        height: 36px;
        min-height: 36px !important;
        max-height: 36px;
        padding: 0;

        font-size: 14px;
        line-height: 1;

        background: ${token.colorFillSecondary};
        border: 1px solid ${token.colorBorderSecondary};
        border-radius: ${token.borderRadius}px;

        &:hover {
          background: ${token.colorFill};
        }

        &.lg {
          max-width: max(36px, 100%) !important;
        }
      }

      &.secondary,
      &.primary {
        overflow: hidden;
        flex: 1;

        font-size: 14px;
        line-height: 1;
        text-overflow: ellipsis;

        &:active {
          box-shadow: ${token.boxShadowSecondary};
        }
      }

      &.secondary {
        font-weight: 500;
        background: ${token.colorFillTertiary};
        border: 1px solid ${token.colorBorderSecondary};
        border-radius: ${token.borderRadius}px !important;

        &:hover {
          color: ${token.colorText};
          background: ${token.colorFill};
          border-color: ${token.colorBorder};
        }
      }

      &:not(.tool, .svelte-1p4r00v) {
        &.primary,
        &.secondary {
          &.lg {
            height: 44px !important;
            min-height: 44px !important;
            max-height: 44px !important;
          }
        }
      }

      &[id$='_generate'] {
        height: 44px !important;
        min-height: 44px !important;
        max-height: 44px !important;
      }

      &[id$='_interrupt'] {
        min-width: 0;
        border-right: none !important;
        border-radius: ${token.borderRadius}px 0 0 ${token.borderRadius}px !important;
      }

      &[id$='_skip'] {
        min-width: 0;
        border-radius: 0 ${token.borderRadius}px ${token.borderRadius}px 0 !important;
      }

      &[id$='_interrupt'],
      &[id$='_skip'] {
        color: #fff !important;
        background: ${token.colorError} !important;

        &:hover {
          color: #fff !important;
          background: ${token.colorErrorHover} !important;
        }

        &:active {
          color: #fff !important;
          background: ${token.colorErrorActive} !important;
        }
      }

      &#interrogate,
      &#deepbooru {
        display: block !important;
      }
    }
  }

  div[id^='image_buttons_'] {
    flex-wrap: wrap;
    gap: 4px !important;

    > button {
      flex: 1;
      min-width: min(30%, 56px);
      font-size: 12px !important;
    }
  }
`;
