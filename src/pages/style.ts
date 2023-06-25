import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css }, headerHeight: number) => ({
  sidebar: css`
    height: calc(100vh - ${headerHeight}px);
  `,
}));
