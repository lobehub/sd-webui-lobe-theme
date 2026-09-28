import { DraggablePanelBody } from '@lobehub/ui';
import { Segmented } from 'antd';
import { useTheme } from 'antd-style';
import isEqual from 'fast-deep-equal';
import { Suspense, lazy, memo, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { bus } from '@/features/Tools/bus';
import { useInject } from '@/hooks/useInject';
import { selectors, useAppStore } from '@/store';
import { type DivProps } from '@/types';

// Drag-and-drop tag editing (react-dnd, react-tag-input) is only needed once
// the Prompt Editor tab is opened.
const PromptEditor = lazy(() => import('@/components/PromptEditor'));
const PresetsPanel = lazy(() => import('@/features/Tools/PresetsPanel'));
const SystemMonitor = lazy(() => import('./SystemMonitor'));

enum Tabs {
  Presets = 'presets',
  Prompt = 'prompt',
  Setting = 'setting',
}

const Inner = memo<DivProps>(() => {
  const theme = useTheme();
  const [tab, setTab] = useState<Tabs>(Tabs.Setting);
  const sidebarReference = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const setting = useAppStore(selectors.currentSetting, isEqual);

  useEffect(() => bus.on('open:presets', () => setTab(Tabs.Presets)), []);

  useInject(sidebarReference, '#quicksettings', {
    debug: '[layout] inject - QuickSettingSidebar',
  });

  return (
    <DraggablePanelBody>
      <Flexbox gap={16}>
        <Segmented
          block
          onChange={(value) => setTab(value as Tabs)}
          options={[
            { label: t('sidebar.tabs.settings'), title: t('sidebar.quickSetting'), value: Tabs.Setting },
            { label: t('sidebar.tabs.prompt'), title: t('setting.promptEditor.title'), value: Tabs.Prompt },
            ...(setting.enablePresets ? [{ label: t('sidebar.presets'), value: Tabs.Presets }] : []),
          ]}
          style={{ background: theme.colorBgContainer, width: '100%' }}
          value={tab}
        />
        <div ref={sidebarReference} style={tab === Tabs.Setting ? {} : { display: 'none' }} />
        {tab === Tabs.Prompt && (
          <Suspense fallback={null}>
            <PromptEditor />
          </Suspense>
        )}
        {tab === Tabs.Presets && (
          <Suspense fallback={null}>
            <PresetsPanel />
          </Suspense>
        )}
        {setting.enableSystemMonitor && (
          <Suspense fallback={null}>
            <SystemMonitor />
          </Suspense>
        )}
      </Flexbox>
    </DraggablePanelBody>
  );
});

export default Inner;
