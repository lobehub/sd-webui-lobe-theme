import { Form } from '@lobehub/ui';
import { Segmented, Switch } from 'antd';
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

  const layout: SettingItemGroup = useMemo(
    () => ({
      children: [
        {
          children: <Switch />,
          desc: t('setting.sidebarSwap.desc'),
          label: t('setting.sidebarSwap.title'),
          name: 'sidebarSwap',
          valuePropName: 'checked',
        },
        {
          children: (
            <Segmented
              options={[
                { label: t('setting.accordionMode.free'), value: 'free' },
                { label: t('setting.accordionMode.single'), value: 'single' },
              ]}
            />
          ),
          desc: t('setting.accordionMode.desc'),
          label: t('setting.accordionMode.title'),
          name: 'accordionMode',
        },
        {
          children: <Switch />,
          desc: t('setting.splitPreviewer.desc'),
          label: t('setting.splitPreviewer.title'),
          name: 'layoutSplitPreview',
          valuePropName: 'checked',
        },
        {
          children: <Switch />,
          desc: t('setting.imageButtonsTop.desc'),
          label: t('setting.imageButtonsTop.title'),
          name: 'layoutImageButtonsTop',
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
      items={[layout, promptTextarea]}
      onFinish={onFinish}
      style={{ flex: 1 }}
      variant={'pure'}
    />
  );
});

export default SettingForm;
