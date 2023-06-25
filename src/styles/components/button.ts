import { Theme, css } from 'antd-style';

export default (token: Theme) => css`
  button,
  .gradio-button,
  .lg {
    cursor: pointer;

    position: relative;

    overflow: hidden;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;

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
`;
