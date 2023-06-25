import { createStyles } from 'antd-style';
import { rgba } from 'polished';

export const useStyles = createStyles(
  (
    { css, cx, stylish, token },
    { headerHeight = 64, size = 86 }: { headerHeight?: number; size?: number },
  ) => ({
    container: cx(
      stylish.blur,
      css`
        position: relative;

        overflow: hidden;
        display: flex;
        flex-direction: column;

        height: calc(100vh - ${headerHeight}px);

        background: ${rgba(token.colorBgLayout, 0.5)};
      `,
    ),
    footer: css`
      display: flex;
      flex: 0;
      gap: 8px;
      align-items: center;
      justify-content: flex-start;

      padding: 8px 16px;

      border-top: 1px solid ${token.colorBorderSecondary};
    `,
    list: css`
      overflow-x: hidden;
      overflow-y: auto;
      flex: 1;
      padding: 16px;

      .extra-network-cards .name {
        background: unset !important;
      }

      .extra-network-thumbs .name {
        overflow: hidden;
        display: block;

        font-size: 12px !important;
        text-overflow: ellipsis;
        white-space: nowrap;

        background: transparent;
      }

      .extra-network-cards,
      .extra-network-thumbs {
        overflow: unset;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(${size}px, 1fr));
        gap: 8px;

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
            font-size: 14px !important;
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
          .name {
            overflow: hidden;
            display: block;

            font-weight: bold;
            text-overflow: ellipsis;
            text-shadow: 0 1px 1px rgb(0 0 0 / 90%);
            white-space: nowrap;

            background: linear-gradient(0deg, rgb(0 0 0 / 80%), transparent);
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

                font-size: 15px !important;
                color: #fff;
                text-overflow: ellipsis;
                text-shadow: 1px 1px black;
                white-space: nowrap;
              }
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

          transition: box-shadow 200ms ${token.motionEaseOut}, scale 400ms ${token.motionEaseOut};

          .name {
            font-size: 12px !important;
          }

          &:hover {
            border-color: ${token.colorPrimary};
            box-shadow: 0 0 0 1px ${token.colorPrimary};

            .additional {
              display: block;
            }

            .name {
              white-space: unset;
            }
          }

          &:active {
            scale: 0.9;
          }
        }

        .metadata-button {
          top: 50% !important;
          transform: translateY(-50%);

          display: flex !important;
          align-items: center;
          justify-content: center;

          padding: 0 !important;

          font-size: 20px !important;
          text-shadow: none !important;

          opacity: 0;
          background: rgba(0, 0, 0, 70%);
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;

          &:hover {
            color: #fff !important;
            opacity: 1;
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
          max-height: 36px !important;
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
  }),
);
