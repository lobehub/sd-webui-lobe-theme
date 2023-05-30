import { Spin } from 'antd';
import { useResponsive } from 'antd-style';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { shallow } from 'zustand/shallow';

import { Content, ExtraNetworkSidebar, Header, Sidebar } from '@/components';
import civitaiHelperFix from '@/script/civitaiHelperFix';
import dragablePanel from '@/script/draggablePanel';
import replaceIcon from '@/script/replaceIcon';
import { useAppStore } from '@/store';

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

const App: React.FC = () => {
  const [currentTab, setCurrentTab, setting] = useAppStore(
    (st) => [st.currentTab, st.setCurrentTab, st.setting],
    shallow,
  );
  const { mobile } = useResponsive();
  const [loading, setLoading] = useState(true);
  const [extraLoading, setExtraLoading] = useState(true);
  const sidebarRef: any = useRef<HTMLElement>();
  const mainRef: any = useRef<HTMLElement>();
  const txt2imgExtraNetworkSidebarRef: any = useRef<HTMLElement>();
  const img2imgExtraNetworkSidebarRef: any = useRef<HTMLElement>();
  useEffect(() => {
    onUiLoaded(() => {
      // Content
      const main = gradioApp().querySelector('.app');
      if (main) mainRef.current?.appendChild(main);
      if (!mobile) dragablePanel();

      // Sidebar
      const sidebar = gradioApp().querySelector('#quicksettings');
      if (sidebar) sidebarRef.current?.appendChild(sidebar);

      // ExtraNetworkSidebar
      if (setting.enableExtraNetworkSidebar) {
        const txt2imgExtraNetworks = gradioApp().querySelector('div#txt2img_extra_networks');
        const img2imgExtraNetworks = gradioApp().querySelector('div#img2img_extra_networks');
        if (txt2imgExtraNetworks && img2imgExtraNetworks) {
          txt2imgExtraNetworkSidebarRef.current?.appendChild(txt2imgExtraNetworks);
          img2imgExtraNetworkSidebarRef.current?.appendChild(img2imgExtraNetworks);
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
        const t2iBtn: any = document.querySelector('#txt2img_extra_refresh');
        const i2iBtn: any = document.querySelector('#img2img_extra_refresh');
        t2iBtn.click();
        i2iBtn.click();
        setExtraLoading(false);
        try {
          const civitaiBtn = document.querySelectorAll(
            'button[title="Refresh Civitai Helper\'s additional buttons"]',
          );
          if (civitaiBtn) {
            civitaiBtn.forEach((btn: any) => (btn.onclick = civitaiHelperFix));
          }
          civitaiHelperFix();
        } catch {}
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
          <div id="sidebar" ref={sidebarRef} style={loading ? { display: 'none' } : {}} />
        </Sidebar>
        <Content loading={loading}>
          {loading && (
            <LoadingBox>
              <Spin size="large" tip="Loading" />
            </LoadingBox>
          )}
          <div id="content" ref={mainRef} style={loading ? { display: 'none' } : {}} />
        </Content>
        {setting?.enableExtraNetworkSidebar && (
          <ExtraNetworkSidebar>
            {extraLoading && (
              <LoadingBox>
                <Spin size="small" />
              </LoadingBox>
            )}
            <div style={extraLoading ? { display: 'none' } : {}}>
              <div
                id="txt2img-extra-netwrok-sidebar"
                ref={txt2imgExtraNetworkSidebarRef}
                style={currentTab !== 'tab_img2img' ? {} : { display: 'none' }}
              />
              <div
                id="img2img-extra-netwrok-sidebar"
                ref={img2imgExtraNetworkSidebarRef}
                style={currentTab === 'tab_img2img' ? {} : { display: 'none' }}
              />
            </div>
          </ExtraNetworkSidebar>
        )}
      </View>
    </MainView>
  );
};

export default React.memo(App);
