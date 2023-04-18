import { ThemeProvider } from 'antd-style'
import qs from 'query-string'
import React, { useEffect, useState } from 'react'
import Layout from './Layout'

const App: React.FC = () => {
  const [appearance, setAppearance] = useState<string>('auto')
  useEffect(() => {
    setAppearance(String(qs.parseUrl(window.location.href).query.__theme) || 'auto')
  }, [])

  return (
    <ThemeProvider appearance={appearance}>
      <Layout />
    </ThemeProvider>
  )
}

export default App
