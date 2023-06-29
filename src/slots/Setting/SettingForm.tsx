import { Icon, Swatches } from '@lobehub/ui';
import { Button, Divider, Form, Input, InputNumber, Segmented, Switch } from 'antd';
import isEqual from 'fast-deep-equal';
import { Layout, Palette, PanelLeftClose, PanelRightClose, TextCursorInput } from 'lucide-react';
import { memo, useCallback, useMemo, useState } from 'react';
import { shallow } from 'zustand/shallow';

import { CustomLogo } from '@/components';
import { NeutralColor, PrimaryColor, WebuiSetting, defaultSetting, useAppStore } from '@/store';
import { kitchenNeutral, kitchenPrimary } from '@/styles/kitchenColors';
import { neutralColorScales } from '@/styles/neutralColors';

import FormTitle from './FormTitle';
import { useStyles } from './style';

const { Item } = Form;

const findKey = (object: { [key in string]: string }, value: string): any => {
  const res: { [key: string]: PrimaryColor } = {};
  for (const key of Object.keys(object)) {
    // @ts-ignore
    res[object[key]] = key;
  }
  return res[value];
};

const SettingForm = memo(() => {
  const setting = useAppStore((st) => st.setting, isEqual);
  const { onSetSetting, themeMode } = useAppStore(
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

  const { styles, theme } = useStyles();

  const colors = useMemo(
    () => ({
      blue: theme.blue,
      cyan: theme.cyan,
      geekblue: theme.geekblue,
      gold: theme.gold,
      green: theme.green,
      kitchen: kitchenPrimary.light.colorPrimary,
      lime: theme.lime,
      magenta: theme.magenta,
      orange: theme.orange,
      purple: theme.purple,
      red: theme.red,
      volcano: theme.volcano,
      yellow: theme.yellow,
    }),
    [theme],
  );

  const neutralColors = useMemo(
    () => ({
      kitchen: kitchenNeutral[themeMode].colorNeutral,
      mauve: neutralColorScales.mauve[themeMode][9],
      olive: neutralColorScales.olive[themeMode][9],
      sage: neutralColorScales.sage[themeMode][9],
      sand: neutralColorScales.sand[themeMode][9],
      slate: neutralColorScales.slate[themeMode][9],
    }),
    [themeMode],
  );

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
      <div className={styles.group}>
        <div className={styles.title}>
          <Icon icon={TextCursorInput} />
          Promot Textarea
        </div>
        <Item
          className={styles.item}
          label={<FormTitle desc="Fixed height / Auto height" title="Display mode" />}
          name="promotTextarea"
        >
          <Segmented options={['scroll', 'resizable']} />
        </Item>
        <Divider style={{ margin: 0 }} />
        <Item
          className={styles.item}
          label={<FormTitle desc="Top in left sidebar" title="Prompt editor" />}
          name="promptEditor"
          valuePropName="checked"
        >
          <Switch />
        </Item>
      </div>
      <div className={styles.group}>
        <div className={styles.title}>
          <Icon icon={Layout} />
          Layout
        </div>
        <Item
          className={styles.item}
          label="Split Previewer"
          name="layoutSplitPreview"
          valuePropName="checked"
        >
          <Switch />
        </Item>
        <Divider style={{ margin: 0 }} />
        <Item
          className={styles.item}
          label="Hide Footer"
          name="layoutHideFooter"
          valuePropName="checked"
        >
          <Switch />
        </Item>
      </div>
      <div className={styles.group}>
        <div className={styles.title}>
          <Icon icon={PanelLeftClose} />
          QuickSetting Sidebar
        </div>
        <Item
          className={styles.item}
          label="Default expand"
          name="sidebarExpand"
          valuePropName="checked"
        >
          <Switch />
        </Item>
        <Divider style={{ margin: 0 }} />
        <Item className={styles.item} label="Display mode" name="sidebarFixedMode">
          <Segmented options={['fixed', 'float']} />
        </Item>
        <Divider style={{ margin: 0 }} />
        <Item className={styles.item} label="Default width" name="sidebarWidth">
          <InputNumber />
        </Item>
      </div>
      <div className={styles.group}>
        <div className={styles.title}>
          <Icon icon={PanelRightClose} />
          ExtraNetwork Sidebar
        </div>
        <Item
          className={styles.item}
          label="Enable"
          name="enableExtraNetworkSidebar"
          valuePropName="checked"
        >
          <Switch />
        </Item>
        <Divider style={{ margin: 0 }} />
        <Item className={styles.item} label="Display mode" name="extraNetworkFixedMode">
          <Segmented options={['fixed', 'float']} />
        </Item>
        <Divider style={{ margin: 0 }} />
        <Item
          className={styles.item}
          label="Default expand"
          name="extraNetworkSidebarExpand"
          valuePropName="checked"
        >
          <Switch />
        </Item>
        <Divider style={{ margin: 0 }} />
        <Item className={styles.item} label="Default width" name="extraNetworkSidebarWidth">
          <InputNumber />
        </Item>
        <Divider style={{ margin: 0 }} />
        <Item className={styles.item} label="Default card size" name="extraNetworkCardSize">
          <InputNumber />
        </Item>
      </div>
      <div className={styles.group}>
        <div className={styles.title}>
          <Icon icon={Palette} />
          Theme
        </div>
        <Item
          className={styles.item}
          label={<FormTitle desc="Save cpu usage" title="Remove animation" />}
          name="liteAnimation"
          valuePropName="checked"
        >
          <Switch />
        </Item>
        <Divider style={{ margin: 0 }} />
        <Item className={styles.item} label="Primary color">
          <Swatches
            activeColor={primaryColor ? colors[primaryColor] : undefined}
            colors={[
              kitchenPrimary.light.colorPrimary,
              theme.red,
              theme.orange,
              theme.gold,
              theme.yellow,
              theme.lime,
              theme.green,
              theme.cyan,
              theme.blue,
              theme.geekblue,
              theme.purple,
              theme.magenta,
              theme.volcano,
            ]}
            onSelect={(c) => setPrimaryColor(c ? findKey(colors, c) : undefined)}
          />
        </Item>
        <Divider style={{ margin: 0 }} />
        <Item className={styles.item} label="Neutral Color">
          <Swatches
            activeColor={neutralColor ? neutralColors[neutralColor] : undefined}
            colors={Object.values(neutralColors)}
            onSelect={(c) => setNeutralColor(c ? findKey(neutralColors, c) : undefined)}
          />
        </Item>
        <Divider style={{ margin: 0 }} />
        <Item className={styles.item} label="Logo type" name="logoType">
          <Segmented options={['lobe', 'kitchen', 'custom']} />
        </Item>
        {rawSetting.logoType === 'custom' && (
          <>
            <Item
              className={styles.item}
              label="Logo ( Url / Base64 / Emoji )"
              name="logoCustomUrl"
            >
              <Input />
            </Item>
            <Item className={styles.item} label="Title" name="logoCustomTitle">
              <Input />
            </Item>
            <Item className={styles.item} label="Preview">
              <CustomLogo
                logoCustomTitle={rawSetting.logoCustomTitle}
                logoCustomUrl={rawSetting.logoCustomUrl}
              />
            </Item>
          </>
        )}
        <Divider style={{ margin: 0 }} />
        <Item className={styles.item} label="Use svg icons" name="svgIcon" valuePropName="checked">
          <Switch />
        </Item>
      </div>
      <div className={styles.footer}>
        <Button htmlType="button" onClick={onReset} style={{ borderRadius: 4 }}>
          Reset
        </Button>
        <Button htmlType="submit" style={{ borderRadius: 4 }} type="primary">
          Apply and restart UI
        </Button>
      </div>
    </Form>
  );
});

export default SettingForm;
