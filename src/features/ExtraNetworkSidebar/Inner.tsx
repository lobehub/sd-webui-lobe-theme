import {ActionIcon, DraggablePanelBody, DraggablePanelFooter} from '@lobehub/ui';
import {useTimeout} from 'ahooks';
import {Skeleton, Slider} from 'antd';
import {consola} from 'consola';
import isEqual from 'fast-deep-equal';
import {ZoomIn, ZoomOut} from 'lucide-react';
import {memo, useEffect, useRef, useState} from 'react';

import {useStyles} from '@/features/ExtraNetworkSidebar/style';
import civitaiHelperFix from '@/scripts/civitaiHelperFix';
import {selectors, useAppStore} from '@/store';

const Inner = memo(() => {
    const txt2imgExtraNetworkSidebarReference = useRef<HTMLDivElement>(null);
    const img2imgExtraNetworkSidebarReference = useRef<HTMLDivElement>(null);
    const [extraLoading, setExtraLoading] = useState(true);
    const setting = useAppStore(selectors.currentSetting, isEqual);
    const currentTab = useAppStore(selectors.currentTab);
    const [size, setSize] = useState<number>(setting.extraNetworkCardSize || 86);
    const {styles} = useStyles({size});

    useEffect(() => {
        try {
            if (setting.enableExtraNetworkSidebar) {
                const image2imageExtraNetworkButton = gradioApp().querySelectorAll(
                    '#txt2img_extra_tabs > .tab-nav > button',
                )[1] as HTMLButtonElement;
                const text2imageExtraNetworkButton = gradioApp().querySelectorAll(
                    '#img2img_extra_tabs > .tab-nav > button',
                )[1] as HTMLButtonElement;

                if (image2imageExtraNetworkButton) {
                    image2imageExtraNetworkButton.click();
                }
                if (text2imageExtraNetworkButton) {
                    text2imageExtraNetworkButton.click();
                }

                const txt2imgTab = gradioApp().querySelector('div#tab_txt2img') as HTMLDivElement;
                const txt2imgExtraNetworks = gradioApp().querySelector(
                    'div#txt2img_extra_tabs',
                ) as HTMLDivElement;
                const txt2imgRender = txt2imgExtraNetworks.querySelectorAll(
                    'div.tabitem.gradio-tabitem',
                )[0] as HTMLDivElement;

                const img2imgTab = gradioApp().querySelector('div#tab_img2img');
                const img2imgExtraNetworks = gradioApp().querySelector(
                    'div#img2img_extra_tabs',
                ) as HTMLDivElement;
                const img2imgRender = img2imgExtraNetworks.querySelectorAll(
                    'div.tabitem.gradio-tabitem',
                )[0] as HTMLDivElement;

                if (txt2imgExtraNetworks && img2imgExtraNetworks) {
                    txt2imgExtraNetworkSidebarReference.current?.append(txt2imgExtraNetworks);
                    txt2imgRender.id = 'txt2img_render';
                    txt2imgTab?.append(txt2imgRender);

                    img2imgExtraNetworkSidebarReference.current?.append(img2imgExtraNetworks);
                    img2imgRender.id = 'img2img_render';
                    img2imgTab?.append(img2imgRender);
                }
                if (document.querySelector('.extra-network-cards')) {
                    civitaiHelperFix();
                    setExtraLoading(false);
                    return;
                }
            }
            consola.success('🤯 [layout] inject - ExtraNetworkSidebar');
        } catch (error) {
            consola.error('🤯 [layout] inject - ExtraNetworkSidebar', error);
        }
    }, []);

    useTimeout(() => {
        try {
            const t2indexButton = document.querySelector('#txt2img_extra_refresh') as HTMLButtonElement;
            const index2indexButton = document.querySelector(
                '#img2img_extra_refresh',
            ) as HTMLButtonElement;
            t2indexButton.click();
            index2indexButton.click();
            setExtraLoading(false);

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
            consola.success('🤯 [extranetwork] force reload');
        } catch (error) {
            consola.error('🤯 [extranetwork] force reload', error);
        }
    }, 2000);

    return (
        <>
            <DraggablePanelBody className={styles.body}>
                {extraLoading && <Skeleton active />}
                <div style={extraLoading ? {display: 'none'} : {}}>
                    <div
                        id="txt2img-extra-network-sidebar"
                        ref={txt2imgExtraNetworkSidebarReference}
                        style={currentTab === 'tab_img2img' ? {display: 'none'} : {}}
                    />
                    <div
                        id="img2img-extra-network-sidebar"
                        ref={img2imgExtraNetworkSidebarReference}
                        style={currentTab === 'tab_img2img' ? {} : {display: 'none'}}
                    />
                </div>
            </DraggablePanelBody>
            <DraggablePanelFooter>
                <ActionIcon
                    icon={setting.extraNetworkCardSize < size ? ZoomOut : ZoomIn}
                    onClick={() => setSize(setting.extraNetworkCardSize)}
                    size={{blockSize: 24, fontSize: 16}}
                />
                <Slider
                    defaultValue={size}
                    max={256}
                    min={64}
                    onChange={setSize}
                    step={8}
                    style={{flex: 1}}
                    value={size}
                />
            </DraggablePanelFooter>
        </>
    );
});

export default Inner;
