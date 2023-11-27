import {
  type DivProps,
  ThemeProvider,
  colorScales,
  generateColorNeutralPalette,
  generateColorPalette,
  neutralColorScales,
} from '@lobehub/ui';
import isEqual from 'fast-deep-equal';
import qs from 'query-string';
import { memo, useCallback, useEffect } from 'react';
import { shallow } from 'zustand/shallow';

import { useIsDarkMode } from '@/hooks/useIsDarkMode';
import { selectors, useAppStore } from '@/store';
import { kitchenNeutral, kitchenPrimary } from '@/styles/kitchenColors';

const Layout = memo<DivProps>(({ children }) => {
  const { onSetThemeMode, themeMode } = useAppStore(
    (st) => ({ onInit: st.onInit, onSetThemeMode: st.onSetThemeMode, themeMode: st.themeMode }),
    shallow,
  );
  const setting = useAppStore(selectors.currentSetting, isEqual);
  const isDarkMode = useIsDarkMode();

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
        const scale = colorScales[setting.primaryColor];
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
  }, [setting.primaryColor, setting.neutralColor, themeMode]);

  return (
    setting && (
      <ThemeProvider
        customToken={genCustomToken}
        enableWebfonts={setting.enableWebFont}
        themeMode={themeMode}
      >
        {children}
      </ThemeProvider>
    )
  );
});

export default Layout;
