import { Form } from '@lobehub/ui';
import { InputNumber, Segmented, Switch } from 'antd';
import isEqual from 'fast-deep-equal';
import { PanelLeftClose, PanelRightClose } from 'lucide-react';
import { memo, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { type WebuiSetting, selectors, useAppStore } from '@/store';

import { SettingItemGroup } from './types';

const SettingForm = memo(() => {
  const setting = useAppStore(selectors.currentSetting, isEqual);
  const onSetSetting = useAppStore((st) => st.onSetSetting);
  const [rawSetting, setRawSetting] = useState<WebuiSetting>(setting);

  const { t } = useTranslation();

  const onFinish = useCallback((value: WebuiSetting) => {
    onSetSetting(value);
    location.reload();
  }, []);

  const quickSettingSidebar: SettingItemGroup = useMemo(
    () => ({
      children: [
        {
          children: <Switch />,
          desc: t('setting.quickSettingSidebar.enable.desc'),
          label: t('setting.quickSettingSidebar.enable.title'),
          name: 'enableSidebar',
          valuePropName: 'checked',
        },
        {
          children: <Switch />,
          desc: t('setting.quickSettingSidebar.defaultExpand.desc'),
          hidden: !rawSetting.enableSidebar,
          label: t('setting.quickSettingSidebar.defaultExpand.title'),
          name: 'sidebarExpand',
          valuePropName: 'checked',
        },
        {
          children: (
            <Segmented
              options={[
                {
                  label: t('sidebar.mode.fixed'),
                  value: 'fixed',
                },
                {
                  label: t('sidebar.mode.float'),
                  value: 'float',
                },
              ]}
            />
          ),
          desc: t('setting.quickSettingSidebar.displayMode.desc'),
          hidden: !rawSetting.enableSidebar,
          label: t('setting.quickSettingSidebar.displayMode.title'),
          name: 'sidebarFixedMode',
        },
        {
          children: <InputNumber />,
          desc: t('setting.quickSettingSidebar.defaultWidth.desc'),
          hidden: !rawSetting.enableSidebar,
          label: t('setting.quickSettingSidebar.defaultWidth.title'),
          name: 'sidebarWidth',
        },
      ],
      icon: PanelLeftClose,
      title: t('setting.group.quickSettingSidebar'),
    }),
    [rawSetting.enableSidebar],
  );

  const extraNetworkSidebar: SettingItemGroup = useMemo(
    () => ({
      children: [
        {
          children: <Switch />,
          desc: t('setting.extraNetworkSidebar.enable.desc'),
          label: t('setting.extraNetworkSidebar.enable.title'),
          name: 'enableExtraNetworkSidebar',
          valuePropName: 'checked',
        },
        {
          children: (
            <Segmented
              options={[
                {
                  label: t('sidebar.mode.fixed'),
                  value: 'fixed',
                },
                {
                  label: t('sidebar.mode.float'),
                  value: 'float',
                },
              ]}
            />
          ),
          desc: t('setting.extraNetworkSidebar.displayMode.desc'),
          hidden: !rawSetting.enableExtraNetworkSidebar,
          label: t('setting.extraNetworkSidebar.displayMode.title'),
          name: 'extraNetworkFixedMode',
        },
        {
          children: <Switch />,
          desc: t('setting.extraNetworkSidebar.defaultExpand.desc'),
          hidden: !rawSetting.enableExtraNetworkSidebar,
          label: t('setting.extraNetworkSidebar.defaultExpand.title'),
          name: 'extraNetworkSidebarExpand',
          valuePropName: 'checked',
        },
        {
          children: <InputNumber />,
          desc: t('setting.extraNetworkSidebar.defaultWidth.desc'),
          hidden: !rawSetting.enableExtraNetworkSidebar,
          label: t('setting.extraNetworkSidebar.defaultWidth.title'),
          name: 'extraNetworkSidebarWidth',
        },
        {
          children: <InputNumber />,
          desc: t('setting.extraNetworkSidebar.defaultCardSize.desc'),
          hidden: !rawSetting.enableExtraNetworkSidebar,
          label: t('setting.extraNetworkSidebar.defaultCardSize.title'),
          name: 'extraNetworkCardSize',
        },
      ],
      icon: PanelRightClose,
      title: t('setting.group.extraNetworkSidebar'),
    }),
    [rawSetting.enableExtraNetworkSidebar],
  );

  return (
    <Form
      initialValues={setting}
      items={[quickSettingSidebar, extraNetworkSidebar]}
      onFinish={onFinish}
      onValuesChange={(_, v) => setRawSetting(v)}
      style={{ flex: 1 }}
    />
  );
});

export default SettingForm;
