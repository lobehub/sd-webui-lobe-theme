import { DraggablePanel } from '@/components/DraggablePanel'
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
  height: 100%;
`

const Header = styled.div`
  height: 72px;
`

const Content = styled.div``

interface LayoutViewProps {
  themeMode: string
}

const LayoutView: React.FC<LayoutViewProps> = ({ themeMode }) => {
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
        <Header className="gradio-container-3-23-0">
          <div id="header" ref={headerRef} />
        </Header>
        <Content>
          <div ref={mainRef} />
        </Content>
      </MainView>
      <DraggablePanel placement="right">
        <div ref={sidebarRef} />
      </DraggablePanel>
    </View>
  )
}

export default LayoutView
