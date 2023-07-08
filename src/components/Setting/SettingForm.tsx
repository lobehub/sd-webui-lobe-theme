import { Form, type FormItemProps, FormProps, Swatches } from '@lobehub/ui';
import { Button, Input, InputNumber, Segmented, Select, Switch } from 'antd';
import isEqual from 'fast-deep-equal';
import { Layout, Palette, PanelLeftClose, PanelRightClose, TextCursorInput } from 'lucide-react';
import { memo, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { shallow } from 'zustand/shallow';

import { CustomLogo } from '@/components';
import { I18nOptions } from '@/i18n';
import { NeutralColor, PrimaryColor, WebuiSetting, defaultSetting, useAppStore } from '@/store';

import { colors, findKey, neutralColors, primaryColors } from './data';
import { useStyles } from './style';

const SettingForm = memo(() => {
  const setting = useAppStore((st) => st.setting, isEqual);
  const { onSetSetting } = useAppStore(
    (st) => ({ onSetSetting: st.onSetSetting, themeMode: st.themeMode }),
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
    onSetSetting(defaultSetting);
    location.reload();
  }, []);

  const onFinish = useCallback(
    (value: WebuiSetting) => {
      onSetSetting({ ...value, neutralColor, primaryColor });
      location.reload();
    },
    [primaryColor, neutralColor],
  );

  const items: FormProps['items'] = useMemo(
    () => [
      {
        children: [
          {
            children: <Select options={I18nOptions} />,
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
                activeColor={primaryColor ? colors[primaryColor] : undefined}
                colors={primaryColors}
                onSelect={(c) => setPrimaryColor(c ? findKey(colors, c) : undefined)}
              />
            ),
            desc: t('settingPrimaryColorDesc'),
            label: t('settingPrimaryColor'),
          },
          {
            children: (
              <Swatches
                activeColor={neutralColor ? neutralColors[neutralColor] : undefined}
                colors={Object.values(neutralColors)}
                onSelect={(c) => setNeutralColor(c ? findKey(neutralColors, c) : undefined)}
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
          rawSetting.logoType === 'custom' && {
            children: <Input />,
            desc: t('settingCustomLogoDesc'),
            divider: false,
            label: t('settingCustomLogo'),
            name: 'logoCustomUrl',
          },
          rawSetting.logoType === 'custom' && {
            children: <Input />,
            desc: t('settingCustomTitleDesc'),
            divider: false,
            label: t('settingCustomTitle'),
            name: 'logoCustomTitle',
          },
          rawSetting.logoType === 'custom' && {
            children: (
              <CustomLogo
                logoCustomTitle={rawSetting.logoCustomTitle}
                logoCustomUrl={rawSetting.logoCustomUrl}
              />
            ),
            divider: false,
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
        ].filter(Boolean) as FormItemProps[],
        icon: Palette,
        title: t('settingGroupTheme'),
      },
      {
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
            name: 'promotTextarea',
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
        title: t('settingGroupPromotTextarea'),
      },
      {
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
      },
      {
        children: [
          {
            children: <Switch />,
            desc: t('settingQuickSettingSidebarEnableDesc'),
            label: t('settingQuickSettingSidebarEnable'),
            name: 'enableSidebar',
            valuePropName: 'checked',
          },
          rawSetting.enableSidebar && {
            children: <Switch />,
            desc: t('settingQuickSettingSidebarDefaultExpandDesc'),
            label: t('settingQuickSettingSidebarDefaultExpand'),
            name: 'sidebarExpand',
            valuePropName: 'checked',
          },
          rawSetting.enableSidebar && {
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
            label: t('settingQuickSettingSidebarDisplayMode'),
            name: 'sidebarFixedMode',
          },
          rawSetting.enableSidebar && {
            children: <InputNumber />,
            desc: t('settingQuickSettingSidebarDefaultWidthDesc'),
            label: t('settingQuickSettingSidebarDefaultWidth'),
            name: 'sidebarWidth',
          },
        ].filter(Boolean) as FormItemProps[],
        icon: PanelLeftClose,
        title: t('settingGroupQuickSettingSidebar'),
      },
      {
        children: [
          {
            children: <Switch />,
            desc: t('settingExtraNetworkSidebarEnableDesc'),
            label: t('settingExtraNetworkSidebarEnable'),
            name: 'enableExtraNetworkSidebar',
            valuePropName: 'checked',
          },
          rawSetting.enableExtraNetworkSidebar && {
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
            label: t('settingExtraNetworkSidebarDisplayMode'),
            name: 'extraNetworkFixedMode',
          },
          rawSetting.enableExtraNetworkSidebar && {
            children: <Switch />,
            desc: t('settingExtraNetworkSidebarDefaultExpandDesc'),
            label: t('settingExtraNetworkSidebarDefaultExpand'),
            name: 'extraNetworkSidebarExpand',
            valuePropName: 'checked',
          },
          rawSetting.enableExtraNetworkSidebar && {
            children: <InputNumber />,
            desc: t('settingExtraNetworkSidebarDefaultWidthDesc'),
            label: t('settingExtraNetworkSidebarDefaultWidth'),
            name: 'extraNetworkSidebarWidth',
          },
          rawSetting.enableExtraNetworkSidebar && {
            children: <InputNumber />,
            desc: t('settingExtraNetworkSidebarDefaultCardSizeDesc'),
            label: t('settingExtraNetworkSidebarDefaultCardSize'),
            name: 'extraNetworkCardSize',
          },
        ].filter(Boolean) as FormItemProps[],
        icon: PanelRightClose,
        title: t('settingGroupExtraNetworkSidebar'),
      },
    ],
    [
      rawSetting.logoType,
      rawSetting.enableExtraNetworkSidebar,
      rawSetting.enableSidebar,
      rawSetting.logoCustomTitle,
      rawSetting.logoCustomTitle,
      primaryColor,
      neutralColor,
    ],
  );

  return (
    <Form
      className={styles}
      footer={
        <>
          <Button htmlType="button" onClick={onReset} style={{ borderRadius: 4 }}>
            {t('settingButtomReset')}
          </Button>
          <Button htmlType="submit" style={{ borderRadius: 4 }} type="primary">
            {t('settingButtomSubmit')}
          </Button>
        </>
      }
      initialValues={setting}
      items={items}
      onFinish={onFinish}
      onValuesChange={(_, v) => setRawSetting(v)}
    />
  );
});

export default SettingForm;
