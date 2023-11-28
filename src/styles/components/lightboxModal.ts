import { Theme, css } from 'antd-style';

export default (token: Theme) => css`
  #lightboxModal {
    background-color: var(--popup-overlay) !important;
    backdrop-filter: saturate(120%) blur(80px);
    outline: none;

    > img:not(.modalImageFullscreen) {
      box-shadow: var(--lightbox-img-shadow);
    }
  }

  .modalControls {
    transition: var(--button-transition) !important;

    &:hover {
      background-color: transparent !important;
    }

    .cursor {
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;

      width: 32px !important;
      height: 32px !important;

      background-color: ${token.colorFillTertiary};
      backdrop-filter: saturate(120%) blur(80px);
      border-radius: ${token.borderRadius}px;

      > svg {
        width: 20px !important;
        height: 20px !important;
      }

      &:hover {
        color: ${token.colorPrimary} !important;
        background-color: ${token.colorFillSecondary} !important;
      }
    }

    span {
      display: flex;
      align-items: center;
      justify-content: center;

      width: 32px !important;

      font-size: 35px !important;
      color: ${token.colorTextDescription} !important;
      text-align: center;
      text-shadow: none !important;

      transition: var(--button-transition);

      &:hover,
      &:focus {
        color: ${token.colorPrimary} !important;
      }
    }
  }

  .modalPrev,
  .modalNext {
    top: 0 !important;
    transform: translate(0, calc(50% + 63px)) !important;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 44px !important;
    height: 50%;
    padding: 8px !important;

    font-size: 20px !important;
    font-weight: 600 !important;
    color: ${token.colorTextDescription} !important;

    background-color: ${token.colorFillTertiary};
    border-radius: 0 ${token.borderRadius}px ${token.borderRadius}px 0 !important;

    transition: var(--button-transition) !important;

    svg {
      width: 20px !important;
      height: 20px !important;
    }
  }

  .modalNext {
    border-radius: ${token.borderRadius}px 0 0 ${token.borderRadius}px !important;
  }

  .modalPrev:hover,
  .modalNext:hover {
    color: ${token.colorPrimary} !important;
    background-color: ${token.colorFillSecondary} !important;
  }
`;
