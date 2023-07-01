import { Theme, css } from 'antd-style';

export default (token: Theme) => {
  return css`
    #root {
      /* openOutpaint */
      #tab_openOutpaint {
        position: relative;
        height: 100vh;
        padding: 0 !important;

        #openoutpaint-iframe {
          width: 100% !important;
        }
      }

      /* autocomplete */
      .autocompleteResults {
        min-width: 400px;

        font-family: ${token.fontFamilyCode};
        font-size: 12px;

        background: ${token.colorBgElevated} !important;
        border-color: ${token.colorBorder} !important;
        border-radius: ${token.borderRadius}px !important;
        box-shadow: ${token.boxShadow};

        ul {
          padding: 0 !important;
        }

        li {
          border-bottom: 1px solid ${token.colorBorder};

          &:hover {
            background: ${token.colorFillSecondary} !important;
          }

          &:nth-child(odd) {
            background: transparent !important;
          }
        }
      }
    }
  `;
};
