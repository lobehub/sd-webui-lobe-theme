import { memo } from 'react';

import { type DivProps } from '@/types';

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
