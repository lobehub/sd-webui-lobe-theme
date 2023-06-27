import { memo } from 'react';

import { DivProps } from '@/types/index';

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
