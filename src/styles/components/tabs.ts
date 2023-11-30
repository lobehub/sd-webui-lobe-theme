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

      font-size: var(--text-md);
      color: ${token.colorTextTertiary} !important;

      background: ${token.colorFillTertiary} !important;
      border: none !important;
      border-radius: 4px !important;

      transition: var(--button-transition);

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

  #tab_settings {
    #settings .tab-nav {
      width: 15%;

      button {
        width: 100%;
        background: transparent !important;

        &.selected {
          color: ${token.colorPrimary} !important;
          background: transparent !important;
          border: none !important;
          border-radius: 0 !important;
        }
      }

      .settings-category {
        text-decoration: none;
        text-transform: uppercase;
      }

      #settings_show_all_pages {
        width: auto;
        background: ${token.colorFillTertiary} !important;
        border: 1px solid ${token.colorBorderSecondary};
        border-radius: ${token.borderRadius}px !important;

        &:hover {
          background: ${token.colorFill} !important;
          border-color: ${token.colorBorder} !important;
        }
      }
    }

    .tabitem {
      margin-left: 15%;
    }

    #settings_search {
      margin: 0 0 var(--spacing-xl);
    }
  }
`;
