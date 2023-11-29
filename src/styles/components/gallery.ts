import { Theme, css } from 'antd-style';

export default (token: Theme) => {
  const galleryBackground = css`
    background-color: ${token.colorBgContainer};
    background-image: linear-gradient(45deg, ${token.colorFillTertiary} 25%, transparent 25%),
      linear-gradient(-45deg, ${token.colorFillTertiary} 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, ${token.colorFillTertiary} 75%),
      linear-gradient(-45deg, transparent 75%, ${token.colorFillTertiary} 75%);
    background-position:
      0 0,
      0 10px,
      10px -10px,
      -10px 0;
    background-size: 20px 20px;
    border: 2px solid ${token.colorBorderSecondary} !important;
    border-radius: ${token.borderRadius}px !important;
  `;
  return css`
    .livePreview,
    .gradio-gallery,
    .gradio-image,
    .gradio-video,
    .gradio-file {
      ${galleryBackground}
    }

    div.block {
      &.livePreview,
      &.gradio-gallery,
      &.gradio-image,
      &.gradio-video,
      &.gradio-file {
        ${galleryBackground}
      }
    }

    div.svelte-awbtu4 {
      .livePreview,
      .gradio-gallery,
      .gradio-image,
      .gradio-video,
      .gradio-file {
        ${galleryBackground}
      }
    }

    .block.gradio-gallery {
      .thumbnail-item {
        position: unset;
        background: ${token.colorBgContainer} !important;
        box-shadow: none;

        &.thumbnail-small {
          transform: none;
          border-radius: 4px;
          transition: var(--button-transition);
        }

        &.thumbnail-lg {
          border-radius: 5px;
          transition: var(--button-transition);
        }

        &:hover {
          transform: translateY(-2px);
          box-shadow:
            0 0 0 1px ${token.colorBorder},
            var(--thumbnail-shadow);
        }

        &.thumbnail-small:hover {
          transform: none;
          box-shadow: 0 0 0 1px ${token.colorBorder};
        }
      }

      > .grid-wrap {
        margin: -52px;
        padding: 60px;
      }
    }

    [id$='_gallery_container'] {
      min-height: 470px;

      > div:not([id$='_generate_box']) {
        flex-grow: 1;

        [id$='_gallery'] {
          flex-grow: 1;
        }
      }
    }

    div[id^='img2img_'].block.gradio-image {
      height: auto !important;
    }
  `;
};
