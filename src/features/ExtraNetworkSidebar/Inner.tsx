import { ActionIcon, DraggablePanelBody, DraggablePanelFooter } from '@lobehub/ui';
import { Skeleton, Slider } from 'antd';
import isEqual from 'fast-deep-equal';
import { ZoomIn, ZoomOut } from 'lucide-react';
import { memo, useRef, useState } from 'react';

import { useStyles } from '@/features/ExtraNetworkSidebar/style';
import { useCivitaiHelperFix } from '@/hooks/useCivitaiHelperFix';
import { useInject } from '@/hooks/useInject';
import { selectors, useAppStore } from '@/store';

const Inner = memo(() => {
  const txt2imgTabReference = useRef<HTMLDivElement>(gradioApp().querySelector('div#tab_txt2img'));
  const img2imgTabReference = useRef<HTMLDivElement>(gradioApp().querySelector('div#tab_img2img'));
  const txt2imgExtraNetworkSidebarReference = useRef<HTMLDivElement>(null);
  const img2imgExtraNetworkSidebarReference = useRef<HTMLDivElement>(null);
  const setting = useAppStore(selectors.currentSetting, isEqual);
  const currentTab = useAppStore(selectors.currentTab);
  const [size, setSize] = useState<number>(setting.extraNetworkCardSize || 86);
  const { styles } = useStyles({ size });

  useInject(txt2imgExtraNetworkSidebarReference, 'div#txt2img_extra_tabs');
  useInject(img2imgExtraNetworkSidebarReference, 'div#img2img_extra_tabs');
  useInject(txt2imgTabReference, 'div.tabitem.gradio-tabitem', {
    id: 'txt2img_render',
    parent: 'div#txt2img_extra_tabs',
  });
  useInject(img2imgTabReference, 'div.tabitem.gradio-tabitem', {
    id: 'img2img_render',
    parent: 'div#img2img_extra_tabs',
  });

  const { isLoading } = useCivitaiHelperFix({
    onSuccess: () => {
      const txt2imgExtraNetworkButton = document.querySelectorAll(
        '#txt2img_extra_tabs > .tab-nav > button',
      )[1] as HTMLButtonElement;
      txt2imgExtraNetworkButton?.click();
      const img2imgExtraNetworkButton = document.querySelectorAll(
        '#img2img_extra_tabs > .tab-nav > button',
      )[1] as HTMLButtonElement;
      img2imgExtraNetworkButton?.click();
    },
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
