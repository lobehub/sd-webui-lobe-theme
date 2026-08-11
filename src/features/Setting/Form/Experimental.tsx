import { Form } from '@lobehub/ui';
import { Switch, message } from 'antd';
import isEqual from 'fast-deep-equal';
import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { WebuiSetting, selectors, useAppStore } from '@/store';
import { needsLayoutReload } from '@/utils/settingApply';

import { SettingItemGroup } from './types';

const SettingForm = memo(() => {
  const setting = useAppStore(selectors.currentSetting, isEqual);
  const onSetSetting = useAppStore((st) => st.onSetSetting);

  const { t } = useTranslation();

  const onFinish = useCallback(
    async (value: WebuiSetting) => {
      await onSetSetting(value);
      if (needsLayoutReload(setting, value)) {
        location.reload();
      } else {
        message.success(t('setting.button.applySuccess'));
      }
    },
    [onSetSetting, setting, t],
  );

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
      variant={'pure'}
    />
  );
});

export default SettingForm;
