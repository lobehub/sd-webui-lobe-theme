import { DraggablePanel, LayoutSidebarInner } from '@lobehub/ui';
import { useResponsive } from 'antd-style';
import isEqual from 'fast-deep-equal';
import { memo, useEffect, useState } from 'react';

import { useAppStore } from '@/store';
import { DivProps } from '@/types/index';

import Inner from './Inner';
import { useStyles } from './style';

export interface ExtraNetworkSidebarProps extends DivProps {
  headerHeight: number;
}

const ExtraNetworkSidebar = memo<ExtraNetworkSidebarProps>(({ headerHeight }) => {
  const setting = useAppStore((st) => st.setting, isEqual);
  const [mode] = useState<'fixed' | 'float'>(setting.extraNetworkFixedMode);
  const [expand, setExpand] = useState<boolean>(setting.extraNetworkSidebarExpand);
  const { mobile } = useResponsive();
  const { styles } = useStyles({ headerHeight });

  useEffect(() => {
    if (mobile) setExpand(false);
  }, []);

  return (
    <DraggablePanel
      defaultSize={{ width: setting.extraNetworkSidebarWidth }}
      expand={expand}
      minWidth={setting.extraNetworkSidebarWidth}
      mode={mode}
      onExpandChange={setExpand}
      pin={mode === 'fixed'}
      placement="right"
    >
      <LayoutSidebarInner>
        <div className={styles.container}>
          <Inner />
        </div>
      </LayoutSidebarInner>
    </DraggablePanel>
  );
});

export default ExtraNetworkSidebar;
