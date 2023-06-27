import { memo } from 'react';

import { DivProps } from '@/types/index';

import { useStyles } from './style';

const SidebarContainer = memo<DivProps>(({ className, children, ...props }) => {
  const { cx, styles } = useStyles();
  return (
    <div className={cx(styles.container, className)} {...props}>
      {children}
    </div>
  );
});

export default SidebarContainer;
