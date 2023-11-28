import { Theme, css } from 'antd-style';

export default (token: Theme) => css`
  .global-popup {
    backdrop-filter: saturate(120%) blur(4px) !important;
  }

  .global-popup-close {
    position: relative;
    top: 16px !important;
    right: 16px !important;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 32px;
    height: 32px;

    background-color: ${token.colorFillSecondary};
    backdrop-filter: saturate(120%) blur(80px);
    border-radius: ${token.borderRadius}px;

    &::before {
      font-size: 24px !important;
      line-height: 24px !important;
    }

    &:hover {
      color: ${token.colorPrimary} !important;
      background-color: ${token.colorFillSecondary} !important;
    }
  }

  .global-popup-inner {
    max-width: 80%;

    > div {
      border-radius: ${token.borderRadiusLG}px !important;
      box-shadow: ${token.boxShadow} !important;
    }

    .popup-metadata {
      overflow: auto;

      width: 75vw;
      height: 75vh;
      padding: 32px;

      font-family: ${token.fontFamilyCode};
      color: ${token.colorText};
      word-break: break-word;

      background: ${token.colorBgLayout};
      border-radius: ${token.borderRadiusLG}px !important;
      border-radius: ${token.borderRadius}px;
      box-shadow: ${token.boxShadow} !important;
    }

    .edit-user-metadata {
      > div:not(.edit-user-metadata-buttons):not(:last-child) {
        margin: 0 0 8px;
      }
    }
  }
`;
