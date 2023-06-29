import { memo } from 'react';

import { type DivProps } from '@/types';

import { useStyles } from './style';

const SidebarFooter = memo<DivProps>(({ className, children, ...props }) => {
  const { cx, styles } = useStyles();
  return (
    <div className={cx(styles.footer, className)} {...props}>
      {children}
    </div>
  );
});

export default SidebarFooter;
