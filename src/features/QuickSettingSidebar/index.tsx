import {
  type DivProps,
  DraggablePanel,
  DraggablePanelContainer,
  DraggablePanelHeader,
  LayoutSidebarInner,
} from '@lobehub/ui';
import { useResponsive } from 'antd-style';
import isEqual from 'fast-deep-equal';
import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { selectors, useAppStore } from '@/store';

import Inner from './Inner';
import { useStyles } from './style';

export interface QuickSettingSidebarProps extends DivProps {
  headerHeight: number;
}

const QuickSettingSidebar = memo<QuickSettingSidebarProps>(({ headerHeight }) => {
  const { mobile } = useResponsive();
  const setting = useAppStore(selectors.currentSetting, isEqual);
  const [expand, setExpand] = useState<boolean>(mobile ? false : setting.sidebarExpand);
  const [pin, setPin] = useState<boolean>(setting.sidebarFixedMode === 'fixed');
  const [width, setWidth] = useState<number>(setting.sidebarWidth);
  const { styles, theme } = useStyles({ headerHeight, width });
  const { t } = useTranslation();

  useEffect(() => {
    if (mobile) setExpand(false);
  }, [mobile]);

  const mode = mobile ? 'fixed' : pin ? 'fixed' : 'float';

  return (
    <DraggablePanel
      defaultSize={{ width: setting.sidebarWidth }}
      expand={expand}
      minWidth={setting.sidebarWidth}
      mode={mode}
      onExpandChange={setExpand}
      onSizeChange={(_, size) => size?.width && setWidth(Number.parseInt(String(size.width)))}
      pin={pin}
      placement="left"
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <LayoutSidebarInner>
        <DraggablePanelContainer
          className={styles.container}
          style={
            mode === 'float' ?
              { background: theme.colorBgContainer, minWidth: setting.sidebarWidth } :
              { minWidth: setting.sidebarWidth }
          }
        >
          <DraggablePanelHeader
            pin={pin}
            position="left"
            setExpand={setExpand}
            setPin={setPin}
            title={t('quickSetting')}
          />
          <Inner />
        </DraggablePanelContainer>
      </LayoutSidebarInner>
    </DraggablePanel>
  );
});

export default QuickSettingSidebar;
