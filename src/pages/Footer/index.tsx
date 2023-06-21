import { Footer as F } from '@lobehub/ui';
import { memo, useEffect, useRef } from 'react';

import { DivProps } from '@/types/index';

import { columns } from './data';
import { useStyles } from './style';

const Footer = memo<DivProps>(({ className, ...props }) => {
  const { cx, styles } = useStyles();
  const footerReference: any = useRef<HTMLElement>();

  useEffect(() => {
    const footer = gradioApp().querySelector('#footer');
    if (footer) footerReference.current?.append(footer);
  }, []);
  return (
    <div className={cx(styles.footer, className)} {...props}>
      <F bottom={<div ref={footerReference} />} columns={columns} />
    </div>
  );
});

export default Footer;
