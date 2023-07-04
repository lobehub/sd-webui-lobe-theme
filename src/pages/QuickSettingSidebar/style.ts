import { createStyles } from 'antd-style';

export const useStyles = createStyles(
  ({ css }, { headerHeight = 64, width }: { headerHeight?: number; width: number }) => ({
    container: css`
      height: calc(100vh - ${headerHeight}px);

      ul.options {
        > li {
          max-width: ${width - 48}px;
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
  }),
);
