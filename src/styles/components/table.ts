import { Theme, css } from 'antd-style';

export default (token: Theme) => css`
  table {
    border-spacing: 0;
    border-collapse: separate !important;

    width: 100%;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0;
    margin-inline-end: 0;
    padding: 8px;

    border: 1px solid ${token.colorBorderSecondary} !important;
    border-radius: ${token.borderRadius}px;
  }

  th,
  td {
    padding-block-start: 10px !important;
    padding-block-end: 10px !important;
    padding-inline-start: 16px !important;
    padding-inline-end: 16px !important;

    border: none !important;
  }

  thead {
    tr {
      th {
        background: ${token.colorFillTertiary};

        &:first-of-type {
          border-top-left-radius: ${token.borderRadius}px;
          border-bottom-left-radius: ${token.borderRadius}px;
        }

        &:last-child {
          border-top-right-radius: ${token.borderRadius}px;
          border-bottom-right-radius: ${token.borderRadius}px;
        }
      }
    }
  }
`;
