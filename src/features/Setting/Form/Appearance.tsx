import { Form, Swatches } from '@lobehub/ui';
import { Input, Segmented, Select, Switch } from 'antd';
import isEqual from 'fast-deep-equal';
import { Palette } from 'lucide-react';
import { memo, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CustomLogo } from '@/components';
import { type WebuiSetting, selectors, useAppStore } from '@/store';

import {
  type NeutralColor,
  type PrimaryColor,
  findCustomThemeName,
  neutralColors,
  neutralColorsSwatches,
  primaryColors,
  primaryColorsSwatches,
} from './data';
import { SettingItemGroup } from './types';

const SettingForm = memo(() => {
  const setting = useAppStore(selectors.currentSetting, isEqual);
  const { onSetSetting, localeOptions } = useAppStore((st) => ({
    localeOptions: st.localeOptions,
    onSetSetting: st.onSetSetting,
  }));
  const [rawSetting, setRawSetting] = useState<WebuiSetting>(setting);
  const [primaryColor, setPrimaryColor] = useState<PrimaryColor | undefined>(
    setting.primaryColor || undefined,
  );
  const [neutralColor, setNeutralColor] = useState<NeutralColor | undefined>(
    setting.neutralColor || undefined,
  );

  const { t } = useTranslation();

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

  return (
    <Form
      initialValues={setting}
      items={[theme]}
      onFinish={onFinish}
      onValuesChange={(_, v) => setRawSetting(v)}
      style={{ flex: 1 }}
    />
  );
});

export default SettingForm;
