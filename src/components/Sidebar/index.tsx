import { DraggablePanel } from '@/components'
import { WebuiSetting } from '@/components/Header/Setting'
import { useAppStore } from '@/store'
import { useLocalStorageState } from 'ahooks'
import { useResponsive } from 'antd-style'
import React, { CSSProperties, useEffect } from 'react'
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
  const { mobile } = useResponsive()
  const [currentTab] = useAppStore((st) => [st.currentTab], shallow)
  const [setting] = useLocalStorageState<WebuiSetting>('SD-KITCHEN-SETTING')
  const [expand, setExpand] = useLocalStorageState<boolean>('SD-KITCHEN-SIDEBAR', {
    defaultValue: true,
  })
  useEffect(() => {
    if (mobile) setExpand(false)
  }, [])

  useEffect(() => {
    if (currentTab && !['tab_txt2img', 'tab_img2img'].includes(currentTab)) {
      setExpand(false)
    }
  }, [currentTab])

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
