import { Theme, css } from 'antd-style';

export default (token: Theme) => css`
  button:not([role='switch'], .ant-btn, .svelte-1p4r00v),
  .gradio-button,
  .lg {
    cursor: pointer;

    overflow: hidden;
    flex: 1;

    padding: 8px 16px;

    font-size: 14px;
    font-weight: 500;
    line-height: 1;
    text-overflow: ellipsis;

    background: ${token.colorFillTertiary};
    border: 1px solid ${token.colorBorderSecondary};
    border-radius: ${token.borderRadius}px !important;

    &:hover {
      color: ${token.colorText};
      background: ${token.colorFill};
      border-color: ${token.colorBorder};
    }

    &:active {
      box-shadow: ${token.boxShadowSecondary};
    }
  }

  .gradio-button.tool {
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
  }

  .gradio-button.tool.lg {
    max-width: max(36px, 100%) !important;
  }

  #txt2img_interrupt,
  #img2img_interrupt {
    border-right: 1px solid ${token.colorBgLayout};
    border-radius: ${token.borderRadius}px 0 0 ${token.borderRadius}px !important;
  }

  #txt2img_skip,
  #img2img_skip {
    border-radius: 0 ${token.borderRadius}px ${token.borderRadius}px 0 !important;
  }

  #txt2img_interrupt,
  #txt2img_skip,
  #img2img_interrupt,
  #img2img_skip {
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

  #interrogate,
  #deepbooru {
    display: block !important;
  }

  #txt2img_dimensions_row,
  #img2img_dimensions_row {
    min-width: 36px !important;
  }
`;
