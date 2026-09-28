import {
  type DivProps,
  ThemeProvider,
  generateColorNeutralPalette,
  generateColorPalette,
} from '@lobehub/ui';
import { ConfigProvider } from 'antd';
import isEqual from 'fast-deep-equal';
import qs from 'query-string';
import { memo, useCallback, useEffect, useMemo } from 'react';

import { webfonts } from '@/app/assets';
import { neutralScaleFor, primaryScaleFor } from '@/features/Setting/data';
import { useIsDarkMode } from '@/hooks/useIsDarkMode';
import { selectors, useAppStore } from '@/store';
import { appearanceClasses, appearanceFontUrls, appearanceToken } from '@/styles/appearance';
import { kitchenNeutral, kitchenPrimary } from '@/styles/kitchenColors';

const GlobalLayout = memo<DivProps>(({ children }) => {
  const { onSetThemeMode, themeMode } = useAppStore((st) => ({
    onInit: st.onInit,
    onSetThemeMode: st.onSetThemeMode,
    themeMode: st.themeMode,
  }));
  const setting = useAppStore(selectors.currentSetting, isEqual);
  const isDarkMode = useIsDarkMode();

  useEffect(() => {
    const queryTheme: any = String(qs.parseUrl(window.location.href).query.__theme || '');
    const mode = queryTheme === 'dark' || queryTheme === 'light' ? queryTheme : isDarkMode ? 'dark' : 'light';
    document.body.classList.remove('dark', 'light');
    document.body.classList.add(mode);
    onSetThemeMode(mode);
  }, [isDarkMode]);

  // Appearance options: body classes for the CSS that tokens cannot reach.
  useEffect(() => {
    const classes = appearanceClasses(setting);
    document.body.classList.forEach((c) => {
      if (/^lobe-(corner|density|surface)-/.test(c) && !classes.includes(c)) document.body.classList.remove(c);
    });
    document.body.classList.add(...classes);
  }, [setting.cornerStyle, setting.density, setting.surfaceStyle]);

  // The chosen fonts load even with "Web fonts" off: they are a deliberate choice.
  useEffect(() => {
    for (const href of appearanceFontUrls(setting)) {
      if (document.querySelector(`link[data-lobe-font="${href}"]`)) continue;
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.dataset.lobeFont = href;
      document.head.append(link);
    }
  }, [setting.fontFamily, setting.fontMono]);

  const appearance = useMemo(
    () => ({ inherit: true, token: appearanceToken(setting) }),
    [setting.cornerStyle, setting.density, setting.fontFamily, setting.fontMono],
  );

  const genCustomToken = useCallback(() => {
    let primaryTokens = {};
    let neutralTokens = {};
    if (setting.primaryColor) {
      if (setting.primaryColor === 'kitchen') {
        primaryTokens = kitchenPrimary[themeMode];
      } else {
        const scale = primaryScaleFor(setting.primaryColor);
        if (scale) primaryTokens = generateColorPalette({ appearance: themeMode, scale: scale as any, type: 'Primary' });
      }
    }
    if (setting.neutralColor) {
      if (setting.neutralColor === 'kitchen') {
        neutralTokens = kitchenNeutral[themeMode];
      } else {
        const scale = neutralScaleFor(setting.neutralColor);
        if (scale) neutralTokens = generateColorNeutralPalette({ appearance: themeMode, scale: scale as any });
      }
    }

    // Appearance tokens here reach antd-style (createStyles, the Gradio
    // variables); the ConfigProvider below reaches antd's own components.
    return { ...primaryTokens, ...neutralTokens, ...appearanceToken(setting) };
  }, [setting.primaryColor, setting.neutralColor, themeMode, setting.cornerStyle, setting.density, setting.fontFamily, setting.fontMono]);

  return (
    setting && (
      <ThemeProvider
        customToken={genCustomToken}
        enableWebfonts={setting.enableWebFont}
        themeMode={themeMode}
        webfonts={webfonts(setting.i18n)}
      >
        <ConfigProvider theme={appearance}>{children}</ConfigProvider>
      </ThemeProvider>
    )
  );
});

export default GlobalLayout;
