import { memo } from 'react';

import { type DivProps } from '@/types';

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
