import { ActionIcon, DraggablePanelBody, DraggablePanelFooter } from '@lobehub/ui';
import { Skeleton, Slider } from 'antd';
import isEqual from 'fast-deep-equal';
import { ZoomIn, ZoomOut } from 'lucide-react';
import { memo, useState } from 'react';
import { Flexbox } from 'react-layout-kit';

import { selectors, useAppStore } from '@/store';

import { useStyles } from './style';
import { useCivitaiHelperFix } from './useCivitaiHelperFix';
import { useInjectExtraNetwork } from './useInjectExtraNetwork';

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
        {isLoading && (
          <Flexbox padding={16} width={'100%'}>
            <Skeleton active />
          </Flexbox>
        )}
        <div style={isLoading ? { display: 'none' } : {}}>
          <div
            id="txt2img-extra-network-sidebar"
            ref={txt2imgExtraNetworkSidebarReference}
            style={
              currentTab === 'tab_img2img' ?
                { display: 'none' } :
                { height: '100%', overflow: 'hidden', position: 'relative' }
            }
          />
          <div
            id="img2img-extra-network-sidebar"
            ref={img2imgExtraNetworkSidebarReference}
            style={
              currentTab === 'tab_img2img' ?
                { height: '100%' } :
                { display: 'none', overflow: 'hidden', position: 'relative' }
            }
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
