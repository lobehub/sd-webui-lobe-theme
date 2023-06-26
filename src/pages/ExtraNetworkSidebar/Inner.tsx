import { Icon } from '@lobehub/ui';
import { Skeleton, Slider } from 'antd';
import { ZoomIn } from 'lucide-react';
import { memo, useEffect, useRef, useState } from 'react';
import { shallow } from 'zustand/shallow';

import { SidebarBody, SidebarFooter } from '@/components';
import { useStyles } from '@/pages/ExtraNetworkSidebar/style';
import civitaiHelperFix from '@/script/civitaiHelperFix';
import { useAppStore } from '@/store';

const Inner = memo(() => {
  const txt2imgExtraNetworkSidebarReference: any = useRef<HTMLElement>();
  const img2imgExtraNetworkSidebarReference: any = useRef<HTMLElement>();
  const [extraLoading, setExtraLoading] = useState(true);
  const [setting, currentTab] = useAppStore((st) => [st.setting, st.currentTab], shallow);
  const [size, setSize] = useState<number>(setting?.extraNetworkCardSize || 86);
  const { styles } = useStyles({ size });
  useEffect(() => {
    if (setting.enableExtraNetworkSidebar) {
      const txt2imgExtraNetworks = gradioApp().querySelector('div#txt2img_extra_networks');
      const img2imgExtraNetworks = gradioApp().querySelector('div#img2img_extra_networks');
      if (txt2imgExtraNetworks && img2imgExtraNetworks) {
        txt2imgExtraNetworkSidebarReference.current?.append(txt2imgExtraNetworks);
        img2imgExtraNetworkSidebarReference.current?.append(img2imgExtraNetworks);
      }
      if (document.querySelector('#txt2img_lora_cards')) {
        civitaiHelperFix();
        setExtraLoading(false);
        return;
      }
      setTimeout(() => {
        const t2indexButton: any = document.querySelector('#txt2img_extra_refresh');
        const index2indexButton: any = document.querySelector('#img2img_extra_refresh');
        t2indexButton.click();
        index2indexButton.click();
        setExtraLoading(false);
        try {
          const civitaiButton = document.querySelectorAll(
            'button[title="Refresh Civitai Helper\'s additional buttons"]',
          ) as NodeListOf<HTMLButtonElement>;
          if (civitaiButton) {
            for (const button of civitaiButton) {
              button.onclick = civitaiHelperFix;
            }
          }
          civitaiHelperFix();
        } catch (error) {
          console.log(error);
        }
      }, 2000);
    }
  }, []);

  return (
    <>
      <SidebarBody className={styles.body}>
        {extraLoading && <Skeleton active />}
        <div style={extraLoading ? { display: 'none' } : {}}>
          <div
            id="txt2img-extra-netwrok-sidebar"
            ref={txt2imgExtraNetworkSidebarReference}
            style={currentTab === 'tab_img2img' ? { display: 'none' } : {}}
          />
          <div
            id="img2img-extra-netwrok-sidebar"
            ref={img2imgExtraNetworkSidebarReference}
            style={currentTab === 'tab_img2img' ? {} : { display: 'none' }}
          />
        </div>
      </SidebarBody>
      <SidebarFooter>
        <Icon icon={ZoomIn} />
        <Slider
          defaultValue={size}
          max={256}
          min={64}
          onChange={setSize}
          step={8}
          style={{ flex: 1 }}
        />
      </SidebarFooter>
    </>
  );
});

export default Inner;
