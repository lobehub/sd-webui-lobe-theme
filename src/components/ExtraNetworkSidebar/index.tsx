import { DraggablePanel } from '@/components'
import { ZoomInOutlined } from '@ant-design/icons'
import { Slider } from 'antd'
import { useResponsive } from 'antd-style'
import React, { CSSProperties, useEffect, useState } from 'react'
import styled from 'styled-components'

const View = styled.div`
  display: flex;
  flex-direction: column;
  height: -webkit-fill-available;
  overflow: hidden;
`

const SidebarView = styled.div<{ size: number }>`
  padding: 16px;
  overflow-x: hidden;
  overflow-y: auto;
  flex: 1;

  .extra-network-thumbs {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(${({ size }) => size}px, 1fr));
    > .card {
      height: ${({ size }) => size * 1.5}px !important;
      width: -webkit-fill-available !important;
    }
  }
`

const Footer = styled.div`
  flex: 0;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-top: 1px solid var(--color-border);
`

const ZoomSlider = styled(Slider)`
  margin-left: 16px;
  flex: 1;
`

interface SidebarProps {
  children: React.ReactNode
  loading?: boolean
  style?: CSSProperties
}

const Sidebar: React.FC<SidebarProps> = ({ children, style }) => {
  const { mobile } = useResponsive()
  const [expand, setExpand] = useState<boolean>(!mobile)
  const [size, setSize] = useState<number>(96)

  useEffect(() => {
    setExpand(!mobile)
  }, [mobile])

  return (
    <DraggablePanel
      style={style}
      placement="right"
      defaultSize={{ width: 340 }}
      isExpand={expand}
      onExpandChange={setExpand}
    >
      <View>
        <SidebarView size={size}>{children}</SidebarView>
        <Footer>
          <ZoomInOutlined />
          <ZoomSlider defaultValue={86} step={8} max={256} min={64} onChange={setSize} />
        </Footer>
      </View>
    </DraggablePanel>
  )
}

export default React.memo(Sidebar)
