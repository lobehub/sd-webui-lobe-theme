import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  footer: css`
    display: flex;
    gap: 8px;
    justify-content: flex-end;
  `,
  form: css`
    display: flex;
    flex-direction: column;
    gap: 16px;

    .ant-form-item {
      margin: 0 !important;
    }
  `,
  formTitle: css`
    text-align: left;

    > div {
      line-height: 1;
    }

    > small {
      line-height: 1;
      color: ${token.colorTextDescription};
    }
  `,
  group: css`
    overflow: hidden;

    .ant-collapse-header {
      background: ${token.colorFillTertiary};
      border-radius: unset;
    }

    .ant-collapse-content {
      background: transparent;
    }

    .ant-collapse-content-box {
      padding-top: 0 !important;
      padding-bottom: 0 !important;
    }
  `,
  item: css`
    padding: 8px 0;

    .ant-row {
      justify-content: space-between;

      > div {
        flex: unset !important;
        flex-grow: unset !important;
      }
    }
  `,
  title: css`
    display: flex;
    gap: 8px;
    align-items: center;

    font-size: 16px;
    font-weight: 600;

    .anticon {
      color: ${token.colorPrimary};
    }
  `,
}));
