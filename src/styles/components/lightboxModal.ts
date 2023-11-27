import {Theme, css} from 'antd-style';

export default (token: Theme) => css`
  #lightboxModal {
    background-color: var(--popup-overlay) !important;
    background-image: var(--grain);
    backdrop-filter: saturate(120%) blur(80px);
    outline: none;
  }

  .modalControls {
    transition: var(--button-transition) !important;
  }

  .modalControls:hover {
    background-color: transparent !important;
  }

  .modalControls span {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 32px !important;

    font-size: 35px !important;
    color: ${token.colorTextDescription} !important;
    text-align: center;
    text-shadow: none !important;

    transition: var(--button-transition);
  }

  .modalControls span:hover,
  .modalControls span:focus {
    color: ${token.colorPrimary} !important;
  }

  #lightboxModal > img:not(.modalImageFullscreen) {
    box-shadow: var(--lightbox-img-shadow);
  }

  .modalPrev,
  .modalNext {
    top: 0 !important;
    transform: translate(0, calc(50% + 63px)) !important;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 48px !important;
    height: 50%;
    padding: 8px !important;

    font-size: 20px !important;
    font-weight: 600 !important;
    color: ${token.colorTextDescription} !important;

    background-color: ${token.colorFillTertiary};
    border-radius: 0 16px 16px 0 !important;

    transition: var(--button-transition) !important;
  }

  .modalNext {
    border-radius: 16px 0 0 16px !important;
  }

  .modalPrev:hover,
  .modalNext:hover {
    color: ${token.colorPrimary} !important;
    background-color: ${token.colorFillSecondary} !important;
  }
`;
