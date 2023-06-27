import { createStyles } from 'antd-style';
import { rgba } from 'polished';

export const useStyles = createStyles(
  ({ css, token }, { headerHeight = 64 }: { headerHeight?: number; size?: number }) => ({
    container: css`
      height: calc(100vh - ${headerHeight}px);
    `,
    inner: css`
      display: flex;
      flex-direction: column;
      gap: 16px;

      height: 100%;
      padding: 16px;

      [id$='_results'] {
        flex: 1;
        padding: 0 !important;
        background: none !important;

        > div:not([id$='_gallery_container']) {
          flex-grow: 0 !important;
        }

        div[id$='_gallery_container'] {
          flex-grow: 1 !important;
        }

        [id$='img_gallery_container'] {
          div:not(.livePreview) {
            box-sizing: border-box;
          }
        }

        [id$='_gallery'] {
          height: 100%;
        }

        .livePreview {
          top: 28px;
          left: 4px;
          background: ${token.colorBgElevated};
        }

        .preview {
          max-height: unset !important;
          background: ${rgba(token.colorBgLayout, 0.5)} !important;
        }

        .empty {
          height: 100%;
        }
      }

      button[id$='_generate'] {
        height: 44px !important;
        min-height: 44px !important;
        max-height: 44px !important;
      }

      button.svelte-1p4r00v {
        padding: 0;
      }

      p {
        margin: 0.2em 0;
        text-align: unset;
      }

      [id^='html_info_']:has(p) {
        padding: 8px 12px;

        font-family: ${token.fontFamilyCode};
        font-size: 12px;
        color: ${token.colorInfoText};

        background: ${token.colorInfoBg};
        border: 1px solid ${token.colorInfoBorder};
        border-radius: ${token.borderRadius}px;
      }
    `,
  }),
);
