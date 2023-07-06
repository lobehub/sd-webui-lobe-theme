import { createStyles } from 'antd-style';

export const useStyles = createStyles(
  ({ css, token }, type: 'positive' | 'negative') => css`
    .autocompleteResults {
      left: 16px !important;
      min-width: 200px !important;
      padding: 0 !important;
    }

    /* Styles for the input */
    .ReactTags__editTagInput,
    .ReactTags__tagInput {
      display: inline-block;
      width: 100%;
      margin: 0;

      input {
        position: relative;

        display: block;

        width: 100%;
        margin: 0;
        padding: var(--input-padding);

        color: ${type === 'positive' ? token.colorSuccessTextHover : token.colorErrorTextHover};

        background: ${token.colorFillTertiary};
        border: 1px solid ${token.colorBorderSecondary};
        border-radius: ${token.borderRadius}px;

        &:focus {
          color: ${type === 'positive' ? token.colorSuccessText : token.colorErrorText};
          background: ${token.colorFillSecondary};
          border: 1px solid ${token.colorBorder};
          outline: none;
        }
      }
    }

    /* Styles for selected tags */
    .ReactTags__tags.react-tags-wrapper {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .ReactTags__selected {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;

      span.ReactTags__tag {
        position: relative;

        display: flex;
        align-items: center;

        padding: 6px 6px 6px 8px;

        font-size: 13px;
        color: ${type === 'positive' ? token.colorSuccessTextHover : token.colorErrorTextHover};

        background: ${token.colorFillSecondary};
        border: 1px solid ${token.colorBorderSecondary};
        border-radius: ${token.borderRadius}px;

        &:hover {
          color: ${type === 'positive' ? token.colorSuccessText : token.colorErrorText};
          background: ${token.colorFill};
          border: 1px solid ${token.colorBorder};
        }
      }

      a.ReactTags__remove {
        cursor: pointer;
        margin-left: 5px;
        color: #aaa;
      }
    }

    .ReactTags__remove {
      cursor: pointer;
      color: ${token.colorTextDescription};
      background: none;
      border: none;

      &:hover {
        color: ${token.colorText};
      }
    }
  `,
);
