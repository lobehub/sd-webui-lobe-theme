import { Theme, css } from 'antd-style';

export default (token: Theme) => css`
  .eta-bar {
    overflow: hidden;

    opacity: 1 !important;
    background: linear-gradient(
      to right,
      ${token.colorFillQuaternary},
      ${token.colorFill}
    ) !important;
    backdrop-filter: saturate(180%) blur(10px);
    border: 1px solid ${token.colorBorder};
    border-radius: ${token.borderRadius}px;
  }
`;
