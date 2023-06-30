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

    .ant-form-item .ant-form-item-label > label {
      height: unset;
    }

    .ant-row {
      position: relative;
      flex-wrap: nowrap;
    }

    .ant-form-item-label {
      position: relative;
      flex: 1;
      max-width: 100%;
    }

    .ant-form-item-control {
      position: relative;
      flex: 0;
      min-width: unset !important;
    }
  `,
  formTitle: css`
    position: relative;

    display: flex;
    flex-direction: column;
    gap: 4px;

    text-align: left;

    > div {
      font-weight: 500;
      line-height: 1;
    }

    > small {
      display: block;

      line-height: 1.1;
      color: ${token.colorTextDescription};
      word-wrap: break-word;
      white-space: pre-wrap;
    }
  `,
  group: css`
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
