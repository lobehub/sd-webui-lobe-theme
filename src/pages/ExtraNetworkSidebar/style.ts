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

        button#txt2img_extra_networks,
        button#img2img_extra_networks {
          display: none !important;
        }
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

      #txt2img_extra_networks,
      #img2img_extra_networks {
        display: block !important;
      }

      .extra-network-cards .actions .name {
        background: unset !important;
      }

      .extra-network-cards,
      .extra-network-thumbs {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(${size}px, 1fr));

        > .card {
          width: var(--fill-available) !important;
          height: ${size * 1.5}px !important;
        }
      }
    `,
  }),
);
