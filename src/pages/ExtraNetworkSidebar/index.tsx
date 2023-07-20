import {
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
import { type DivProps } from '@/types';

import Inner from './Inner';
import { useStyles } from './style';

export interface ExtraNetworkSidebarProps extends DivProps {
  headerHeight: number;
}

const ExtraNetworkSidebar = memo<ExtraNetworkSidebarProps>(({ headerHeight }) => {
  const { mobile } = useResponsive();
  const setting = useAppStore(selectors.currentSetting, isEqual);
  const [expand, setExpand] = useState<boolean>(mobile ? false : setting.extraNetworkSidebarExpand);
  const [pin, setPin] = useState<boolean>(setting.extraNetworkFixedMode === 'fixed');
  const { styles, theme } = useStyles({ headerHeight });
  const { t } = useTranslation();

  useEffect(() => {
    const index2indexExtraNetworkButton = gradioApp().querySelector(
      'button#img2img_extra_networks',
    ) as HTMLButtonElement;
    const t2indexExtraNetworkButton = gradioApp().querySelector(
      'button#txt2img_extra_networks',
    ) as HTMLButtonElement;

    if (index2indexExtraNetworkButton) {
      index2indexExtraNetworkButton.onclick = () => setExpand(!expand);
    }
    if (t2indexExtraNetworkButton) {
      t2indexExtraNetworkButton.onclick = () => setExpand(!expand);
    }
  }, [expand]);

  useEffect(() => {
    if (mobile) setExpand(false);
  }, [mobile]);

  const mode = mobile ? 'fixed' : pin ? 'fixed' : 'float';

  return (
    <DraggablePanel
      defaultSize={{ width: setting.extraNetworkSidebarWidth }}
      expand={expand}
      minWidth={setting.extraNetworkSidebarWidth}
      mode={mode}
      onExpandChange={setExpand}
      pin={pin}
      placement="right"
    >
      <LayoutSidebarInner>
        <DraggablePanelContainer
          className={styles.container}
          style={
            mode === 'float' ?
              { background: theme.colorBgContainer, minWidth: setting.extraNetworkSidebarWidth } :
              { minWidth: setting.extraNetworkSidebarWidth }
          }
        >
          <DraggablePanelHeader
            pin={pin}
            position="right"
            setExpand={setExpand}
            setPin={setPin}
            title={t('extraNetwork')}
          />
          <Inner />
        </DraggablePanelContainer>
      </LayoutSidebarInner>
    </DraggablePanel>
  );
});

export default ExtraNetworkSidebar;
