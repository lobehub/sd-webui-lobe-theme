import {createStyles} from 'antd-style';

export const useStyles = createStyles(
    ({css, responsive}) => css`
    ${responsive.mobile} {
      .ant-row.ant-form-item-row {
        flex-direction: column !important;
      }
    }

    small {
      line-height: 1.3 !important;
    }
  `,
);
