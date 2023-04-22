import { DraggablePanel } from '@/components'
import { WebuiSetting } from '@/components/Header/Setting'
import { useLocalStorageState } from 'ahooks'
import { useResponsive } from 'antd-style'
import React, { CSSProperties, useEffect } from 'react'
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
  const [setting] = useLocalStorageState<WebuiSetting>('SD-KITCHEN-SETTING')
  const [expand, setExpand] = useLocalStorageState<boolean>('SD-KITCHEN-SIDEBAR', {
    defaultValue: true,
  })
  useEffect(() => {
    if (mobile) setExpand(false)
  }, [])

  return (
    <DraggablePanel
      style={style}
      placement="left"
      defaultSize={{ width: setting.sidebarWidth }}
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
