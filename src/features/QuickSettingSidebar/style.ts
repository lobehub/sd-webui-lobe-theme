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

        /* Only truncate label/info text — never icon-wrap / caret spans */
        .label-wrap > span,
        span[data-testid='block-info'],
        .single-select,
        .token-remove + span {
          overflow: hidden;
          max-width: 100%;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        /* Gradio 4: caret lives in .icon-wrap > svg.dropdown-arrow[width=100%].
           Cap the wrap or the SVG becomes a giant sidebar-width triangle. */
        .icon-wrap {
          pointer-events: none !important;

          position: absolute !important;
          top: 50% !important;
          right: 8px !important;
          transform: translateY(-50%) !important;

          display: flex !important;
          flex: none !important;
          align-items: center;
          justify-content: center;

          width: 16px !important;
          min-width: 16px !important;
          max-width: 16px !important;
          height: 16px !important;
          min-height: 16px !important;
          max-height: 16px !important;
          margin: 0 !important;
        }

        .dropdown-arrow {
          flex: none;

          width: 16px !important;
          min-width: 16px !important;
          max-width: 16px !important;
          height: 16px !important;
          min-height: 16px !important;
          max-height: 16px !important;
        }

        .wrap-inner {
          min-width: 0 !important;
        }

        .secondary-wrap {
          position: relative;
          min-width: 0 !important;
        }

        div.gradio-dropdown {
          overflow: visible !important;
          min-width: unset !important;
        }
      }
    `,
  }),
);
