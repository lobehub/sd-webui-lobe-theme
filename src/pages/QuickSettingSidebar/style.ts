import { createStyles } from 'antd-style';
import { rgba } from 'polished';

export const useStyles = createStyles(
  ({ css, cx, stylish, token }, { headerHeight = 64 }: { headerHeight?: number }) => ({
    container: cx(
      stylish.blur,
      css`
        position: relative;

        overflow-x: hidden;
        overflow-y: auto;
        display: flex;
        flex-direction: column;

        height: calc(100vh - ${headerHeight}px);
        padding: 16px;

        background: ${rgba(token.colorBgLayout, 0.5)};

        ul.options {
          li {
            max-width: 240px !important;
          }
        }

        #quicksettings {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          justify-content: stretch;

          width: 100%;

          > * {
            flex: 1;

            width: 100% !important;
            min-width: unset !important;
            max-width: unset !important;
            margin: 0;
            padding: 0;
          }

          .head > label {
            min-width: unset;
            max-width: 60%;
            margin-right: 12px;
          }

          input[type='color'] {
            width: 100%;
          }

          input[type='number'],
          textarea {
            resize: none;
            box-sizing: border-box;
            height: 28px !important;
            padding: 4px !important;
          }

          textarea {
            width: 100%;
          }

          span {
            overflow: hidden;
            width: 100%;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .dropdown-arrow {
            min-width: 16px;
            min-height: 16px;
          }
        }
      `,
    ),
  }),
);
