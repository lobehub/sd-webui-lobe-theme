import { Theme, css } from 'antd-style';

export default (token: Theme) => {
  const galleryBackground = css`
    background-color: ${token.colorBgContainer};
    background-image: linear-gradient(45deg, ${token.colorFillTertiary} 25%, transparent 25%),
      linear-gradient(-45deg, ${token.colorFillTertiary} 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, ${token.colorFillTertiary} 75%),
      linear-gradient(-45deg, transparent 75%, ${token.colorFillTertiary} 75%);
    background-position: 0 0, 0 10px, 10px -10px, -10px 0;
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

    button.thumbnail-item {
      background: ${token.colorBgContainer} !important;
    }
  `;
};
