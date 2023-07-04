import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, responsive }) => ({
  modal: css`
    height: 70%;

    .ant-modal-header {
      margin-bottom: 24px;
    }

    ${responsive.mobile} {
      .ant-modal-header {
        margin-bottom: 8px;
      }

      .ant-modal-content {
        padding: 8px;
      }
    }
  `,
}));
