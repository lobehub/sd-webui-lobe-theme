import { useIsDarkMode } from '@/components/theme/useIsDarkMode'
import civitaiHelperFix from '@/script/civitai-helper-fix'
import formatPrompt from '@/script/format-prompt'
import promptBracketChecker from '@/script/prompt-bracket-checker'
import setupHead from '@/script/setup-head'
import { useAppStore } from '@/store'
import '@/theme/style.less'
import { ThemeProvider, setupStyled } from 'antd-style'
import qs from 'query-string'
import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeContext } from 'styled-components'
import { shallow } from 'zustand/shallow'
import App from './App'

const Root: React.FC = () => {
  setupStyled({ ThemeContext })
  const [onSetThemeMode, onInit] = useAppStore((st) => [st.onSetThemeMode, st.onInit], shallow)
  const isDarkMode = useIsDarkMode()
  const [appearance, setAppearance] = useState<'light' | 'dark'>('light')
  const [first, setFirst] = useState(true)
  useEffect(() => {
    onInit()
  }, [])
  useEffect(() => {
    const queryTheme: any = String(qs.parseUrl(window.location.href).query.__theme || '')
    if (queryTheme) {
      setAppearance(queryTheme as any)
      document.body.classList.add(queryTheme)
      onSetThemeMode(queryTheme)
      return
    }
    setAppearance(isDarkMode ? 'dark' : 'light')
    document.body.classList.add(isDarkMode ? 'dark' : 'light')
    onSetThemeMode(isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])
  useEffect(() => {
    if (first) {
      setFirst(false)
      return
    }
    window.location.reload()
  }, [isDarkMode])
  return (
    <ThemeProvider appearance={appearance}>
      <App />
    </ThemeProvider>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  setupHead()
  const root = document.createElement('div')
  root.setAttribute('id', 'root')
  try {
    gradioApp()?.append(root)
  } catch {
    document.querySelector('gradio-app')?.append(root)
  }
  const client = createRoot(root)
  client.render(<Root />)
})

onUiLoaded(() => {
  formatPrompt()
  promptBracketChecker()
  civitaiHelperFix()
})

export default () => null
