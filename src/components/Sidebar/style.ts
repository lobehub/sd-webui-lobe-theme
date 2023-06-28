import { createStyles } from 'antd-style';
import { rgba } from 'polished';

export const useStyles = createStyles(({ css, token, stylish, cx }) => ({
  body: css`
    overflow-x: hidden;
    overflow-y: auto;
    flex: 1;
    padding: 16px;
  `,
  container: cx(
    stylish.blur,
    css`
      position: relative;

      overflow: hidden;
      display: flex;
      flex-direction: column;

      background: ${rgba(token.colorBgLayout, 0.8)};
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
  header: css`
    display: flex;
    flex: 0;
    gap: 8px;
    align-items: center;
    justify-content: space-between;

    padding: 8px 16px;

    font-weight: 500;

    border-bottom: 1px solid ${token.colorBorderSecondary};
  `,
}));
