import { createStyles } from 'antd-style';
import { adjustHue, rgba } from 'polished';

export const useStyles = createStyles(
  (
    { css, token, stylish },
    { headerHeight = 64, isPrimaryColor }: { headerHeight?: number; isPrimaryColor?: boolean },
  ) => {
    const primaryGradient =
      isPrimaryColor &&
      css`
        background-image: linear-gradient(
          -45deg,
          ${token.colorPrimary},
          ${adjustHue(45, token.colorPrimary)},
          ${token.colorPrimary},
          ${adjustHue(-45, token.colorPrimary)}
        );
      `;
    return {
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

          > div:not([id$='_gallery_container']) {
            flex-grow: 0 !important;
          }

          [id$='_gallery_container'] {
            flex-grow: 1 !important;
          }
        }
      `,
      preview: css`
        button {
          &#extras_generate {
            position: relative;
          }

          &.svelte-1p4r00v {
            padding: 0;
          }

          &[id$='_generate'] {
            overflow: unset !important;

            &::before {
              ${stylish.gradientAnimation};
              ${primaryGradient};
              position: absolute;
              z-index: -1;
              inset: 0;

              content: '';

              filter: blur(8px);
              opacity: 0.5;
            }
          }
        }

        .progressDiv > .progress {
          ${stylish.gradientAnimation};
          ${primaryGradient};
        }

        [id$='_results'] {
          padding: 0 !important;
          background: none !important;

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

          [id^='html_info_']:has(p) {
            padding: 8px 12px;

            font-family: ${token.fontFamilyCode};
            font-size: 12px;
            color: ${token.colorInfoText};

            background: ${token.colorInfoBg};
            border: 1px solid ${token.colorInfoBorder};
            border-radius: ${token.borderRadius}px;
          }

          p {
            margin: 0.2em 0;
            text-align: unset;
          }
        }
      `,
    };
  },
);
