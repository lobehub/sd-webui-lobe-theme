import {Theme, css} from 'antd-style';

export default (token: Theme) => css`
  input[type='range'] {
    cursor: pointer;

    height: 3px;
    margin-top: 8px;

    appearance: none;
    background: ${token.colorTextQuaternary};
    border-radius: ${token.borderRadiusXS}px;
    outline: none;

    transition: var(--button-transition);

    &::-webkit-slider-thumb {
      width: 12px;
      height: 16px;

      appearance: none;
      background: ${token.colorPrimary};
      border: 1px solid ${token.colorPrimary};
      border-radius: ${token.borderRadiusSM}px;

      transition: var(--button-transition);

      &:hover,
      &:active {
        background: ${token.colorPrimaryHover};
        border-color: ${token.colorPrimaryHover};
      }
    }

    &:hover {
      background: ${token.colorPrimaryHover};
    }

    &:active {
      background: ${token.colorPrimaryHover};
    }
  }
`;
