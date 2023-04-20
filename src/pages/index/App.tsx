import { Content, Header, Sidebar } from '@/components'
import { useAppStore } from '@/store'
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
  const [setCurrentTab] = useAppStore((st) => [st.setCurrentTab], shallow)
  const [loading, setLoading] = useState(true)
  const sidebarRef: any = useRef<HTMLElement>()
  const mainRef: any = useRef<HTMLElement>()
  const headerRef: any = useRef<HTMLElement>()
  useEffect(() => {
    onUiLoaded(() => {
      const sidebar = gradioApp().querySelector('#quicksettings')
      const header = gradioApp().querySelector('#tabs > .tab-nav:first-child')
      const main = gradioApp().querySelector('.app')
      if (sidebar) sidebarRef.current?.appendChild(sidebar)
      if (header) headerRef.current?.appendChild(header)
      if (main) mainRef.current?.appendChild(main)
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
        <div id="header" ref={headerRef} />
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
      </View>
    </MainView>
  )
}

export default React.memo(App)
