import { DraggablePanel } from '@/components'
import { useAppStore } from '@/store'
import { BoldOutlined, GithubOutlined } from '@ant-design/icons'
import { Button, Modal, Space } from 'antd'
import { useResponsive } from 'antd-style'
import qs from 'query-string'
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { shallow } from 'zustand/shallow'
import Giscus from './Giscus'
import Logo from './Logo'
import Setting from './Setting'
import { civitaiLogo, themeIcon } from './style'

/******************************************************
 *********************** Style *************************
 ******************************************************/

const HeaderView = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 12px;
  align-items: center;
  justify-content: space-between;

  height: -webkit-fill-available;
  height: -moz-available;
  padding: 16px 24px;

  #tabs.header {
    .tab-nav {
      margin: 0 !important;
      border: none !important;
    }
    button {
      cursor: pointer;

      flex: none;
      flex: 0 !important;

      margin: 0 !important;
      padding: 8px !important;

      background: transparent !important;
      border: none !important;
      border-radius: 4px !important;

      transition: all 0.2s ease-in-out;
      &:hover {
        flex: none;
        color: var(--color-text) !important;
        background: var(--color-fill-tertiary) !important;
        border: none !important;
      }
      &.selected {
        flex: none;

        font-weight: 600;
        color: var(--color-text) !important;

        background: transparent !important;
        border: none !important;
      }
    }
  }
`

/******************************************************
 ************************* Dom *************************
 ******************************************************/

interface HeaderProps {
  children: React.ReactNode
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  const [themeMode] = useAppStore((st) => [st.themeMode], shallow)
  const { mobile } = useResponsive()
  const [expand, setExpand] = useState<boolean>(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (mobile) setExpand(false)
  }, [])

  const handleSetTheme = useCallback(() => {
    const theme = themeMode === 'light' ? 'dark' : 'light'
    const gradioURL = qs.parseUrl(window.location.href)
    gradioURL.query.__theme = theme
    window.location.replace(qs.stringifyUrl(gradioURL))
  }, [themeMode])

  const showModal = () => setIsModalOpen(true)

  const handleCancel = () => setIsModalOpen(false)

  return (
    <>
      <DraggablePanel placement="top" defaultSize={{ height: 'auto' }} isExpand={expand} onExpandChange={setExpand}>
        <HeaderView id="header" style={{ flexDirection: mobile ? 'column' : 'row' }}>
          <a href="https://github.com/canisminor1990/sd-webui-kitchen-theme" target="_blank" rel="noreferrer">
            <Logo themeMode={themeMode} />
          </a>
          {children}
          <Space.Compact>
            <a href="https://civitai.com/" target="_blank" rel="noreferrer">
              <Button title="Civitai" icon={civitaiLogo} />
            </a>
            <a href="https://www.birme.net/?target_width=512&target_height=512" target="_blank" rel="noreferrer">
              <Button title="Birme" icon={<BoldOutlined />} />
            </a>
            <Button title="Feedback" icon={<GithubOutlined />} onClick={showModal} />
            <Setting />
            <Button title="Switch Theme" icon={themeIcon[themeMode]} onClick={handleSetTheme} />
          </Space.Compact>
        </HeaderView>
      </DraggablePanel>
      <Modal
        title={
          <a href="https://github.com/canisminor1990/sd-webui-kitchen-theme" target="_blank" rel="noreferrer">
            <Space>
              <GithubOutlined />
              {'canisminor1990/sd-webui-kitchen-theme'}
            </Space>
          </a>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Giscus themeMode={themeMode} />
      </Modal>
    </>
  )
}

export default React.memo(Header)
