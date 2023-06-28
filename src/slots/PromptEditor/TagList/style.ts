import { createStyles } from 'antd-style';

export const useStyles = createStyles(
  ({ css }, type: 'positive' | 'negative') => css`
    /* Styles for the input */
    .ReactTags__editTagInput,
    .ReactTags__tagInput {
      display: inline-block;
      width: 100%;
      margin: 0;

      input,
      input:focus {
        position: relative;

        display: block;

        width: 100%;
        margin: 0;
        padding: var(--input-padding);

        font-size: var(--input-text-size);
        font-weight: var(--input-text-weight);
        line-height: var(--line-sm);
        color: var(--body-text-color);

        background: var(--input-background-fill);
        border: var(--input-border-width) solid var(--input-border-color);
        border-radius: var(--input-radius);
        outline: none;
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

        padding: var(--input-padding);

        font-size: var(--text-sm);
        font-weight: var(--input-text-weight);
        line-height: var(--line-sm);
        color: ${type === 'positive' ? 'var(--green-9)' : 'var(--magenta-9)'};

        background: var(--button-secondary-background-fill);
        border: var(--button-border-width) solid var(--button-secondary-border-color);
        border-radius: var(--input-radius);

        &:hover {
          color: ${type === 'positive' ? 'var(--green-10)' : 'var(--magenta-10)'};
        }
      }

      a.ReactTags__remove {
        cursor: pointer;
        margin-left: 5px;
        color: #aaa;
      }
    }

    /* Styles for suggestions */
    .ReactTags__suggestions {
      position: absolute;
      z-index: 1000;
    }

    ul {
      overflow-x: hidden;
      overflow-y: auto;

      width: 248px;
      max-height: 480px;
      padding: 0;

      list-style-type: none;

      background: var(--color-bg-container);
      border-radius: var(--border-radius);
      box-shadow: var(--box-shadow);

      li {
        margin: 0;
        padding: 4px 8px;
        font-size: 12px;

        &.ReactTags__activeSuggestion {
          cursor: pointer;
          color: #fff;
          background: var(--color-primary);
        }

        mark {
          font-weight: 600;
          color: #fff;
          background: var(--color-primary-hover);
          border-radius: 2px;
        }
      }
    }

    .ReactTags__remove {
      cursor: pointer;
      color: var(--color-text);
      background: none;
      border: none;
    }

    .ReactTags__lora {
      background: var(--cyan-2) !important;
      border-color: var(--cyan-3) !important;
    }

    .ReactTags__hypernet {
      background: var(--purple-2) !important;
      border-color: var(--purple-3) !important;
    }

    .ReactTags__embedding {
      background: var(--orange-2) !important;
      border-color: var(--orange-3) !important;
    }
  `,
);
