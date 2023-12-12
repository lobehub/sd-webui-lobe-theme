import { ActionIcon, DraggablePanelBody, DraggablePanelFooter } from '@lobehub/ui';
import { Skeleton, Slider } from 'antd';
import isEqual from 'fast-deep-equal';
import { ZoomIn, ZoomOut } from 'lucide-react';
import { memo, useState } from 'react';

import { useStyles } from '@/features/ExtraNetworkSidebar/style';
import { useCivitaiHelperFix } from '@/features/ExtraNetworkSidebar/useCivitaiHelperFix';
import { useInjectExtraNetwork } from '@/features/ExtraNetworkSidebar/useInjectExtraNetwork';
import { selectors, useAppStore } from '@/store';

const Inner = memo(() => {
  const txt2imgExtraNetworkSidebarReference = useInjectExtraNetwork('txt');
  const img2imgExtraNetworkSidebarReference = useInjectExtraNetwork('img');
  const setting = useAppStore(selectors.currentSetting, isEqual);
  const currentTab = useAppStore(selectors.currentTab);
  const [size, setSize] = useState<number>(setting.extraNetworkCardSize || 86);
  const { styles } = useStyles({ size });

  const { isLoading } = useCivitaiHelperFix({
    debug: '[layout] inject - ExtraNetworkSidebar',
  });

  return (
    <>
      <DraggablePanelBody className={styles.body}>
        {isLoading && <Skeleton active />}
        <div style={isLoading ? { display: 'none' } : {}}>
          <div
            id="txt2img-extra-network-sidebar"
            ref={txt2imgExtraNetworkSidebarReference}
            style={currentTab === 'tab_img2img' ? { display: 'none' } : {}}
          />
          <div
            id="img2img-extra-network-sidebar"
            ref={img2imgExtraNetworkSidebarReference}
            style={currentTab === 'tab_img2img' ? {} : { display: 'none' }}
          />
        </div>
      </DraggablePanelBody>
      <DraggablePanelFooter>
        <ActionIcon
          icon={setting.extraNetworkCardSize < size ? ZoomOut : ZoomIn}
          onClick={() => setSize(setting.extraNetworkCardSize)}
          size={{ blockSize: 24, fontSize: 16 }}
        />
        <Slider
          defaultValue={size}
          max={256}
          min={64}
          onChange={setSize}
          step={8}
          style={{ flex: 1 }}
          value={size}
        />
      </DraggablePanelFooter>
    </>
  );
});

export default Inner;
