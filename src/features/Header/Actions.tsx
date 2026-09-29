import { ActionIcon } from '@lobehub/ui';
import { Space } from 'antd';
import { useResponsive } from 'antd-style';
import { Command, Github, History, LayoutGrid, LucideIcon, Moon, Settings, Sun } from 'lucide-react';
import qs from 'query-string';
import isEqual from 'fast-deep-equal';
import { Suspense, lazy, memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Giscus } from '@/components';
import { bus } from '@/features/Tools/bus';
import { selectors, useAppStore } from '@/store';

const CivitaiLogo: LucideIcon | any = ({ size }: any) => (
  <svg fill="currentColor" height={size} viewBox="0 0 16 16" width={size}>
    <path d="M2 4.5L8 1l6 3.5v7L8 15l-6-3.5v-7zm6-1.194L3.976 5.653v4.694L8 12.694l4.024-2.347V5.653L8 3.306zm0 1.589l2.662 1.552v.824H9.25L8 6.54l-1.25.73v1.458L8 9.46l1.25-.73h1.412v.824L8 11.105 5.338 9.553V6.447L8 4.895z" />
  </svg>
);

// The settings panel (and antd's form machinery it needs) loads the first
// time it is opened, not with the page.
const Setting = lazy(() => import('@/features/Setting'));

interface ActionsProps {
  themeMode: 'dark' | 'light';
  /** One above the other, for the side rail of the Studio layouts. */
  vertical?: boolean;
}

const Actions = memo<ActionsProps>(({ vertical }) => {
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [settingLoaded, setSettingLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const themeMode = useAppStore(selectors.themeMode);
  const onSetThemeMode = useAppStore((st) => st.onSetThemeMode);
  const { mobile } = useResponsive();
  const { t } = useTranslation();
  const setting = useAppStore(selectors.currentSetting, isEqual);

  useEffect(
    () =>
      bus.on('open:settings', () => {
        setSettingLoaded(true);
        setIsSettingOpen(true);
      }),
    [],
  );

  // Switch in place: Gradio's own colours follow the `dark` class on <body>,
  // the theme's follow the store. Only the URL is updated (so a reload keeps
  // the choice) - the page used to reload, rebuilding the whole WebUI.
  const handleSetTheme = useCallback(() => {
    const theme = themeMode === 'light' ? 'dark' : 'light';
    document.body.classList.remove('dark', 'light');
    document.body.classList.add(theme);
    onSetThemeMode(theme);
    const gradioURL = qs.parseUrl(window.location.href);
    gradioURL.query.__theme = theme;
    window.history.replaceState(window.history.state, '', qs.stringifyUrl(gradioURL));
  }, [themeMode]);

  return (
    <>
      <Space.Compact direction={vertical ? 'vertical' : 'horizontal'}>
        {!mobile && !vertical && (
          <>
            <a href="https://civitai.com/" rel="noreferrer" target="_blank">
              <ActionIcon icon={CivitaiLogo} title="Civitai" />
            </a>
            <a
              href="https://supagruen.github.io/StableDiffusion-CheatSheet/"
              rel="noreferrer"
              target="_blank"
            >
              <ActionIcon icon={LayoutGrid} title="Cheat Sheet" />
            </a>
            <ActionIcon
              icon={Github}
              onClick={() => setIsModalOpen(true)}
              title={t('header.feedback')}
            />
          </>
        )}
        {setting.enableCommandPalette && !mobile && (
          <ActionIcon
            icon={Command}
            onClick={() => bus.emit('open:palette')}
            title={t('header.commandPalette')}
          />
        )}
        {setting.enableHistory && (
          <ActionIcon icon={History} onClick={() => bus.emit('open:history')} title={t('header.history')} />
        )}
        <ActionIcon
          icon={themeMode === 'light' ? Sun : Moon}
          onClick={handleSetTheme}
          title={t('header.switchTheme')}
        />
        <ActionIcon
          icon={Settings}
          onClick={() => {
            setSettingLoaded(true);
            setIsSettingOpen(true);
          }}
          title={t('header.setting')}
        />
      </Space.Compact>
      {settingLoaded && (
        <Suspense fallback={null}>
          <Setting onCancel={() => setIsSettingOpen(false)} open={isSettingOpen} />
        </Suspense>
      )}
      <Giscus onCancel={() => setIsModalOpen(false)} open={isModalOpen} />
    </>
  );
});

export default Actions;
