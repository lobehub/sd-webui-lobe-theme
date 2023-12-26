import { Form } from '@lobehub/ui';
import { Switch } from 'antd';
import isEqual from 'fast-deep-equal';
import { Puzzle, TextCursorInput } from 'lucide-react';
import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { WebuiSetting, selectors, useAppStore } from '@/store';

import { SettingItemGroup } from './types';

const SettingForm = memo(() => {
  const setting = useAppStore(selectors.currentSetting, isEqual);
  const onSetSetting = useAppStore((st) => st.onSetSetting);

  const { t } = useTranslation();

  const onFinish = useCallback((value: WebuiSetting) => {
    onSetSetting(value);
    location.reload();
  }, []);

  const experimental: SettingItemGroup = useMemo(
    () => ({
      children: [
        {
          children: <Switch />,
          desc: t('setting.imageInfo.desc'),
          label: t('setting.imageInfo.title'),
          name: 'enableImageInfo',
          valuePropName: 'checked',
        },
      ],
      icon: Puzzle,
      title: t('setting.group.experimental'),
    }),
    [],
  );

  const promptTextarea: SettingItemGroup = useMemo(
    () => ({
      children: [
        {
          children: <Switch />,
          desc: t('setting.promptHighlight.desc'),
          label: t('setting.promptHighlight.title'),
          name: 'enableHighlight',
          valuePropName: 'checked',
        },
        {
          children: <Switch />,
          desc: t('setting.promptEditor.desc'),
          label: t('setting.promptEditor.title'),
          name: 'promptEditor',
          valuePropName: 'checked',
        },
      ],
      icon: TextCursorInput,
      title: t('setting.group.promptTextarea'),
    }),
    [],
  );

  return (
    <Form
      id="theme_settings"
      initialValues={setting}
      items={[experimental, promptTextarea]}
      onFinish={onFinish}
      style={{ flex: 1 }}
    />
  );
});

export default SettingForm;
