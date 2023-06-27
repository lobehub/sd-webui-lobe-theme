import { DivProps, DraggablePanel, LayoutSidebarInner } from '@lobehub/ui';
import { useResponsive } from 'antd-style';
import isEqual from 'fast-deep-equal';
import { memo, useEffect, useState } from 'react';

import { SidebarContainer, SidebarHeader } from '@/components';
import { useAppStore } from '@/store';

import Inner from './Inner';
import { useStyles } from './style';

export interface QuickSettingSidebarProps extends DivProps {
  headerHeight: number;
}

const QuickSettingSidebar = memo<QuickSettingSidebarProps>(({ headerHeight }) => {
  const { mobile } = useResponsive();
  const setting = useAppStore((st) => st.setting, isEqual);
  const [expand, setExpand] = useState<boolean>(mobile ? false : setting.sidebarExpand);
  const [pin, setPin] = useState<boolean>(setting.sidebarFixedMode === 'fixed');
  const { styles } = useStyles({ headerHeight });

  useEffect(() => {
    if (mobile) setExpand(false);
  }, [mobile]);

  return (
    <DraggablePanel
      defaultSize={{ width: setting.sidebarWidth }}
      expand={expand}
      minWidth={200}
      mode={mobile ? 'fixed' : pin ? 'fixed' : 'float'}
      onExpandChange={setExpand}
      pin={pin}
      placement="left"
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <LayoutSidebarInner>
        <SidebarContainer className={styles.container}>
          <SidebarHeader
            pin={pin}
            position="left"
            setExpand={setExpand}
            setPin={setPin}
            title="Quick Settings"
          />
          <Inner />
        </SidebarContainer>
      </LayoutSidebarInner>
    </DraggablePanel>
  );
});

export default QuickSettingSidebar;
