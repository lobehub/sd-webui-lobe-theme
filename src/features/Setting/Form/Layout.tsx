import { Form } from '@lobehub/ui';
import { Segmented, Switch } from 'antd';
import isEqual from 'fast-deep-equal';
import { Layout, TextCursorInput } from 'lucide-react';
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

  const layout: SettingItemGroup = useMemo(
    () => ({
      children: [
        {
          children: <Switch />,
          desc: t('setting.splitPreviewer.desc'),
          label: t('setting.splitPreviewer.title'),
          name: 'layoutSplitPreview',
          valuePropName: 'checked',
        },
        {
          children: <Switch />,
          desc: t('setting.hideFooter.desc'),
          label: t('setting.hideFooter.title'),
          name: 'layoutHideFooter',
          valuePropName: 'checked',
        },
      ],
      icon: Layout,
      title: t('setting.group.layout'),
    }),
    [],
  );

  const promptTextarea: SettingItemGroup = useMemo(
    () => ({
      children: [
        {
          children: (
            <Segmented
              options={[
                {
                  label: t('setting.promptDisplayMode.scroll'),
                  value: 'scroll',
                },
                {
                  label: t('setting.promptDisplayMode.resizable'),
                  value: 'resizable',
                },
              ]}
            />
          ),
          desc: t('setting.promptDisplayMode.desc'),
          label: t('setting.promptDisplayMode.title'),
          name: 'promptTextareaType',
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
      items={[layout, promptTextarea]}
      onFinish={onFinish}
      style={{ flex: 1 }}
    />
  );
});

export default SettingForm;
