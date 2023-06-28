import { memo } from 'react';

import { DivProps } from '@/types/index';

import { useStyles } from './style';

const SidebarBody = memo<DivProps>(({ className, children, ...props }) => {
  const { cx, styles } = useStyles();
  return (
    <div className={cx(styles.body, className)} {...props}>
      {children}
    </div>
  );
});

export default SidebarBody;
