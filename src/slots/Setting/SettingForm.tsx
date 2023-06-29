import { Swatches } from '@lobehub/ui';
import { Button, Form, Input, InputNumber, Segmented, Select, Switch } from 'antd';
import isEqual from 'fast-deep-equal';
import { Layout, Palette, PanelLeftClose, PanelRightClose, TextCursorInput } from 'lucide-react';
import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { shallow } from 'zustand/shallow';

import { CustomLogo } from '@/components';
import { i18nOptions } from '@/i18n';
import { NeutralColor, PrimaryColor, WebuiSetting, defaultSetting, useAppStore } from '@/store';

import FormGroup from './FormGroup';
import FormItem from './FormItem';
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

  return (
    <Form
      className={styles.form}
      colon={false}
      initialValues={setting}
      layout="horizontal"
      onFinish={onFinish}
      onValuesChange={(_, v) => setRawSetting(v)}
    >
      <FormGroup icon={Palette} title={t('settingGroupTheme')}>
        <FormItem desc={t('settingLanguageDesc')} label={t('settingLanguage')} name="i18n">
          <Select options={i18nOptions} />
        </FormItem>
        <FormItem
          desc={t('settingReduceAnimationDesc')}
          divider
          label={t('settingReduceAnimation')}
          name="liteAnimation"
          valuePropName="checked"
        >
          <Switch />
        </FormItem>
        <FormItem desc={t('settingPrimaryColorDesc')} divider label={t('settingPrimaryColor')}>
          <Swatches
            activeColor={primaryColor ? colors[primaryColor] : undefined}
            colors={primaryColors}
            onSelect={(c) => setPrimaryColor(c ? findKey(colors, c) : undefined)}
          />
        </FormItem>
        <FormItem desc={t('settingNeutralColorDesc')} divider label={t('settingNeutralColor')}>
          <Swatches
            activeColor={neutralColor ? neutralColors[neutralColor] : undefined}
            colors={Object.values(neutralColors)}
            onSelect={(c) => setNeutralColor(c ? findKey(neutralColors, c) : undefined)}
          />
        </FormItem>
        <FormItem
          desc={t('settingLogoTypeDesc')}
          divider
          label={t('settingLogoType')}
          name="logoType"
        >
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
        </FormItem>
        {rawSetting.logoType === 'custom' && (
          <>
            <FormItem
              desc={t('settingCustomLogoDesc')}
              label={t('settingCustomLogo')}
              name="logoCustomUrl"
            >
              <Input />
            </FormItem>
            <FormItem
              desc={t('settingCustomTitleDesc')}
              label={t('settingCustomTitle')}
              name="logoCustomTitle"
            >
              <Input />
            </FormItem>
            <FormItem label={t('settingLogoPreview')}>
              <CustomLogo
                logoCustomTitle={rawSetting.logoCustomTitle}
                logoCustomUrl={rawSetting.logoCustomUrl}
              />
            </FormItem>
          </>
        )}
        <FormItem
          desc={t('settingSvgIconsDesc')}
          divider
          label={t('settingSvgIcons')}
          name="svgIcon"
          valuePropName="checked"
        >
          <Switch />
        </FormItem>
      </FormGroup>
      <FormGroup icon={TextCursorInput} title={t('settingGroupPromotTextarea')}>
        <FormItem
          desc={t('settingPromptDisplayModeDesc')}
          label={t('settingPromptDisplayMode')}
          name="promotTextarea"
        >
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
        </FormItem>
        <FormItem
          desc={t('settingPromptEditorDesc')}
          divider
          label={t('settingPromptEditor')}
          name="promptEditor"
          valuePropName="checked"
        >
          <Switch />
        </FormItem>
      </FormGroup>
      <FormGroup icon={Layout} title={t('settingGroupLayout')}>
        <FormItem
          desc={t('settingSplitPreviewerDesc')}
          label={t('settingSplitPreviewer')}
          name="layoutSplitPreview"
          valuePropName="checked"
        >
          <Switch />
        </FormItem>
        <FormItem
          desc={t('settingHideFooterDesc')}
          divider
          label={t('settingHideFooter')}
          name="layoutHideFooter"
          valuePropName="checked"
        >
          <Switch />
        </FormItem>
      </FormGroup>
      <FormGroup icon={PanelLeftClose} title={t('settingGroupQuickSettingSidebar')}>
        <FormItem
          desc={t('settingQuickSettingSidebarEnableDesc')}
          label={t('settingQuickSettingSidebarEnable')}
          name="enableSidebar"
          valuePropName="checked"
        >
          <Switch />
        </FormItem>
        {rawSetting.enableSidebar && (
          <>
            <FormItem
              desc={t('settingQuickSettingSidebarDefaultExpandDesc')}
              divider
              label={t('settingQuickSettingSidebarDefaultExpand')}
              name="sidebarExpand"
              valuePropName="checked"
            >
              <Switch />
            </FormItem>
            <FormItem
              desc={t('settingQuickSettingSidebarDisplayModeDesc')}
              divider
              label={t('settingQuickSettingSidebarDisplayMode')}
              name="sidebarFixedMode"
            >
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
            </FormItem>
            <FormItem
              desc={t('settingQuickSettingSidebarDefaultWidthDesc')}
              divider
              label={t('settingQuickSettingSidebarDefaultWidth')}
              name="sidebarWidth"
            >
              <InputNumber />
            </FormItem>
          </>
        )}
      </FormGroup>
      <FormGroup icon={PanelRightClose} title={t('settingGroupExtraNetworkSidebar')}>
        <FormItem
          desc={t('settingExtraNetworkSidebarEnableDesc')}
          label={t('settingExtraNetworkSidebarEnable')}
          name="enableExtraNetworkSidebar"
          valuePropName="checked"
        >
          <Switch />
        </FormItem>
        {rawSetting.enableExtraNetworkSidebar && (
          <>
            <FormItem
              desc={t('settingExtraNetworkSidebarDisplayModeDesc')}
              divider
              label={t('settingExtraNetworkSidebarDisplayMode')}
              name="extraNetworkFixedMode"
            >
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
            </FormItem>
            <FormItem
              desc={t('settingExtraNetworkSidebarDefaultExpandDesc')}
              divider
              label={t('settingExtraNetworkSidebarDefaultExpand')}
              name="extraNetworkSidebarExpand"
              valuePropName="checked"
            >
              <Switch />
            </FormItem>
            <FormItem
              desc={t('settingExtraNetworkSidebarDefaultWidthDesc')}
              divider
              label={t('settingExtraNetworkSidebarDefaultWidth')}
              name="extraNetworkSidebarWidth"
            >
              <InputNumber />
            </FormItem>
            <FormItem
              desc={t('settingExtraNetworkSidebarDefaultCardSizeDesc')}
              divider
              label={t('settingExtraNetworkSidebarDefaultCardSize')}
              name="extraNetworkCardSize"
            >
              <InputNumber />
            </FormItem>
          </>
        )}
      </FormGroup>
      <div className={styles.footer}>
        <Button htmlType="button" onClick={onReset} style={{ borderRadius: 4 }}>
          {t('settingButtomReset')}
        </Button>
        <Button htmlType="submit" style={{ borderRadius: 4 }} type="primary">
          {t('settingButtomSubmit')}
        </Button>
      </div>
    </Form>
  );
});

export default SettingForm;
