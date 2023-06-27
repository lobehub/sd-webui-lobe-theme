import { Theme, css } from 'antd-style';

export default (token: Theme) => {
  return css`
    .label-wrap {
      transition: padding 400ms ${token.motionEaseOut};

      > span:not(.icon) {
        display: flex;
        gap: 8px;
        align-items: center;

        font-size: 14px;
        font-weight: 600;
        line-height: 1;

        transition: color 400ms ${token.motionEaseOut};

        &::before {
          content: '';

          display: block;

          width: 8px;
          height: 8px;

          background: ${token.colorPrimary};
          border-radius: 4px;
        }
      }

      &.open {
        padding-bottom: 16px;
        border-bottom: 1px dashed ${token.colorBorderSecondary};

        span {
          color: ${token.colorText};
        }
      }
    }
  `;
};
