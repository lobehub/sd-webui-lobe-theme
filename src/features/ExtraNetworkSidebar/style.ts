import { createStyles } from 'antd-style';

export const useStyles = createStyles(
  ({ css, token }, { headerHeight = 64, size = 86 }: { headerHeight?: number; size?: number }) => ({
    body: css`
      .hide {
        display: none;
      }

      #txt2img_extra_search,
      #img2img_extra_search {
        width: 100% !important;
        max-width: unset !important;

        textarea {
          height: unset !important;
        }
      }

      #txt2img-extra-network-sidebar,
      #img2img-extra-network-sidebar {
        button.lg.secondary.gradio-button,
        #txt2img_extra_sort,
        #img2img_extra_sort {
          height: 34px !important;
          min-height: 34px !important;
        }

        .tabitem {
          padding: 0 !important;
          background: transparent;
        }
      }

      .extra-network-cards {
        overflow: unset;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(${size}px, 1fr));
        gap: 8px;

        height: unset;
        min-height: unset;

        .name {
          background: unset !important;
        }

        .additional {
          position: relative !important;
        }

        &:has(.nocards) {
          display: flex;
          flex-direction: column;
        }
      }

      .extra-networks {
        .tab-nav {
          align-items: center;

          > * {
            height: 40px !important;
            margin: 0 !important;
            font-size: var(--text-md) !important;
          }

          > button {
            &:first-child {
              display: none;
            }
          }
        }

        .extra-network-subdirs {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          align-items: center;

          margin-bottom: 12px;
          padding: 0 !important;

          > button {
            cursor: pointer;

            zoom: 0.8;

            flex: 1;

            min-width: 100px;
            margin: 0;
          }
        }

        .actions {
          background: rgb(0 0 0 / 30%);
          backdrop-filter: saturate(120%) blur(4px);
          box-shadow: none !important;

          .name {
            overflow: hidden;
            display: block;

            font-weight: bold;
            text-overflow: ellipsis;
            text-shadow: 0 1px 1px rgb(0 0 0 / 90%);
            white-space: nowrap;
          }

          .additional {
            position: absolute;
            display: none;

            > ul {
              display: flex;
              align-items: center;
              justify-content: center;

              margin: 0;
              padding: 0;

              a {
                margin: 0 !important;
                padding: 0 !important;

                font-size: var(--text-md) !important;
                color: #fff;
                text-overflow: ellipsis;
                text-shadow: 1px 1px black;
                white-space: nowrap;
              }
            }
          }

          .description {
            a:hover {
              color: var(--link-text-color-hover);
            }
          }
        }

        .card {
          overflow: hidden;

          width: 100% !important;
          height: ${size * 1.5}px !important;
          margin: 0 !important;

          background-size: cover;
          border: 1px solid ${token.colorBorderSecondary};
          border-radius: ${token.borderRadiusSM}px;
          outline: none;

          transition:
            box-shadow 200ms ${token.motionEaseOut},
            scale 400ms ${token.motionEaseOut};

          .name {
            font-size: var(--text-sm) !important;
          }

          &:hover {
            border-color: ${token.colorPrimary};
            box-shadow: 0 0 0 1px ${token.colorPrimary};

            .additional {
              display: flex !important;
            }

            .name {
              word-break: break-word;
              line-break: auto;
              white-space: unset;
            }
          }

          &:active {
            scale: 0.9;
          }
        }

        .button-row {
          padding: 0 4px;
          background: rgba(0, 0, 0, 50%);
          border-bottom-left-radius: ${token.borderRadius}px;

          > div {
            font-size: var(--text-md) !important;
            text-shadow: none !important;
          }
        }

        .metadata-button {
          &::before {
            content: 'ℹ️' !important;
          }
        }
      }

      div#txt2img_extra_networks,
      div#img2img_extra_networks {
        display: block !important;

        .tabitem.gradio-tabitem.svelte-19hvt5v {
          padding: 0 !important;
          background: transparent;
        }

        .search {
          box-sizing: border-box;
          width: 100%;
          max-width: 100%;
          max-height: var(--button-lg-tool-height) !important;
          padding: 8px;
        }

        button {
          height: 32px !important;
        }
      }

      textarea {
        resize: none;
        overflow-y: hidden !important;
        font-family: ${token.fontFamily};
      }
    `,
    container: css`
      height: calc(100vh - ${headerHeight}px);
    `,
  }),
);
