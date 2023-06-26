import { Theme, css } from 'antd-style';

export default (token: Theme) => css`
  input[type='range'] {
    cursor: pointer;

    height: 3px;
    margin-top: 8px;

    appearance: none;
    background: ${token.colorTextQuaternary};
    border-radius: ${token.borderRadiusXS}px;
    outline: none;

    &::-webkit-slider-thumb {
      width: 12px;
      height: 16px;

      appearance: none;
      background: ${token.colorBgElevated};
      border: 1px solid ${token.colorTextQuaternary};
      border-radius: ${token.borderRadiusSM}px;

      &:hover,
      &:active {
        background: ${token.colorPrimary};
        border-color: ${token.colorPrimary};
      }
    }

    &:hover {
      background: ${token.colorPrimaryBorderHover};
    }

    &:active {
      background: ${token.colorPrimary};
    }
  }
`;
