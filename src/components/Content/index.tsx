import { FloatButton } from 'antd'
import React, { useRef } from 'react'
import styled from 'styled-components'

const ContentView = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  flex: 1;
`

interface ContentProps {
  children: React.ReactNode
}

const Content: React.FC<ContentProps> = ({ children }) => {
  const ref: any = useRef(null)
  return (
    <ContentView ref={ref}>
      {children}
      <FloatButton.BackTop target={() => ref.current} />
    </ContentView>
  )
}

export default React.memo(Content)
