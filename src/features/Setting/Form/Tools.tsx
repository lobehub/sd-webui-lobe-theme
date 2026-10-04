import { Form } from '@lobehub/ui';
import { Switch } from 'antd';
import isEqual from 'fast-deep-equal';
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

  // The browser only shows its permission prompt in response to a click.
  const onValuesChange = useCallback((changed: Partial<WebuiSetting>) => {
    if (changed.enableNotification && 'Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().catch(() => undefined);
    }
  }, []);

  const tools: SettingItemGroup = useMemo(
    () => ({
      children: [
        ['enableCommandPalette', 'commandPalette'],
        ['enableHistory', 'history'],
        ['enablePresets', 'presets'],
        ['enableLoraTools', 'loraTools'],
        ['enableSizeTools', 'sizeTools'],
        ['enableChaoticSeeds', 'chaoticSeeds'],
        ['promptSections', 'promptSections'],
        ['enableTabProgress', 'tabProgress'],
        ['enableNotification', 'notification'],
        ['enableImageInfo', 'imageInfo'],
        ['localAssets', 'localAssets'],
      ].map(([name, key]) => ({
        children: <Switch />,
        desc: t(`setting.${key}.desc` as any) as string,
        label: t(`setting.${key}.title` as any) as string,
        name,
        valuePropName: 'checked',
      })),
      title: t('setting.group.tools'),
    }),
    [],
  );

  return (
    <Form
      id="theme_settings"
      initialValues={setting}
      items={[tools]}
      onFinish={onFinish}
      onValuesChange={onValuesChange}
      style={{ flex: 1 }}
      variant={'pure'}
    />
  );
});

export default SettingForm;
