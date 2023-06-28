import { Theme, css } from 'antd-style';

export default (token: Theme) => css`
  .tabitem,
  .gradio-tabitem {
    padding: 16px !important;
    background: ${token.colorBgContainer};
    border: none !important;
    border-radius: ${token.borderRadius}px;
  }

  #tabs {
    > .tabitem.gradio-tabitem {
      background: transparent !important;
    }
  }

  .tab-nav {
    gap: 8px;
    margin-bottom: 8px;
    border: none !important;

    button {
      cursor: pointer;

      display: block;
      flex: 1 !important;

      min-width: 100px;
      padding: 8px !important;

      font-size: 14px;

      background: ${token.colorFillTertiary} !important;
      border: none !important;
      border-radius: 4px !important;

      transition: all 0.2s ease-in-out;

      &:hover {
        color: ${token.colorText} !important;
        background: ${token.colorFill} !important;
        border: none !important;
      }

      &.selected {
        font-weight: 600;
        color: ${token.colorText} !important;

        background: ${token.colorFillSecondary} !important;
        border: none !important;
        border-bottom: 2px solid ${token.colorPrimary} !important;
        border-bottom-right-radius: 0 !important;
        border-bottom-left-radius: 0 !important;
      }
    }
  }

  #tab_settings .tab-nav {
    button {
      background: transparent !important;
      border-radius: 0 !important;

      &:hover {
        background: transparent !important;
        border-radius: 0 !important;
      }

      &.selected {
        background: transparent !important;
        border: none !important;
        border-left: 2px solid var(--color-primary) !important;
        border-radius: 0 !important;
      }
    }
  }
`;
