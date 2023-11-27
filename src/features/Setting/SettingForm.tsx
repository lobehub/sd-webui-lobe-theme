import { Form, type ItemGroup, Swatches } from '@lobehub/ui';
import { Button, Input, InputNumber, Segmented, Select, Switch } from 'antd';
import isEqual from 'fast-deep-equal';
import { Layout, Palette, PanelLeftClose, PanelRightClose, TextCursorInput } from 'lucide-react';
import { memo, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { shallow } from 'zustand/shallow';

import { CustomLogo } from '@/components';
import {
  DEFAULT_SETTING,
  type WebuiSetting,
  type WebuiSettingKeys,
  selectors,
  useAppStore,
} from '@/store';

import {
  type NeutralColor,
  type PrimaryColor,
  findCustomThemeName,
  neutralColors,
  neutralColorsSwatches,
  primaryColors,
  primaryColorsSwatches,
} from './data';
import { useStyles } from './style';

type SettingItemGroup = ItemGroup & {
  children: {
    name?: WebuiSettingKeys | string;
  }[];
};

const SettingForm = memo(() => {
  const setting = useAppStore(selectors.currentSetting, isEqual);
  const { onSetSetting, localeOptions } = useAppStore(
    (st) => ({ localeOptions: st.localeOptions, onSetSetting: st.onSetSetting }),
    shallow,
  );
  const [rawSetting, setRawSetting] = useState<WebuiSetting>(setting);
  const [primaryColor, setPrimaryColor] = useState<PrimaryColor | undefined>(
    setting.primaryColor || undefined,
  );
  const [neutralColor, setNeutralColor] = useState<NeutralColor | undefined>(
    setting.neutralColor || undefined,
  );
  const { styles } = useStyles();
  const { t } = useTranslation();

  const onReset = useCallback(() => {
    onSetSetting(DEFAULT_SETTING);
    location.reload();
  }, []);

  const onFinish = useCallback(
    (value: WebuiSetting) => {
      onSetSetting({ ...value, neutralColor, primaryColor });
      location.reload();
    },
    [primaryColor, neutralColor],
  );

  const theme: SettingItemGroup = useMemo(
    () => ({
      children: [
        {
          children: <Select options={localeOptions} />,
          desc: t('setting.language.desc'),
          label: t('setting.language.title'),
          name: 'i18n',
        },
        {
          children: <Switch />,
          desc: t('setting.reduceAnimation.desc'),
          label: t('setting.reduceAnimation.title'),
          name: 'liteAnimation',
          valuePropName: 'checked',
        },
        {
          children: (
            <Swatches
              activeColor={primaryColor ? primaryColors[primaryColor] : undefined}
              colors={primaryColorsSwatches}
              onSelect={(c) => setPrimaryColor(findCustomThemeName('primary', c))}
            />
          ),
          desc: t('setting.primaryColor.desc'),
          label: t('setting.primaryColor.title'),
        },
        {
          children: (
            <Swatches
              activeColor={neutralColor ? neutralColors[neutralColor] : undefined}
              colors={neutralColorsSwatches}
              onSelect={(c) => setNeutralColor(findCustomThemeName('neutral', c))}
            />
          ),
          desc: t('setting.neutralColor.desc'),
          label: t('setting.neutralColor.title'),
        },
        {
          children: (
            <Segmented
              options={[
                {
                  label: t('brand.lobe'),
                  value: 'lobe',
                },
                {
                  label: t('brand.kitchen'),
                  value: 'kitchen',
                },
                {
                  label: t('brand.custom'),
                  value: 'custom',
                },
              ]}
            />
          ),
          desc: t('setting.logoType.desc'),
          label: t('setting.logoType.title'),
          name: 'logoType',
        },
        {
          children: <Input />,
          desc: t('setting.customLogo.desc'),
          divider: false,
          hidden: rawSetting.logoType !== 'custom',
          label: t('setting.customLogo.title'),
          name: 'logoCustomUrl',
        },
        {
          children: <Input />,
          desc: t('setting.customTitle.desc'),
          divider: false,
          hidden: rawSetting.logoType !== 'custom',
          label: t('setting.customTitle.title'),
          name: 'logoCustomTitle',
        },
        {
          children: (
            <CustomLogo
              logoCustomTitle={rawSetting.logoCustomTitle}
              logoCustomUrl={rawSetting.logoCustomUrl}
            />
          ),
          divider: false,
          hidden: rawSetting.logoType !== 'custom',
          label: t('setting.logoType.preview'),
        },
        {
          children: <Switch />,
          desc: t('setting.svgIcons.desc'),
          label: t('setting.svgIcons.title'),
          name: 'svgIcon',
          valuePropName: 'checked',
        },
        {
          children: <Switch />,
          desc: t('setting.customFont.desc'),
          label: t('setting.customFont.title'),
          name: 'enableWebFont',
          valuePropName: 'checked',
        },
        {
          children: <Switch />,
          desc: t('setting.confirmPageUnload.desc'),
          label: t('setting.confirmPageUnload.title'),
          name: 'confirmPageUnload',
          valuePropName: 'checked',
        },
      ],
      icon: Palette,
      title: t('setting.group.theme'),
    }),
    [
      primaryColor,
      neutralColor,
      rawSetting.logoType,
      rawSetting.logoCustomTitle,
      rawSetting.logoCustomUrl,
    ],
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
      icon: TextCursorInput,
      title: t('setting.group.promptTextarea'),
    }),
    [],
  );

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
      className={styles}
      footer={
        <>
          <Button htmlType="button" onClick={onReset} style={{ borderRadius: 4 }}>
            {t('setting.button.reset')}
          </Button>
          <Button htmlType="submit" style={{ borderRadius: 4 }} type="primary">
            {t('setting.button.submit')}
          </Button>
        </>
      }
      initialValues={setting}
      items={[theme, promptTextarea, layout, quickSettingSidebar, extraNetworkSidebar]}
      onFinish={onFinish}
      onValuesChange={(_, v) => setRawSetting(v)}
    />
  );
});

export default SettingForm;
