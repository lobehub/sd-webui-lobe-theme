import { DraggablePanel } from '@/components'
import React from 'react'
import styled from 'styled-components'

const SidebarView = styled.div`
  padding: 16px;
  #quicksettings {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: stretch;

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
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  return (
    <DraggablePanel placement="right" defaultSize={{ width: 280 }}>
      <SidebarView>{children}</SidebarView>
    </DraggablePanel>
  )
}

export default React.memo(Sidebar)
