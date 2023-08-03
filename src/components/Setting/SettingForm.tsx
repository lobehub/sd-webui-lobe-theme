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
          desc: t('settingLanguageDesc'),
          label: t('settingLanguage'),
          name: 'i18n',
        },
        {
          children: <Switch />,
          desc: t('settingReduceAnimationDesc'),
          label: t('settingReduceAnimation'),
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
          desc: t('settingPrimaryColorDesc'),
          label: t('settingPrimaryColor'),
        },
        {
          children: (
            <Swatches
              activeColor={neutralColor ? neutralColors[neutralColor] : undefined}
              colors={neutralColorsSwatches}
              onSelect={(c) => setNeutralColor(findCustomThemeName('neutral', c))}
            />
          ),
          desc: t('settingNeutralColorDesc'),
          label: t('settingNeutralColor'),
        },
        {
          children: (
            <Segmented
              options={[
                {
                  label: t('lobe'),
                  value: 'lobe',
                },
                {
                  label: t('kitchen'),
                  value: 'kitchen',
                },
                {
                  label: t('custom'),
                  value: 'custom',
                },
              ]}
            />
          ),
          desc: t('settingLogoTypeDesc'),
          label: t('settingLogoType'),
          name: 'logoType',
        },
        {
          children: <Input />,
          desc: t('settingCustomLogoDesc'),
          divider: false,
          hidden: rawSetting.logoType !== 'custom',
          label: t('settingCustomLogo'),
          name: 'logoCustomUrl',
        },
        {
          children: <Input />,
          desc: t('settingCustomTitleDesc'),
          divider: false,
          hidden: rawSetting.logoType !== 'custom',
          label: t('settingCustomTitle'),
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
          label: t('settingLogoPreview'),
        },
        {
          children: <Switch />,
          desc: t('settingSvgIconsDesc'),
          label: t('settingSvgIcons'),
          name: 'svgIcon',
          valuePropName: 'checked',
        },
        {
          children: <Switch />,
          desc: t('settingCustomFontDesc'),
          label: t('settingCustomFont'),
          name: 'enableWebFont',
          valuePropName: 'checked',
        },
      ],
      icon: Palette,
      title: t('settingGroupTheme'),
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
                  label: t('scroll'),
                  value: 'scroll',
                },
                {
                  label: t('resizable'),
                  value: 'resizable',
                },
              ]}
            />
          ),
          desc: t('settingPromptDisplayModeDesc'),
          label: t('settingPromptDisplayMode'),
          name: 'promptTextareaType',
        },
        {
          children: <Switch />,
          desc: t('settingPromptHighlightDesc'),
          label: t('settingPromptHighlight'),
          name: 'enableHighlight',
          valuePropName: 'checked',
        },
        {
          children: <Switch />,
          desc: t('settingPromptEditorDesc'),
          label: t('settingPromptEditor'),
          name: 'promptEditor',
          valuePropName: 'checked',
        },
      ],
      icon: TextCursorInput,
      title: t('settingGroupPromptTextarea'),
    }),
    [],
  );

  const layout: SettingItemGroup = useMemo(
    () => ({
      children: [
        {
          children: <Switch />,
          desc: t('settingSplitPreviewerDesc'),
          label: t('settingSplitPreviewer'),
          name: 'layoutSplitPreview',
          valuePropName: 'checked',
        },
        {
          children: <Switch />,
          desc: t('settingHideFooterDesc'),
          label: t('settingHideFooter'),
          name: 'layoutHideFooter',
          valuePropName: 'checked',
        },
      ],
      icon: Layout,
      title: t('settingGroupLayout'),
    }),
    [],
  );

  const quickSettingSidebar: SettingItemGroup = useMemo(
    () => ({
      children: [
        {
          children: <Switch />,
          desc: t('settingQuickSettingSidebarEnableDesc'),
          label: t('settingQuickSettingSidebarEnable'),
          name: 'enableSidebar',
          valuePropName: 'checked',
        },
        {
          children: <Switch />,
          desc: t('settingQuickSettingSidebarDefaultExpandDesc'),
          hidden: !rawSetting.enableSidebar,
          label: t('settingQuickSettingSidebarDefaultExpand'),
          name: 'sidebarExpand',
          valuePropName: 'checked',
        },
        {
          children: (
            <Segmented
              options={[
                {
                  label: t('fixed'),
                  value: 'fixed',
                },
                {
                  label: t('float'),
                  value: 'float',
                },
              ]}
            />
          ),
          desc: t('settingQuickSettingSidebarDisplayModeDesc'),
          hidden: !rawSetting.enableSidebar,
          label: t('settingQuickSettingSidebarDisplayMode'),
          name: 'sidebarFixedMode',
        },
        {
          children: <InputNumber />,
          desc: t('settingQuickSettingSidebarDefaultWidthDesc'),
          hidden: !rawSetting.enableSidebar,
          label: t('settingQuickSettingSidebarDefaultWidth'),
          name: 'sidebarWidth',
        },
      ],
      icon: PanelLeftClose,
      title: t('settingGroupQuickSettingSidebar'),
    }),
    [rawSetting.enableSidebar],
  );

  const extraNetworkSidebar: SettingItemGroup = useMemo(
    () => ({
      children: [
        {
          children: <Switch />,
          desc: t('settingExtraNetworkSidebarEnableDesc'),
          label: t('settingExtraNetworkSidebarEnable'),
          name: 'enableExtraNetworkSidebar',
          valuePropName: 'checked',
        },
        {
          children: (
            <Segmented
              options={[
                {
                  label: t('fixed'),
                  value: 'fixed',
                },
                {
                  label: t('float'),
                  value: 'float',
                },
              ]}
            />
          ),
          desc: t('settingExtraNetworkSidebarDisplayModeDesc'),
          hidden: !rawSetting.enableExtraNetworkSidebar,
          label: t('settingExtraNetworkSidebarDisplayMode'),
          name: 'extraNetworkFixedMode',
        },
        {
          children: <Switch />,
          desc: t('settingExtraNetworkSidebarDefaultExpandDesc'),
          hidden: !rawSetting.enableExtraNetworkSidebar,
          label: t('settingExtraNetworkSidebarDefaultExpand'),
          name: 'extraNetworkSidebarExpand',
          valuePropName: 'checked',
        },
        {
          children: <InputNumber />,
          desc: t('settingExtraNetworkSidebarDefaultWidthDesc'),
          hidden: !rawSetting.enableExtraNetworkSidebar,
          label: t('settingExtraNetworkSidebarDefaultWidth'),
          name: 'extraNetworkSidebarWidth',
        },
        {
          children: <InputNumber />,
          desc: t('settingExtraNetworkSidebarDefaultCardSizeDesc'),
          hidden: !rawSetting.enableExtraNetworkSidebar,
          label: t('settingExtraNetworkSidebarDefaultCardSize'),
          name: 'extraNetworkCardSize',
        },
      ],
      icon: PanelRightClose,
      title: t('settingGroupExtraNetworkSidebar'),
    }),
    [rawSetting.enableExtraNetworkSidebar],
  );

  return (
    <Form
      className={styles}
      footer={
        <>
          <Button htmlType="button" onClick={onReset} style={{ borderRadius: 4 }}>
            {t('settingButtonReset')}
          </Button>
          <Button htmlType="submit" style={{ borderRadius: 4 }} type="primary">
            {t('settingButtonSubmit')}
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
