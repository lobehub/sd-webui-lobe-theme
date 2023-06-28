import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css }) => ({
  button: css`
    cursor: pointer;

    position: relative;

    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;

    padding: var(--input-padding);

    font-size: var(--input-text-size);
    font-weight: var(--input-text-weight);
    line-height: var(--line-sm);

    background: var(--button-secondary-background-fill);
    border: var(--button-border-width) solid var(--button-secondary-border-color);
    border-radius: var(--input-radius);
  `,
  buttonGroup: css`
    display: flex;
    gap: 8px;
  `,
  promptView: css`
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,
  view: css`
    display: flex;
    flex-direction: column;
    gap: 1em;
    margin-bottom: 1em;
  `,
}));
