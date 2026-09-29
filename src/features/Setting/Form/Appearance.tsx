import { Form, Swatches } from '@lobehub/ui';
import { Button, ColorPicker, Input, Segmented, Select, Switch } from 'antd';
import isEqual from 'fast-deep-equal';
import { memo, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { CustomLogo } from '@/components';
import { type WebuiSetting, selectors, useAppStore } from '@/store';
import { fontOptions } from '@/styles/appearance';

import { isHexColor } from '@/styles/colorScale';

import {
  type NeutralColor,
  type PrimaryColor,
  findCustomThemeName,
  neutralColorsSwatches,
  primaryColorsSwatches,
  settingColor,
} from './data';
import LayoutPresetPicker from './LayoutPresetPicker';
import { SettingItemGroup } from './types';

interface ColorChooserProps {
  onChange: (value?: string) => void;
  type: 'primary' | 'neutral';
  value?: string;
}

/** Preset swatches, plus a picker for any other colour. */
const ColorChooser = memo<ColorChooserProps>(({ type, value, onChange }) => {
  const { t } = useTranslation();
  const shown = settingColor(type, value);
  return (
    <Flexbox align={'flex-end'} gap={10} style={{ maxWidth: 380 }}>
      <Flexbox horizontal justify={'flex-end'} wrap={'wrap'}>
        <Swatches
          activeColor={shown}
          colors={type === 'primary' ? primaryColorsSwatches : neutralColorsSwatches}
          onSelect={(c) => onChange(findCustomThemeName(type, c))}
          size={22}
        />
      </Flexbox>
      <Flexbox align={'center'} gap={8} horizontal>
        <ColorPicker
          disabledAlpha
          onChangeComplete={(color) => onChange(color.toHexString())}
          showText={() => t('setting.customColor')}
          size={'small'}
          value={isHexColor(value) ? value : shown || '#888888'}
        />
        {value && (
          <Button onClick={() => onChange(undefined)} size={'small'} type={'text'}>
            {t('setting.resetColor')}
          </Button>
        )}
      </Flexbox>
    </Flexbox>
  );
});

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
          children: <LayoutPresetPicker />,
          desc: t('setting.layoutPreset.desc'),
          label: t('setting.layoutPreset.title'),
          name: 'layoutPreset',
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
            <ColorChooser onChange={setPrimaryColor} type={'primary'} value={primaryColor} />
          ),
          desc: t('setting.primaryColor.desc'),
          label: t('setting.primaryColor.title'),
        },
        {
          children: (
            <ColorChooser onChange={setNeutralColor} type={'neutral'} value={neutralColor} />
          ),
          desc: t('setting.neutralColor.desc'),
          label: t('setting.neutralColor.title'),
        },
        {
          children: (
            <Segmented
              options={[
                { label: t('setting.cornerStyle.sharp'), value: 'sharp' },
                { label: t('setting.cornerStyle.soft'), value: 'soft' },
                { label: t('setting.cornerStyle.round'), value: 'round' },
              ]}
            />
          ),
          desc: t('setting.cornerStyle.desc'),
          label: t('setting.cornerStyle.title'),
          name: 'cornerStyle',
        },
        {
          children: (
            <Segmented
              options={[
                { label: t('setting.density.comfortable'), value: 'comfortable' },
                { label: t('setting.density.compact'), value: 'compact' },
              ]}
            />
          ),
          desc: t('setting.density.desc'),
          label: t('setting.density.title'),
          name: 'density',
        },
        {
          children: (
            <Segmented
              options={[
                { label: t('setting.surfaceStyle.flat'), value: 'flat' },
                { label: t('setting.surfaceStyle.glass'), value: 'glass' },
                { label: t('setting.surfaceStyle.elevated'), value: 'elevated' },
              ]}
            />
          ),
          desc: t('setting.surfaceStyle.desc'),
          label: t('setting.surfaceStyle.title'),
          name: 'surfaceStyle',
        },
        {
          children: (
            <Segmented
              options={[
                { label: t('setting.progressBarStyle.classic'), value: 'classic' },
                { label: t('setting.progressBarStyle.aurora'), value: 'aurora' },
              ]}
            />
          ),
          desc: t('setting.progressBarStyle.desc'),
          label: t('setting.progressBarStyle.title'),
          name: 'progressBarStyle',
        },
        {
          children: (
            <Select
              options={(['off', 'glow', 'pulse', 'ambient', 'scan', 'orbit'] as const).map((value) => ({
                label: t(`setting.resultFrameStyle.${value}` as any) as string,
                value,
              }))}
              style={{ minWidth: 200 }}
            />
          ),
          desc: t('setting.resultFrameStyle.desc'),
          label: t('setting.resultFrameStyle.title'),
          name: 'resultFrameStyle',
        },
        {
          children: (
            <Select
              options={fontOptions(false).map(([value, f]) => ({
                label: <span style={{ fontFamily: f.family }}>{f.label}</span>,
                value,
              }))}
              style={{ minWidth: 200 }}
            />
          ),
          desc: t('setting.fontFamily.desc'),
          label: t('setting.fontFamily.title'),
          name: 'fontFamily',
        },
        {
          children: (
            <Select
              options={fontOptions(true).map(([value, f]) => ({
                label: <span style={{ fontFamily: f.family }}>{f.label}</span>,
                value,
              }))}
              style={{ minWidth: 200 }}
            />
          ),
          desc: t('setting.fontMono.desc'),
          label: t('setting.fontMono.title'),
          name: 'fontMono',
        },
        {
          children: (
            <Select
              options={[
                { label: t('brand.lobe'), value: 'lobe' },
                { label: t('brand.kitchen'), value: 'kitchen' },
                { label: t('brand.mark'), value: 'mark' },
                { label: t('brand.wordmark'), value: 'wordmark' },
                { label: t('brand.custom'), value: 'custom' },
                { label: t('brand.none'), value: 'none' },
              ]}
              style={{ minWidth: 200 }}
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
      id="theme_settings"
      initialValues={setting}
      items={[theme]}
      onFinish={onFinish}
      onValuesChange={(_, v) => setRawSetting(v)}
      style={{ flex: 1 }}
      variant={'pure'}
    />
  );
});

export default SettingForm;
