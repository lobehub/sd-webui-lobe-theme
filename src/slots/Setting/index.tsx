import { Swatches } from '@lobehub/ui';
import { Button, Divider, Form, InputNumber, Segmented, Space, Switch } from 'antd';
import isEqual from 'fast-deep-equal';
import { memo, useCallback, useState } from 'react';
import { shallow } from 'zustand/shallow';

import { PrimaryColor, WebuiSetting, defaultSetting, useAppStore } from '@/store';

import { useStyles } from './style';

const { Item } = Form;

const findKey = (
  object: { [key in PrimaryColor]: string },
  value: string,
): PrimaryColor | undefined => {
  const res: { [key: string]: PrimaryColor } = {};
  for (const key of Object.keys(object)) {
    // @ts-ignore
    res[object[key]] = key;
  }
  return res[value];
};

const Setting = memo(() => {
  const setting = useAppStore((st) => st.setting, isEqual);
  const [activeColor, setActiveColor] = useState<PrimaryColor | undefined>(
    setting.primaryColor || undefined,
  );
  const onSetSetting = useAppStore((st) => st.onSetSetting, shallow);
  const { styles, theme } = useStyles();

  const colors = {
    blue: theme.blue,
    cyan: theme.cyan,
    geekblue: theme.geekblue,
    gold: theme.gold,
    green: theme.green,
    lime: theme.lime,
    magenta: theme.magenta,
    orange: theme.orange,
    purple: theme.purple,
    red: theme.red,
    volcano: theme.volcano,
    yellow: theme.yellow,
  };

  const onReset = useCallback(() => {
    onSetSetting(defaultSetting);
    (gradioApp().querySelector('#settings_restart_gradio') as HTMLButtonElement)?.click();
  }, []);

  const onFinish = useCallback(
    (value: WebuiSetting) => {
      onSetSetting({ ...value, primaryColor: activeColor });
      (gradioApp().querySelector('#settings_restart_gradio') as HTMLButtonElement)?.click();
    },
    [activeColor],
  );

  // @ts-ignore
  return (
    <Form
      initialValues={setting}
      layout="horizontal"
      onChange={console.log}
      onFinish={onFinish}
      size="small"
      style={{ maxWidth: 400 }}
    >
      <Divider style={{ margin: '4px 0 8px' }} />
      <div className={styles.title}>Promot Textarea</div>
      <Item className={styles.item} label="Display mode" name="promotTextarea">
        <Segmented options={['scroll', 'resizable']} />
      </Item>
      <Divider style={{ margin: '4px 0 8px' }} />
      <div className={styles.title}>Sidebar</div>
      <Item
        className={styles.item}
        label="Default expand"
        name="sidebarExpand"
        valuePropName="checked"
      >
        <Switch />
      </Item>
      <Item className={styles.item} label="Display mode" name="sidebarFixedMode">
        <Segmented options={['fixed', 'float']} />
      </Item>
      <Item className={styles.item} label="Default width" name="sidebarWidth">
        <InputNumber />
      </Item>
      <Divider style={{ margin: '4px 0 8px' }} />
      <div className={styles.title}>ExtraNetwork Sidebar</div>
      <Item
        className={styles.item}
        label="Enable"
        name="enableExtraNetworkSidebar"
        valuePropName="checked"
      >
        <Switch />
      </Item>
      <Item className={styles.item} label="Display mode" name="extraNetworkFixedMode">
        <Segmented options={['fixed', 'float']} />
      </Item>
      <Item
        className={styles.item}
        label="Default expand"
        name="extraNetworkSidebarExpand"
        valuePropName="checked"
      >
        <Switch />
      </Item>
      <Item className={styles.item} label="Default width" name="extraNetworkSidebarWidth">
        <InputNumber />
      </Item>
      <Item className={styles.item} label="Default card size" name="extraNetworkCardSize">
        <InputNumber />
      </Item>
      <Divider style={{ margin: '4px 0 8px' }} />
      <div className={styles.title}>Theme</div>
      <Item className={styles.item} label="Use svg icons" name="svgIcon" valuePropName="checked">
        <Switch />
      </Item>
      <Item className={styles.item} label="Primary color">
        <Swatches
          activeColor={activeColor ? colors[activeColor] : undefined}
          colors={[
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
          onSelect={(c) => setActiveColor(c ? findKey(colors, c) : undefined)}
        />
      </Item>
      <Divider style={{ margin: '4px 0 16px' }} />
      <Item className={styles.item}>
        <Space>
          <Button htmlType="button" onClick={onReset} style={{ borderRadius: 4 }}>
            Reset
          </Button>
          <Button htmlType="submit" style={{ borderRadius: 4 }} type="primary">
            Apply and restart UI
          </Button>
        </Space>
      </Item>
    </Form>
  );
});

export default Setting;
