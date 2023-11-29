import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token, stylish, cx }, withBackground: boolean) => ({
  background: css`
    padding: 24px;

    background-color: ${token.colorBgLayout};
    background-image: url('https://gw.alipayobjects.com/zos/kitchen/o1ccl9hjoX/screenshot_background.webp');
    background-position: center;
    background-size: 120% 120%;
  `,
  container: cx(
    withBackground &&
      css`
        overflow: hidden;
        border: 2px solid ${token.colorBorder};
        border-radius: ${token.borderRadiusLG}px;
      `,
    css`
      background: ${token.colorBgLayout};
    `,
  ),
  desc: css`
    font-size: 12px;
    color: ${token.colorTextDescription};
  `,

  footer: css`
    padding: 16px;
    border-top: 1px solid ${token.colorBorder};
  `,
  img: css`
    border-radius: ${token.borderRadiusSM}px;
  `,
  preview: cx(
    stylish.noScrollbar,
    css`
      overflow: hidden scroll;

      width: 100%;
      max-height: 40vh;

      background: ${token.colorBgLayout};
      border: 1px solid ${token.colorBorder};
      border-radius: ${token.borderRadiusLG}px;

      * {
        pointer-events: none !important;
        overflow: hidden !important;

        ${stylish.noScrollbar}
        ::-webkit-scrollbar {
          width: 0 !important;
          height: 0 !important;
        }
      }
    `,
  ),
  title: css`
    font-size: 16px;
    font-weight: 600;
  `,
  url: css`
    color: ${token.colorTextDescription};
  `,
}));
