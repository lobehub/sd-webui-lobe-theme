import {Spin} from 'antd';
import {useResponsive} from 'antd-style';
import {memo, useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {shallow} from 'zustand/shallow';

import {Content, ExtraNetworkSidebar, Header, Sidebar} from '@/components';
import civitaiHelperFix from '@/script/civitaiHelperFix';
import dragablePanel from '@/script/draggablePanel';
import replaceIcon from '@/script/replaceIcon';
import {useAppStore} from '@/store';

const View = styled.div`
  position: relative;

  overflow: hidden;
  display: flex;
  flex: 1;
  flex-direction: row !important;
`;

const MainView = styled.div`
  position: relative;

  overflow: hidden;
  display: flex;
  flex: 1;
  flex-direction: column;

  width: 100vw;
  height: 100vh;
`;

const LoadingBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
`;

const App = memo(() => {
    const [currentTab, setCurrentTab, setting] = useAppStore(
        (st) => [st.currentTab, st.setCurrentTab, st.setting],
        shallow,
    );
    const {mobile} = useResponsive();
    const [loading, setLoading] = useState(true);
    const [extraLoading, setExtraLoading] = useState(true);
    const sidebarReference: any = useRef<HTMLElement>();
    const mainReference: any = useRef<HTMLElement>();
    const txt2imgExtraNetworkSidebarReference: any = useRef<HTMLElement>();
    const img2imgExtraNetworkSidebarReference: any = useRef<HTMLElement>();
    useEffect(() => {
        onUiLoaded(() => {
            // Content
            const main = gradioApp().querySelector('.app');
            if (main) mainReference.current?.append(main);
            if (!mobile) dragablePanel();

            // Sidebar
            const sidebar = gradioApp().querySelector('#quicksettings');
            if (sidebar) sidebarReference.current?.append(sidebar);

            // ExtraNetworkSidebar
            if (setting.enableExtraNetworkSidebar) {
                const txt2imgExtraNetworks = gradioApp().querySelector('div#txt2img_extra_networks');
                const img2imgExtraNetworks = gradioApp().querySelector('div#img2img_extra_networks');
                if (txt2imgExtraNetworks && img2imgExtraNetworks) {
                    txt2imgExtraNetworkSidebarReference.current?.append(txt2imgExtraNetworks);
                    img2imgExtraNetworkSidebarReference.current?.append(img2imgExtraNetworks);
                }
            }

            // Other
            if (setting.svgIcon) replaceIcon();

            setLoading(false);
        });
        onUiUpdate(() => {
            setCurrentTab();
        });
    }, []);

    useEffect(() => {
        if (!loading && setting.enableExtraNetworkSidebar) {
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
                    );
                    if (civitaiButton) {
                        civitaiButton.forEach((button: any) => (button.onclick = civitaiHelperFix));
                    }
                    civitaiHelperFix();
                } catch (error) {
                    console.log(error);
                }
            }, 2000);
        }
    }, [loading]);

    return (
        <MainView>
            <Header>
                {loading && (
                    <LoadingBox>
                        <Spin size="small" />
                    </LoadingBox>
                )}
            </Header>
            <View>
                <Sidebar>
                    {loading && (
                        <LoadingBox>
                            <Spin size="small" />
                        </LoadingBox>
                    )}
                    <div id="sidebar" ref={sidebarReference} style={loading ? {display: 'none'} : {}} />
                </Sidebar>
                <Content loading={loading}>
                    {loading && (
                        <LoadingBox>
                            <Spin size="large" tip="Loading" />
                        </LoadingBox>
                    )}
                    <div id="content" ref={mainReference} style={loading ? {display: 'none'} : {}} />
                </Content>
                {setting?.enableExtraNetworkSidebar && (
                    <ExtraNetworkSidebar>
                        {extraLoading && (
                            <LoadingBox>
                                <Spin size="small" />
                            </LoadingBox>
                        )}
                        <div style={extraLoading ? {display: 'none'} : {}}>
                            <div
                                id="txt2img-extra-netwrok-sidebar"
                                ref={txt2imgExtraNetworkSidebarReference}
                                style={currentTab === 'tab_img2img' ? {display: 'none'} : {}}
                            />
                            <div
                                id="img2img-extra-netwrok-sidebar"
                                ref={img2imgExtraNetworkSidebarReference}
                                style={currentTab === 'tab_img2img' ? {} : {display: 'none'}}
                            />
                        </div>
                    </ExtraNetworkSidebar>
                )}
            </View>
        </MainView>
    );
});

export default App;
