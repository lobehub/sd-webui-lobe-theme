import { Theme, css } from 'antd-style';

/** Extra extension skins for Forge Neo installs */
export default (token: Theme) => css`
  /* —— sd-dynamic-prompts —— */
  #sddp-dynamic-prompting {
    margin-block: 8px;

    .sddp-warning {
      color: ${token.colorWarning} !important;
    }

    .sddp-info {
      color: ${token.colorTextDescription} !important;
    }

    .codeblock,
    .codeblock textarea {
      font-family: ${token.fontFamilyCode} !important;
    }
  }

  #tab_sddp-wildcard-manager {
    #sddp-wildcard-tree {
      overflow: auto;

      max-height: 60vh;
      padding: 8px;
      border: 1px solid ${token.colorBorderSecondary};
      border-radius: ${token.borderRadius}px;

      background: ${token.colorBgContainer};
    }

    #sddp-wildcard-file-editor textarea {
      font-family: ${token.fontFamilyCode} !important;
      font-size: 13px !important;
    }

    #sddp-wildcard-search input {
      border-radius: ${token.borderRadius}px;
    }
  }

  /* —— z-tipo-extension —— */
  #txt2img_tipo_accordion,
  #img2img_tipo_accordion {
    margin-block: var(--spacing-lg, 12px);

    &.input-accordion .label-wrap.open {
      margin-bottom: 8px;
      padding-bottom: 8px;
    }
  }

  /* —— ADetailer Neo (nested accordions without classic ids) —— */
  [id$='_adetailer_ad_main_accordion'] {
    .gradio-accordion {
      margin: var(--spacing-lg, 12px) 0 !important;

      .label-wrap.open {
        margin-bottom: 0;
        padding-bottom: 8px;
      }
    }
  }

  [id*='_adetailer_ad_controlnet_guidance_start_end'] {
    margin-top: 8px;
  }

  /* —— booru-tags-gacha (no stable elem_ids; style sampler-section buttons gently) —— */
  #txt2img_script_container .gradio-accordion button.primary,
  #img2img_script_container .gradio-accordion button.primary {
    border-radius: ${token.borderRadius}px !important;
  }
`;
