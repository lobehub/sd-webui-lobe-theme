import { Button, Divider, Form, InputNumber, Segmented, Space, Switch } from 'antd';
import isEqual from 'fast-deep-equal';
import { memo, useCallback } from 'react';
import { shallow } from 'zustand/shallow';

import { WebuiSetting, defaultSetting, useAppStore } from '@/store';

import { useStyles } from './style';

const { Item } = Form;

const Setting = memo(() => {
  const setting = useAppStore((st) => st.setting, isEqual);
  const onSetSetting = useAppStore((st) => st.onSetSetting, shallow);
  const { styles } = useStyles();

  const onReset = useCallback(() => {
    onSetSetting(defaultSetting);
    (gradioApp().querySelector('#settings_restart_gradio') as HTMLButtonElement)?.click();
  }, []);

  const onFinish = useCallback((value: WebuiSetting) => {
    onSetSetting(value);
    (gradioApp().querySelector('#settings_restart_gradio') as HTMLButtonElement)?.click();
  }, []);

  return (
    <Form
      initialValues={setting}
      layout="horizontal"
      onFinish={onFinish}
      size="small"
      style={{ maxWidth: 320 }}
    >
      <Divider style={{ margin: '4px 0 8px' }} />
      <title className={styles.title}>Promot Textarea</title>
      <Item className={styles.item} label="Display mode" name="promotTextarea">
        <Segmented options={['scroll', 'resizable']} />
      </Item>
      <Divider style={{ margin: '4px 0 8px' }} />
      <title className={styles.title}>Sidebar</title>
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
      <title className={styles.title}>ExtraNetwork Sidebar</title>
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
      <title className={styles.title}>Other</title>
      <Item className={styles.item} label="Use svg icons" name="svgIcon" valuePropName="checked">
        <Switch />
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
