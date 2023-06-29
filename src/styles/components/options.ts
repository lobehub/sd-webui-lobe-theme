import { Theme, css } from 'antd-style';

export default (token: Theme) => css`
  .dropdown-arrow {
    margin: 0 !important;
  }

  ul.options {
    display: block !important;

    margin: 0 !important;
    padding: 4px !important;

    background: ${token.colorBgElevated} !important;
    border: 1px solid ${token.colorBorder} !important;
    border-radius: ${token.borderRadius}px !important;
    box-shadow: ${token.boxShadow};

    li {
      overflow: hidden;
      display: block !important;

      padding: 4px 8px !important;

      line-height: 1 !important;
      text-overflow: ellipsis;
      white-space: nowrap;

      border-radius: ${token.borderRadiusSM}px !important;

      &.selected {
        color: ${token.colorText} !important;
        background: ${token.colorFill} !important;
      }

      &.active:not(.selected) {
        color: black !important;
        background: ${token.yellow} !important;
      }

      &:hover {
        color: ${token.colorText} !important;
        background: ${token.colorFillSecondary} !important;
      }
    }
  }
`;
