import { Theme, css } from 'antd-style';

export default (token: Theme) => css`
  .global-popup-close {
    background-color: ${token.colorBgMask} !important;
    backdrop-filter: blur(4px);

    &::before {
      font-size: 24px !important;
      line-height: 24px !important;
    }
  }

  .global-popup-inner {
    > div {
      border-radius: ${token.borderRadiusLG}px !important;
      box-shadow: ${token.boxShadow} !important;
    }

    .popup-metadata {
      overflow: auto;

      width: 75vw;
      max-height: 85vh;
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

      .standalone-card-preview {
        cursor: default;
        display: contents;
        width: 100%;
        height: auto;

        > img {
          position: relative;
        }
      }
    }

    .popup-dialog,
    .edit-user-metadata {
      width: 50vw !important;
    }
  }
`;
