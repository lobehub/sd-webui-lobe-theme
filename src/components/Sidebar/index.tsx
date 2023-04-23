import { DraggablePanel } from '@/components'
import { useAppStore } from '@/store'
import { useResponsive } from 'antd-style'
import React, { CSSProperties, useEffect, useState } from 'react'
import styled from 'styled-components'
import { shallow } from 'zustand/shallow'
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
  const [setting] = useAppStore((st) => [st.setting], shallow)
  const { mobile } = useResponsive()
  const [expand, setExpand] = useState<boolean>(setting.sidebarExpand)

  useEffect(() => {
    if (mobile) setExpand(false)
  }, [])

  return (
    <DraggablePanel
      maxHeight
      style={style}
      placement="left"
      defaultSize={{ width: setting?.sidebarWidth || 280 }}
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
