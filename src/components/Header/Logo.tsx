import React from 'react'
import { darkLogo, lightLogo } from './style'

interface LogoProps {
  size?: number
  style?: React.CSSProperties
  themeMode: 'dark' | 'light'
}

const Logo: React.FC<LogoProps> = ({ size = 20, style, themeMode }) => {
  return <img src={themeMode === 'dark' ? darkLogo : lightLogo} alt="logo" style={{ height: size, ...style }} />
}

export default React.memo(Logo)
