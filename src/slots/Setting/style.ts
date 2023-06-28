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
    background: ${token.colorFillQuaternary};
    border: 1px solid ${token.colorBorder};
    border-radius: ${token.borderRadius}px;
  `,
  item: css`
    padding: 8px 16px;

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

    margin: 0;
    margin-bottom: 4px;
    padding: 16px;

    font-size: 16px;
    font-weight: 600;
    line-height: 1;

    background: ${token.colorFillTertiary};

    .anticon {
      color: ${token.colorPrimary};
    }
  `,
}));
