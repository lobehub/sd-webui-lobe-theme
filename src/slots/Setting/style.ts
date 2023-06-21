import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css }) => ({
  item: css`
    .ant-row {
      justify-content: space-between;

      > div {
        flex: unset !important;
        flex-grow: unset !important;
      }
    }
  `,
  title: css`
    margin-bottom: 4px;
    font-size: 14px;
    font-weight: 500;
  `,
}));
