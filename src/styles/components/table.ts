import { Theme, css } from 'antd-style';

export default (token: Theme) => css`
  table {
    overflow: auto;
    border-collapse: collapse;
    width: 100%;
  }

  th,
  td {
    padding: 12px !important;
    border: 1px solid ${token.colorBorderSecondary} !important;
  }

  th {
    background: ${token.colorFillQuaternary};
    border-bottom: 4px solid var(--color-border) !important;
  }

  tr {
    &:hover td,
    &:nth-of-type(odd):hover td {
      background: ${token.colorFillSecondary};
    }

    &:nth-of-type(odd) td {
      background: ${token.colorFillQuaternary};
    }
  }
`;
