import { DraggablePanel } from '@/components'
import { useResponsive } from 'antd-style'
import React, { useState } from 'react'
import styled from 'styled-components'
import PromptGroup from './PromptGroup'

const SidebarView = styled.div`
  padding: 16px;
  overflow-x: hidden;
  overflow-y: auto;
  height: 100%;

  #quicksettings {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: stretch;

    > div > div > div > label {
      max-width: 80%;
    }

    input[type='color'] {
      width: 100%;
    }

    input[type='number'],
    textarea {
      height: 20px !important;
      padding: 4px;
    }

    > * {
      flex: 1;
      max-width: unset !important;
      min-width: unset !important;
      width: 100%;
      margin: 0;
      padding: 0;
    }

    span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
    }

    .dropdown-arrow {
      min-width: 16px;
      min-height: 16px;
    }
  }
`

interface SidebarProps {
  children: React.ReactNode
  loading?: boolean
}

const Sidebar: React.FC<SidebarProps> = ({ children, loading }) => {
  const { mobile } = useResponsive()
  const [expand, setExpand] = useState<boolean>(!mobile)
  return (
    <DraggablePanel placement="left" defaultSize={{ width: 280 }} isExpand={expand} onExpandChange={setExpand}>
      <SidebarView>
        {!loading && <PromptGroup />}
        {children}
      </SidebarView>
    </DraggablePanel>
  )
}

export default React.memo(Sidebar)
