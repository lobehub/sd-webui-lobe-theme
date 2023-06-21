import { DivProps, ThemeProvider } from '@lobehub/ui';
import qs from 'query-string';
import { memo, useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow';

import { useIsDarkMode } from '@/hooks/useIsDarkMode';
import { useAppStore } from '@/store';

import GlobalStyle from './GlobalStyle';
import { useStyles } from './style';

const Layout = memo<DivProps>(({ children }) => {
  const { onSetThemeMode, onInit } = useAppStore(
    (st) => ({ onInit: st.onInit, onSetThemeMode: st.onSetThemeMode }),
    shallow,
  );
  const isDarkMode = useIsDarkMode();
  const [appearance, setAppearance] = useState<'light' | 'dark'>('light');
  const [first, setFirst] = useState(true);

  const { styles } = useStyles();

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
    <ThemeProvider themeMode={appearance}>
      <GlobalStyle />
      <div className={styles}>{children}</div>
    </ThemeProvider>
  );
});

export default Layout;
