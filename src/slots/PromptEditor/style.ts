import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css }) => ({
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
