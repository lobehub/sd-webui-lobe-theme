import { ThemeProvider } from 'antd-style'
import qs from 'query-string'
import React, { useEffect, useState } from 'react'
import Layout from './Layout'

const App: React.FC = () => {
  const [appearance, setAppearance] = useState<string>('dark')
  useEffect(() => {
    const themeMode = String(qs.parseUrl(window.location.href).query.__theme) || 'dark'
    setAppearance(themeMode)
    document.body.classList.add(themeMode)
  }, [])

  return (
    <ThemeProvider appearance={appearance}>
      <Layout themeMode={appearance} />
    </ThemeProvider>
  )
}

export default App
