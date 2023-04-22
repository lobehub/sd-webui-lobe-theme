import { DraggablePanel } from '@/components'
import { useResponsive } from 'antd-style'
import React, { CSSProperties, useEffect, useState } from 'react'
import styled from 'styled-components'
import PromptGroup from './PromptGroup'

const SidebarView = styled.div`
  padding: 16px;
  overflow-x: hidden;
  overflow-y: auto;
  height: -webkit-fill-available;
`

interface SidebarProps {
  children: React.ReactNode
  loading?: boolean
  style?: CSSProperties
}

const Sidebar: React.FC<SidebarProps> = ({ children, loading, style }) => {
  const { mobile } = useResponsive()
  const [expand, setExpand] = useState<boolean>(!mobile)

  useEffect(() => {
    setExpand(!mobile)
  }, [mobile])

  return (
    <DraggablePanel
      style={style}
      placement="left"
      defaultSize={{ width: 280 }}
      isExpand={expand}
      onExpandChange={setExpand}
    >
      <SidebarView>
        {!loading && <PromptGroup />}
        {children}
      </SidebarView>
    </DraggablePanel>
  )
}

export default React.memo(Sidebar)
