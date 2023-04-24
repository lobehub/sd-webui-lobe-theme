import { Content, ExtraNetworkSidebar, Header, Sidebar } from '@/components'
import { useAppStore } from '@/store'
import { Spin } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { shallow } from 'zustand/shallow'

const View = styled.div`
  position: relative;

  overflow: hidden;
  display: flex;
  flex: 1;
  flex-direction: row !important;
`

const MainView = styled.div`
  position: relative;

  overflow: hidden;
  display: flex;
  flex: 1;
  flex-direction: column;

  width: 100vw;
  height: 100vh;
`

const LoadingBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
`

const App: React.FC = () => {
  const [currentTab, setCurrentTab, setting] = useAppStore(
    (st) => [st.currentTab, st.setCurrentTab, st.setting],
    shallow
  )
  const [loading, setLoading] = useState(true)
  const sidebarRef: any = useRef<HTMLElement>()
  const mainRef: any = useRef<HTMLElement>()
  const headerRef: any = useRef<HTMLElement>()
  const txt2imgExtraNetworkSidebarRef: any = useRef<HTMLElement>()
  const img2imgExtraNetworkSidebarRef: any = useRef<HTMLElement>()
  useEffect(() => {
    onUiLoaded(() => {
      // Header
      const header = gradioApp().querySelector('#tabs > .tab-nav:first-child')
      if (header) {
        headerRef.current?.appendChild(header)
        headerRef.current.id = 'tabs'
      }

      // Content
      const main = gradioApp().querySelector('.app')
      if (main) mainRef.current?.appendChild(main)

      // Sidebar
      const sidebar = gradioApp().querySelector('#quicksettings')
      if (sidebar) sidebarRef.current?.appendChild(sidebar)

      // ExtraNetworkSidebar
      if (setting?.enableExtraNetworkSidebar) {
        const txt2imgExtraNetworks = gradioApp().querySelector('div#txt2img_extra_networks')
        const img2imgExtraNetworks = gradioApp().querySelector('div#img2img_extra_networks')
        if (txt2imgExtraNetworks && img2imgExtraNetworks) {
          txt2imgExtraNetworkSidebarRef.current?.appendChild(txt2imgExtraNetworks)
          img2imgExtraNetworkSidebarRef.current?.appendChild(img2imgExtraNetworks)
        }
      }

      setLoading(false)
    })
    onUiUpdate(() => {
      setCurrentTab()
    })
  }, [])

  return (
    <MainView>
      <Header>
        {loading && (
          <LoadingBox>
            <Spin size="small" />
          </LoadingBox>
        )}
        <div ref={headerRef} className="header" />
      </Header>
      <View>
        <Sidebar>
          {loading && (
            <LoadingBox>
              <Spin size="small" />
            </LoadingBox>
          )}
          <div id="sidebar" ref={sidebarRef} />
        </Sidebar>
        <Content loading={loading}>
          {loading && (
            <LoadingBox>
              <Spin tip="Loading" size="large" />
            </LoadingBox>
          )}
          <div id="content" ref={mainRef} />
        </Content>
        {setting?.enableExtraNetworkSidebar && (
          <ExtraNetworkSidebar>
            {loading && (
              <LoadingBox>
                <Spin size="small" />
              </LoadingBox>
            )}
            <div
              id="txt2img-extra-netwrok-sidebar"
              style={currentTab !== 'tab_img2img' ? {} : { display: 'none' }}
              ref={txt2imgExtraNetworkSidebarRef}
            />
            <div
              id="img2img-extra-netwrok-sidebar"
              style={currentTab === 'tab_img2img' ? {} : { display: 'none' }}
              ref={img2imgExtraNetworkSidebarRef}
            />
          </ExtraNetworkSidebar>
        )}
      </View>
    </MainView>
  )
}

export default React.memo(App)
