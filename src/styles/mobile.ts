import { css } from 'antd-style';

export default () => css`
  @media (max-width: 575px) {
    #quicksettings {
      > div,
      > fieldset {
        flex: 1 !important;
        max-width: unset !important;
      }
    }

    .tabs {
      .tabitem,
      .gradio-tabitem {
        padding: 8px !important;
      }

      #img2img_results,
      #txt2img_results,
      #extras_results {
        position: relative;
        top: 0 !important;
        width: 100%;

        &.mobile {
          margin-top: 8px;
        }
      }

      [id$='_settings'] {
        width: 100%;
      }
    }

    #tab_settings {
      #settings .tab-nav {
        width: 35%;
      }

      .tabitem {
        margin-left: 35%;
      }
    }
  }
`;
