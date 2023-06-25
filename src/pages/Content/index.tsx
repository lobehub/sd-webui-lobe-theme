import { useResponsive } from 'antd-style';
import isEqual from 'fast-deep-equal';
import { memo, useEffect, useRef } from 'react';

import dragablePanel from '@/script/draggablePanel';
import { useAppStore } from '@/store';
import { DivProps } from '@/types';

import { useStyles } from './style';

const Content = memo<DivProps>(({ className, ...props }) => {
  const mainReference: any = useRef<HTMLElement>();
  const setting = useAppStore((st) => st.setting, isEqual);
  const { cx, styles } = useStyles({ isPromptResizable: setting.promotTextarea === 'resizable' });
  const { mobile } = useResponsive();

  useEffect(() => {
    // Content
    const main = gradioApp().querySelector('.app');
    if (main) mainReference.current?.append(main);
    if (!mobile) dragablePanel();
  }, []);

  return (
    <div
      className={cx(
        styles.container,
        styles.draggablePanel,
        styles.textares,
        styles.gallery,
        styles.img2img,
        className,
      )}
      ref={mainReference}
      style={{
        maxWidth: `min( calc(100vw - ${
          setting.sidebarWidth + setting.extraNetworkSidebarWidth
        }px), 100%)`,
      }}
      {...props}
    >
      <div className={styles.background} />
    </div>
  );
});

export default Content;
