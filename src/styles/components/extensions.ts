import { css } from 'antd-style';

export default () => {
  return css`
    #tab_openOutpaint {
      position: relative;
      height: 100vh;
      padding: 0 !important;

      #openoutpaint-iframe {
        width: 100% !important;
      }
    }
  `;
};
