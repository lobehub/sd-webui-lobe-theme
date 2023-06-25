import { DivProps, ThemeProvider } from '@lobehub/ui';
import qs from 'query-string';
import { memo, useEffect } from 'react';
import { shallow } from 'zustand/shallow';

import { useIsDarkMode } from '@/hooks/useIsDarkMode';
import { useAppStore } from '@/store';
import GlobalStyle from '@/styles/index';

const Layout = memo<DivProps>(({ children }) => {
  const { onSetThemeMode, onInit, themeMode } = useAppStore(
    (st) => ({ onInit: st.onInit, onSetThemeMode: st.onSetThemeMode, themeMode: st.themeMode }),
    shallow,
  );
  const isDarkMode = useIsDarkMode();

  useEffect(() => {
    onInit();
  }, []);
  useEffect(() => {
    const queryTheme: any = String(qs.parseUrl(window.location.href).query.__theme || '');
    if (queryTheme) {
      document.body.classList.add(queryTheme);
      onSetThemeMode(queryTheme);
    } else {
      document.body.classList.add(isDarkMode ? 'dark' : 'light');
      onSetThemeMode(isDarkMode ? 'dark' : 'light');
    }
  }, [isDarkMode]);

  return (
    <ThemeProvider themeMode={themeMode}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
});

export default Layout;
