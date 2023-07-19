import { ActionIcon, DraggablePanelBody, DraggablePanelFooter } from '@lobehub/ui';
import { useTimeout } from 'ahooks';
import { Skeleton, Slider } from 'antd';
import isEqual from 'fast-deep-equal';
import { ZoomIn, ZoomOut } from 'lucide-react';
import { memo, useEffect, useRef, useState } from 'react';
import { shallow } from 'zustand/shallow';

import { useStyles } from '@/pages/ExtraNetworkSidebar/style';
import civitaiHelperFix from '@/script/civitaiHelperFix';
import { selectors, useAppStore } from '@/store';

const Inner = memo(() => {
  const txt2imgExtraNetworkSidebarReference = useRef<HTMLDivElement>(null);
  const img2imgExtraNetworkSidebarReference = useRef<HTMLDivElement>(null);
  const [extraLoading, setExtraLoading] = useState(true);
  const setting = useAppStore(selectors.currentSetting, isEqual);
  const currentTab = useAppStore(selectors.currentTab, shallow);
  const [size, setSize] = useState<number>(setting.extraNetworkCardSize || 86);
  const { styles } = useStyles({ size });

  useEffect(() => {
    console.time('🤯 [layout] inject - ExtraNetworkSidebar');
    if (setting.enableExtraNetworkSidebar) {
      const txt2imgExtraNetworks = gradioApp().querySelector(
        'div#txt2img_extra_networks',
      ) as HTMLDivElement;
      const img2imgExtraNetworks = gradioApp().querySelector(
        'div#img2img_extra_networks',
      ) as HTMLDivElement;
      if (txt2imgExtraNetworks && img2imgExtraNetworks) {
        txt2imgExtraNetworkSidebarReference.current?.append(txt2imgExtraNetworks);
        img2imgExtraNetworkSidebarReference.current?.append(img2imgExtraNetworks);
      }
      if (document.querySelector('#txt2img_lora_cards')) {
        civitaiHelperFix();
        setExtraLoading(false);
        return;
      }
    }
    console.timeEnd('🤯 [layout] inject - ExtraNetworkSidebar');
  }, []);

  useTimeout(() => {
    console.time('🤯 [extranetwork] force reload');
    const t2indexButton = document.querySelector('#txt2img_extra_refresh') as HTMLButtonElement;
    const index2indexButton = document.querySelector('#img2img_extra_refresh') as HTMLButtonElement;
    t2indexButton.click();
    index2indexButton.click();
    setExtraLoading(false);
    try {
      const civitaiText2ImgButton = document.querySelector('#txt2img_extra_refresh')
        ?.nextSibling as HTMLButtonElement;
      if (civitaiText2ImgButton) {
        civitaiText2ImgButton.onclick = civitaiHelperFix;
      }
      const civitaiImg2ImgButton = document.querySelector('#img2img_extra_refresh')
        ?.nextSibling as HTMLButtonElement;
      if (civitaiImg2ImgButton) {
        civitaiImg2ImgButton.onclick = civitaiHelperFix;
      }

      civitaiHelperFix();
    } catch (error) {
      console.debug(error);
    }
    console.timeEnd('🤯 [extranetwork] force reload');
  }, 2000);

  return (
    <>
      <DraggablePanelBody className={styles.body}>
        {extraLoading && <Skeleton active />}
        <div style={extraLoading ? { display: 'none' } : {}}>
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
