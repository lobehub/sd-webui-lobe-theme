import { css } from 'antd-style';

export default () => css`
  @media (max-width: 575px) {
    #quicksettings {
      flex-wrap: wrap !important;
      gap: 6px !important;

      > div,
      > fieldset {
        flex: 1 1 100% !important;
        min-width: 0 !important;
        max-width: unset !important;
      }

      #forge_ui_preset,
      #setting_sd_model_checkpoint,
      #sd_model_checkpoint,
      #setting_sd_modules,
      #forge_ui_dtype {
        flex: 1 1 100% !important;
      }

      #forge_refresh_checkpoint {
        flex: 0 0 auto !important;
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

    /* Dual sidebars: full-bleed overlays, don't squeeze content */
    html[data-lobe-forge='true'] {
      #root {
        [class*='draggable-panel'],
        [class*='DraggablePanel'] {
          max-width: min(92vw, 360px);
        }
      }

      .forge-toolbar,
      .forge-toolbar-static {
        flex-wrap: wrap !important;
        gap: 4px !important;
        max-width: 100%;
        padding: 4px !important;
      }

      .forge-toolbar-box-a,
      .forge-toolbar-box-b {
        flex-wrap: wrap;
        gap: 4px;
      }

      .forge-btn {
        min-width: 32px !important;
        height: 32px !important;
      }

      #txt2img_size_toolbox,
      #img2img_size_toolbox {
        flex-wrap: wrap;
        width: 100%;
      }

      #txt2img_enqueue_wrapper,
      #img2img_enqueue_wrapper {
        flex-wrap: wrap;
        width: 100%;
      }

      #txt2img_enqueue,
      #img2img_enqueue,
      [id$='_generate'] {
        flex: 1 1 auto;
        min-width: 0 !important;
      }
    }
  }
`;
