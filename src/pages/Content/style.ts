import { createStyles } from 'antd-style';

export const useStyles = createStyles(
  ({ css }, { isPromptResizable }: { isPromptResizable: boolean }) => ({
    container: css`
      position: relative;
      flex: 1;
      max-width: 100%;

      [id$='2img_prompt'] textarea {
        max-height: ${isPromptResizable ? 'unset' : '84px'};
      }

      [id$='2img_neg_prompt'] textarea {
        max-height: ${isPromptResizable ? 'unset' : '84px'};
      }
    `,
  }),
);
