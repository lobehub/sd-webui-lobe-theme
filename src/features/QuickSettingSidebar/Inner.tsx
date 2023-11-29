import { DraggablePanelBody } from '@lobehub/ui';
import { Segmented } from 'antd';
import { useTheme } from 'antd-style';
import { consola } from 'consola';
import { memo, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { PromptEditor } from '@/components';
import { type DivProps } from '@/types';

enum Tabs {
  Prompt = 'prompt',
  Setting = 'setting',
}

const Inner = memo<DivProps>(() => {
  const theme = useTheme();
  const [tab, setTab] = useState<Tabs>(Tabs.Setting);
  const sidebarReference = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  useEffect(() => {
    try {
      const sidebar = gradioApp().querySelector('#quicksettings');
      if (sidebar) sidebarReference.current?.append(sidebar);
      consola.success('🤯 [layout] inject - QuickSettingSidebar');
    } catch (error) {
      consola.error('🤯 [layout] inject - QuickSettingSidebar', error);
    }
  }, []);

  return (
    <DraggablePanelBody>
      <Flexbox gap={16}>
        <Segmented
          block
          onChange={(value) => setTab(value as Tabs)}
          options={[
            { label: t('sidebar.quickSetting'), value: Tabs.Setting },
            { label: t('setting.promptEditor.title'), value: Tabs.Prompt },
          ]}
          style={{ background: theme.colorBgContainer, width: '100%' }}
          value={tab}
        />
        <div ref={sidebarReference} style={tab === Tabs.Setting ? {} : { display: 'none' }} />
        {tab === Tabs.Prompt && <PromptEditor />}
      </Flexbox>
    </DraggablePanelBody>
  );
});

export default Inner;
