import favicon from '@/script/favicon'
import formatPrompt from '@/script/format-prompt'
import promptBracketChecker from '@/script/prompt-bracket-checker'
import '@/theme/style.less'
import { createRoot } from 'react-dom/client'
import App from './App'

document.addEventListener('DOMContentLoaded', () => {
  const root = document.createElement('div')
  root.setAttribute('id', 'root')
  gradioApp().append(root)
  const client = createRoot(root)
  client.render(<App />)
})

onUiLoaded(() => {
  favicon()
})

onUiUpdate(() => {
  formatPrompt()
  promptBracketChecker()
})

export default () => <App />
