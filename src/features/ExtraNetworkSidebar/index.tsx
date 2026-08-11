import {
  DraggablePanel,
  DraggablePanelContainer,
  DraggablePanelHeader,
  LayoutSidebarInner,
} from '@lobehub/ui';
import { useResponsive } from 'antd-style';
import isEqual from 'fast-deep-equal';
import { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { selectors, useAppStore } from '@/store';
import { type DivProps } from '@/types';

import Inner from './Inner';
import { refreshExtraNetwork } from './refreshExtraNetwork';
import { useStyles } from './style';

export interface ExtraNetworkSidebarProps extends DivProps {
  headerHeight: number;
}

const ExtraNetworkSidebar = memo<ExtraNetworkSidebarProps>(({ headerHeight }) => {
  const { mobile } = useResponsive();
  const setting = useAppStore(selectors.currentSetting, isEqual);
  const mobileSidebar = useAppStore((st) => st.mobileSidebar);
  const setMobileSidebar = useAppStore((st) => st.setMobileSidebar);
  const currentTab = useAppStore(selectors.currentTab);
  const [expand, setExpand] = useState<boolean>(mobile ? false : setting.extraNetworkSidebarExpand);
  const [pin, setPin] = useState<boolean>(setting.extraNetworkFixedMode === 'fixed');
  const { styles, theme } = useStyles({ headerHeight });
  const { t } = useTranslation();

  useEffect(() => {
    if (mobile) {
      setExpand(false);
      setMobileSidebar('none');
    }
  }, [mobile, setMobileSidebar]);

  useEffect(() => {
    if (!mobile) return;
    setExpand(mobileSidebar === 'extra');
  }, [mobile, mobileSidebar]);

  // When sidebar opens, ensure Extra Networks cards are populated
  useEffect(() => {
    if (!expand) return;
    const type = currentTab === 'tab_img2img' ? 'img' : 'txt';
    refreshExtraNetwork(type);
  }, [expand, currentTab]);

  const onExpandChange = useCallback(
    (next: boolean) => {
      if (mobile) {
        setMobileSidebar(next ? 'extra' : 'none');
      } else {
        setExpand(next);
      }
    },
    [mobile, setMobileSidebar],
  );

  const mode = mobile ? 'fixed' : pin ? 'fixed' : 'float';

  return (
    <DraggablePanel
      defaultSize={{ width: setting.extraNetworkSidebarWidth }}
      expand={expand}
      minWidth={setting.extraNetworkSidebarWidth}
      mode={mode}
      onExpandChange={onExpandChange}
      pin={pin}
      placement="right"
    >
      <LayoutSidebarInner>
        <DraggablePanelContainer
          className={styles.container}
          style={
            mode === 'float'
              ? { background: theme.colorBgContainer, minWidth: setting.extraNetworkSidebarWidth }
              : { minWidth: setting.extraNetworkSidebarWidth }
          }
        >
          <DraggablePanelHeader
            pin={pin}
            position="right"
            setExpand={onExpandChange}
            setPin={setPin}
            title={t('sidebar.extraNetwork')}
          />
          <Inner />
        </DraggablePanelContainer>
      </LayoutSidebarInner>
    </DraggablePanel>
  );
});

export default ExtraNetworkSidebar;
