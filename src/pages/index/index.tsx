import favicon from '@/script/favicon'
import formatPrompt from '@/script/format-prompt'
import promptBracketChecker from '@/script/prompt-bracket-checker'
import '@/theme/style.less'
import { ThemeProvider, setupStyled } from 'antd-style'
import qs from 'query-string'
import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeContext } from 'styled-components'
import App from './App'

const Root: React.FC = () => {
  setupStyled({ ThemeContext })
  const [appearance, setAppearance] = useState<'light' | 'dark'>('dark')
  useEffect(() => {
    const themeMode: any = String(qs.parseUrl(window.location.href).query.__theme) || 'dark'
    setAppearance(themeMode)
    document.body.classList.add(themeMode)
  }, [])

  return (
    <ThemeProvider appearance={appearance}>
      <App themeMode={appearance} />
    </ThemeProvider>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  const root = document.createElement('div')
  root.setAttribute('id', 'root')
  gradioApp().append(root)
  const client = createRoot(root)
  client.render(<Root />)
})

onUiLoaded(() => {
  favicon()
})

onUiUpdate(() => {
  formatPrompt()
  promptBracketChecker()
})

export default () => null
