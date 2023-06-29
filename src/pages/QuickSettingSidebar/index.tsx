import { type DivProps, DraggablePanel, LayoutSidebarInner } from '@lobehub/ui';
import { useResponsive } from 'antd-style';
import isEqual from 'fast-deep-equal';
import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

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
  const { styles, theme } = useStyles({ headerHeight });
  const { t } = useTranslation();

  useEffect(() => {
    if (mobile) setExpand(false);
  }, [mobile]);

  const mode = mobile ? 'fixed' : pin ? 'fixed' : 'float';

  return (
    <DraggablePanel
      defaultSize={{ width: setting.sidebarWidth }}
      expand={expand}
      minWidth={200}
      mode={mode}
      onExpandChange={setExpand}
      pin={pin}
      placement="left"
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <LayoutSidebarInner>
        <SidebarContainer
          className={styles.container}
          style={mode === 'float' ? { background: theme.colorBgContainer } : {}}
        >
          <SidebarHeader
            pin={pin}
            position="left"
            setExpand={setExpand}
            setPin={setPin}
            title={t('quickSetting')}
          />
          <Inner />
        </SidebarContainer>
      </LayoutSidebarInner>
    </DraggablePanel>
  );
});

export default QuickSettingSidebar;
