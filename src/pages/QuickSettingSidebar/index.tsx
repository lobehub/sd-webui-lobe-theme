import { DivProps, DraggablePanel, LayoutSidebarInner } from '@lobehub/ui';
import { useResponsive } from 'antd-style';
import isEqual from 'fast-deep-equal';
import { memo, useEffect, useState } from 'react';

import { useAppStore } from '@/store';

import Inner from './Inner';
import { useStyles } from './style';

export interface QuickSettingSidebarProps extends DivProps {
  headerHeight: number;
}

const QuickSettingSidebar = memo<QuickSettingSidebarProps>(({ headerHeight }) => {
  const setting = useAppStore((st) => st.setting, isEqual);
  const [mode] = useState<'fixed' | 'float'>(setting.sidebarFixedMode);
  const [expand, setExpand] = useState<boolean>(setting.sidebarExpand);
  const { mobile } = useResponsive();
  const { styles } = useStyles({ headerHeight });

  useEffect(() => {
    if (mobile) setExpand(false);
  }, []);

  return (
    <DraggablePanel
      defaultSize={{ width: setting.sidebarWidth }}
      expand={expand}
      minWidth={setting.sidebarWidth}
      mode={mode}
      onExpandChange={setExpand}
      pin={mode === 'fixed'}
      placement="left"
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <LayoutSidebarInner>
        <div className={styles.container}>
          <Inner />
        </div>
      </LayoutSidebarInner>
    </DraggablePanel>
  );
});

export default QuickSettingSidebar;
