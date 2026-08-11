import { Theme, css } from 'antd-style';

/**
 * Forge Neo / Gradio 4 compat styles.
 * Applied when html[data-lobe-forge='true'] is set by detectForgeNeo().
 */
export default (token: Theme) => css`
  html[data-lobe-forge='true'] {
    /* —— Quicksettings model strip —— */
    #quicksettings {
      #forge_ui_preset,
      #setting_sd_model_checkpoint,
      #sd_model_checkpoint,
      #setting_sd_modules {
        flex: 1;
        min-width: 0;
      }

      #forge_ui_dtype {
        min-width: 7rem;
      }

      #forge_refresh_checkpoint {
        min-width: var(--button-lg-tool-height) !important;
        max-width: var(--button-lg-tool-height) !important;
      }

      .model_selection {
        min-width: 0;
      }

      /* Gradio 4 dropdown caret inside sidebar / top quicksettings */
      .icon-wrap {
        pointer-events: none !important;

        position: absolute !important;
        top: 50% !important;
        right: 8px !important;
        transform: translateY(-50%) !important;

        width: 16px !important;
        height: 16px !important;
        margin: 0 !important;
      }

      .dropdown-arrow {
        width: 16px !important;
        height: 16px !important;
      }

      .gradio-dropdown {
        overflow: visible !important;
      }
    }

    /* —— ForgeCanvas —— */
    .forge-container {
      overflow: hidden;
      border-radius: ${token.borderRadius}px;
    }

    .forge-toolbar,
    .forge-toolbar-static {
      gap: 4px;

      padding: 6px 8px;
      border: 1px solid ${token.colorBorderSecondary} !important;
      border-radius: ${token.borderRadius}px;

      background: ${token.colorBgContainer} !important;
    }

    .forge-btn {
      border: 1px solid ${token.colorBorderSecondary} !important;
      border-radius: ${token.borderRadiusSM}px !important;
      color: ${token.colorText} !important;
      background: ${token.colorFillSecondary} !important;

      &:hover {
        border-color: ${token.colorBorder} !important;
        background: ${token.colorFill} !important;
      }
    }

    .forge-toolbar-label {
      color: ${token.colorTextSecondary} !important;
    }

    .forge-toolbar-color,
    .forge-toolbar-range {
      accent-color: ${token.colorPrimary};
    }

    .forge-image-container:not(.plain) {
      border-color: ${token.colorBorderSecondary};
      background-color: ${token.colorBgLayout};
    }

    .forge-upload-hint {
      color: ${token.colorTextDescription} !important;
    }

    .forge-scribble-indicator {
      border-color: ${token.colorPrimary} !important;
    }

    /* —— forge-neo-aspect-ratio-helper —— */
    #txt2img_size_toolbox,
    #img2img_size_toolbox {
      display: flex !important;
      flex-direction: column;
      gap: 4px;
      align-items: stretch;

      width: max-content;
      min-width: 4.5rem !important;
    }

    #txt2img_dimensions_row,
    #img2img_dimensions_row {
      &:has([id$='_size_toolbox']) {
        flex-shrink: 0 !important;
        min-width: fit-content !important;
        max-width: none !important;
      }
    }

    #txt2img_ratio,
    #img2img_ratio {
      min-width: unset;
      max-width: fit-content;
      padding: 0 !important;
      border: none !important;

      background: transparent !important;
      box-shadow: none !important;
    }

    #txt2img_select_aspect_ratio,
    #img2img_select_aspect_ratio,
    #txt2img_ratio select,
    #img2img_ratio select {
      width: auto !important;
      min-width: 4.5em !important;
      max-width: none !important;
      padding: 4px 8px !important;
      border: 1px solid ${token.colorBorder} !important;
      border-radius: ${token.borderRadius}px !important;

      color: ${token.colorText} !important;
      text-align: center;

      background: ${token.colorBgContainer} !important;
      box-shadow: none !important;
    }

    .arh-btn-row {
      gap: 4px;

      button {
        min-width: fit-content !important;
        height: var(--button-lg-tool-height) !important;
      }
    }

    .ar-option {
      color: ${token.colorText};
    }

    /* —— Agent Scheduler Neo —— */
    #tab_agent_scheduler {
      .ag-theme-gradio {
        --ag-background-color: ${token.colorBgContainer};
        --ag-header-background-color: ${token.colorFillQuaternary};
        --ag-odd-row-background-color: ${token.colorFillQuaternary};
        --ag-row-hover-color: ${token.colorFillSecondary};
        --ag-selected-row-background-color: ${token.colorPrimaryBg};
        --ag-border-color: ${token.colorBorderSecondary};
        --ag-foreground-color: ${token.colorText};
        --ag-header-foreground-color: ${token.colorTextSecondary};
        --ag-secondary-foreground-color: ${token.colorTextDescription};
        --ag-input-focus-border-color: ${token.colorPrimary};

        overflow: hidden;
        border-radius: ${token.borderRadius}px;
      }

      .ag-root-wrapper {
        border-color: ${token.colorBorderSecondary} !important;
      }

      .ag-header {
        background: ${token.colorFillQuaternary} !important;
      }

      .ag-row {
        border-color: ${token.colorBorderSecondary} !important;
      }

      .ag-cell {
        color: ${token.colorText};
      }

      button.ts-btn-action {
        border-radius: ${token.borderRadiusSM}px !important;
      }
    }

    #txt2img_enqueue,
    #img2img_enqueue {
      height: var(--button-lg-height) !important;
      min-height: var(--button-lg-height) !important;
      border-radius: ${token.borderRadius}px !important;
      font-weight: 500;
    }

    #txt2img_enqueue_wrapper,
    #img2img_enqueue_wrapper {
      gap: 4px;
    }

    .interrogate-col.has-queue-button {
      gap: 4px;
    }

    /* —— TagComplete over PromptHighlight —— */
    .autocompleteParent,
    .autocompleteResults {
      z-index: 1100 !important;
    }

    .autocompleteResults {
      border: 1px solid ${token.colorBorder} !important;
      border-radius: ${token.borderRadius}px !important;

      color: ${token.colorText} !important;

      background: ${token.colorBgElevated} !important;
      box-shadow: ${token.boxShadowSecondary} !important;
    }

    .autocompleteResultsList > li {
      border-color: ${token.colorBorderSecondary} !important;
      color: ${token.colorText} !important;

      &:hover,
      &.selected {
        color: ${token.colorText} !important;
        background: ${token.colorFillSecondary} !important;
      }
    }

    .acMetaText,
    .sideInfo {
      color: ${token.colorTextDescription} !important;
    }

    /* PromptHighlight must stay under TAC and not steal clicks */
    [data-code-type='highlighter'] {
      pointer-events: none !important;
      z-index: 0 !important;
    }

    textarea.autocomplete {
      position: relative;
      z-index: 1;
    }
  }
`;
