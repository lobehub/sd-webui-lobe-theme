import { Footer as F } from '@lobehub/ui';
import isEqual from 'fast-deep-equal';
import { memo, useEffect, useRef } from 'react';

import { useAppStore } from '@/store';
import { DivProps } from '@/types/index';

import { columns } from './data';
import { useStyles } from './style';

const Footer = memo<DivProps>(({ className, ...props }) => {
  const setting = useAppStore((st) => st.setting, isEqual);
  const { cx, styles } = useStyles();
  const footerReference = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = gradioApp().querySelector('#footer');
    if (footer) footerReference.current?.append(footer);
  }, []);
  return (
    <div className={cx(styles.footer, className)} {...props}>
      {setting.layoutHideFooter ? (
        <div ref={footerReference} />
      ) : (
        <F bottom={<div ref={footerReference} />} columns={columns} />
      )}
    </div>
  );
});

export default Footer;
