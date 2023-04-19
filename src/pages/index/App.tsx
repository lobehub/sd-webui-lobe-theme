import { DraggablePanel, Header } from '@/components'
import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

const View = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row !important;
`

const MainView = styled.div`
  flex: 1;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

const Content = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  flex: 1;
`

const Sidebar = styled.div`
  padding: 16px;
`

interface AppProps {
  themeMode: 'light' | 'dark'
}

const App: React.FC<AppProps> = ({ themeMode }) => {
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
    })
  }, [])

  return (
    <View>
      <MainView>
        <Header themeMode={themeMode}>
          <div id="header" ref={headerRef} />
        </Header>
        <Content>
          <div ref={mainRef} />
        </Content>
      </MainView>
      <DraggablePanel placement="right">
        <Sidebar ref={sidebarRef} />
      </DraggablePanel>
    </View>
  )
}

export default React.memo(App)
