import React from 'react'
import styled from 'styled-components'
import Logo from './Logo'

const HeaderView = styled.div`
  height: 46px;
  padding: 16px 24px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.colorBgContainer};
  border-bottom: 1px solid ${({ theme }) => theme.colorBorderSecondary};
`

interface HeaderProps {
  children: React.ReactNode
  themeMode: 'dark' | 'light'
}

const Header: React.FC<HeaderProps> = ({ children, themeMode }) => {
  return (
    <HeaderView className="gradio-container-3-23-0">
      <Logo themeMode={themeMode} />
      {children}
    </HeaderView>
  )
}

export default React.memo(Header)
