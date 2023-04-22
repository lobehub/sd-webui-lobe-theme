import { Content, ExtraNetworkSidebar, Header, Sidebar } from '@/components'
import { WebuiSetting, defaultValue } from '@/components/Header/Setting'
import { useAppStore } from '@/store'
import { useLocalStorageState } from 'ahooks'
import { Spin } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { shallow } from 'zustand/shallow'

const View = styled.div`
  display: flex;
  flex-direction: row !important;
  flex: 1;
  overflow: hidden;
  position: relative;
`

const MainView = styled.div`
  flex: 1;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
`

const LoadingBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

interface AppProps {
  themeMode: 'light' | 'dark'
}

const App: React.FC<AppProps> = ({ themeMode }) => {
  const [setting] = useLocalStorageState<WebuiSetting>('SD-KITCHEN-SETTING', {
    defaultValue,
  })
  const [currentTab, setCurrentTab] = useAppStore((st) => [st.currentTab, st.setCurrentTab], shallow)
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
      <Header themeMode={themeMode}>
        {loading && (
          <LoadingBox>
            <Spin size="small" />
          </LoadingBox>
        )}
        <div ref={headerRef} className="header" />
      </Header>
      <View>
        <Sidebar style={['tab_txt2img', 'tab_img2img'].includes(currentTab) ? {} : { display: 'none' }}>
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
          <ExtraNetworkSidebar style={['tab_txt2img', 'tab_img2img'].includes(currentTab) ? {} : { display: 'none' }}>
            {loading && (
              <LoadingBox>
                <Spin size="small" />
              </LoadingBox>
            )}
            <div
              id="txt2img-extra-netwrok-sidebar"
              style={currentTab === 'tab_txt2img' ? {} : { display: 'none' }}
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
