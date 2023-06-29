import { type DivProps, ThemeProvider, colors } from '@lobehub/ui';
import {
  generateColorNeutralPalette,
  generateColorPalette,
} from '@lobehub/ui/es/styles/algorithms/generateColorPalette';
import isEqual from 'fast-deep-equal';
import qs from 'query-string';
import { memo, useCallback, useEffect } from 'react';
import { shallow } from 'zustand/shallow';

import { useIsDarkMode } from '@/hooks/useIsDarkMode';
import { useAppStore } from '@/store';
import GlobalStyle from '@/styles/index';
import { kitchenNeutral, kitchenPrimary } from '@/styles/kitchenColors';
import { neutralColorScales } from '@/styles/neutralColors';

const Layout = memo<DivProps>(({ children }) => {
  const { onSetThemeMode, onInit, themeMode } = useAppStore(
    (st) => ({ onInit: st.onInit, onSetThemeMode: st.onSetThemeMode, themeMode: st.themeMode }),
    shallow,
  );
  const setting = useAppStore((st) => st.setting, isEqual);
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

  const genCustomToken = useCallback(() => {
    let primaryTokens = {};
    let neutralTokens = {};
    if (setting.primaryColor) {
      if (setting.primaryColor === 'kitchen') {
        primaryTokens = kitchenPrimary[themeMode];
      } else {
        const scale = colors[setting.primaryColor];
        primaryTokens = generateColorPalette({ appearance: themeMode, scale, type: 'Primary' });
      }
    }
    if (setting.neutralColor) {
      if (setting.neutralColor === 'kitchen') {
        neutralTokens = kitchenNeutral[themeMode];
      } else {
        const scale = neutralColorScales[setting.neutralColor];
        neutralTokens = generateColorNeutralPalette({ appearance: themeMode, scale });
      }
    }

    return { ...primaryTokens, ...neutralTokens };
  }, [setting.primaryColor, themeMode]);

  return (
    <ThemeProvider customToken={genCustomToken} themeMode={themeMode}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
});

export default Layout;
