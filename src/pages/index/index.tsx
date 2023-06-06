import { ThemeProvider, setupStyled } from 'antd-style';
import qs from 'query-string';
import { memo, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
// @ts-ignore
import ReactFontLoader from 'react-font-loader';
import { ThemeContext } from 'styled-components';
import { shallow } from 'zustand/shallow';

import { useIsDarkMode } from '@/components/theme/useIsDarkMode';
import formatPrompt from '@/script/formatPrompt';
import promptBracketChecker from '@/script/promptBracketChecker';
import setupHead from '@/script/setupHead';
import { useAppStore } from '@/store';
import '@/theme/style.less';

import App from './App';
import GlobalStyle from './GlobalStyle';
import { baseToken } from './style';

const Root = memo(() => {
  setupStyled({ ThemeContext });
  const [onSetThemeMode, onInit] = useAppStore((st) => [st.onSetThemeMode, st.onInit], shallow);
  const isDarkMode = useIsDarkMode();
  const [appearance, setAppearance] = useState<'light' | 'dark'>('light');
  const [first, setFirst] = useState(true);
  useEffect(() => {
    onInit();
  }, []);
  useEffect(() => {
    const queryTheme: any = String(qs.parseUrl(window.location.href).query.__theme || '');
    if (queryTheme) {
      setAppearance(queryTheme as any);
      document.body.classList.add(queryTheme);
      onSetThemeMode(queryTheme);
      return;
    }
    setAppearance(isDarkMode ? 'dark' : 'light');
    document.body.classList.add(isDarkMode ? 'dark' : 'light');
    onSetThemeMode(isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);
  useEffect(() => {
    if (first) {
      setFirst(false);
      return;
    }
    window.location.reload();
  }, [isDarkMode]);
  return (
    <ThemeProvider appearance={appearance} theme={{ token: baseToken }}>
      <GlobalStyle />
      <ReactFontLoader url="https://raw.githubusercontent.com/IKKI2000/harmonyos-fonts/main/css/harmonyos_sans.css" />
      <ReactFontLoader url="https://raw.githubusercontent.com/IKKI2000/harmonyos-fonts/main/css/harmonyos_sans_sc.css" />
      <App />
    </ThemeProvider>
  );
});

document.addEventListener(
  'DOMContentLoaded',
  () => {
    setupHead();
    const root = document.createElement('div');
    root.setAttribute('id', 'root');
    try {
      gradioApp()?.append(root);
    } catch {
      document.querySelector('gradio-app')?.append(root);
    }
    const client = createRoot(root);
    client.render(<Root />);
  },
  { once: true },
);

onUiLoaded(() => {
  formatPrompt();
  promptBracketChecker();
});

export default () => null;
