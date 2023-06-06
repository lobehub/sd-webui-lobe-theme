import { SettingOutlined } from '@ant-design/icons';
import { Button, Divider, Form, InputNumber, Popover, Segmented, Space, Switch } from 'antd';
import React, { useCallback } from 'react';
import styled from 'styled-components';
import { shallow } from 'zustand/shallow';

import { WebuiSetting, defaultSetting, useAppStore } from '@/store';

/******************************************************
 *********************** Style *************************
 ******************************************************/

const FormItem = styled(Form.Item)`
  margin-bottom: 8px;

  .ant-row {
    justify-content: space-between;

    > div {
      flex: unset !important;
      flex-grow: unset !important;
    }
  }
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

const SubTitle = styled.div`
  margin-bottom: 4px;
  font-size: 14px;
  font-weight: 500;
`;

/******************************************************
 ************************* Dom *************************
 ******************************************************/

const Setting: React.FC = () => {
  const [setting, onSetSetting] = useAppStore((st) => [st.setting, st.onSetSetting], shallow);

  const onReset = useCallback(() => {
    onSetSetting(defaultSetting);
    gradioApp().getElementById('settings_restart_gradio')?.click();
  }, []);

  const onFinish = useCallback((value: WebuiSetting) => {
    onSetSetting(value);
    gradioApp().getElementById('settings_restart_gradio')?.click();
  }, []);

  return (
    <Popover
      content={
        <Form
          initialValues={setting}
          layout="horizontal"
          onFinish={onFinish}
          size="small"
          style={{ maxWidth: 260 }}
        >
          <Divider style={{ margin: '4px 0 8px' }} />
          <SubTitle>Promot Textarea</SubTitle>
          <FormItem label="Display mode" name="promotTextarea">
            <Segmented options={['scroll', 'resizable']} />
          </FormItem>
          <Divider style={{ margin: '4px 0 8px' }} />
          <SubTitle>Sidebar</SubTitle>
          <FormItem label="Default expand" name="sidebarExpand" valuePropName="checked">
            <Switch />
          </FormItem>
          <FormItem label="Display mode" name="sidebarFixedMode">
            <Segmented options={['fixed', 'float']} />
          </FormItem>
          <FormItem label="Default width" name="sidebarWidth">
            <InputNumber />
          </FormItem>
          <Divider style={{ margin: '4px 0 8px' }} />
          <SubTitle>ExtraNetwork Sidebar</SubTitle>
          <FormItem label="Enable" name="enableExtraNetworkSidebar" valuePropName="checked">
            <Switch />
          </FormItem>
          <FormItem label="Display mode" name="extraNetworkFixedMode" valuePropName="checked">
            <Segmented options={['fixed', 'float']} />
          </FormItem>
          <FormItem label="Default expand" name="extraNetworkSidebarExpand" valuePropName="checked">
            <Switch />
          </FormItem>
          <FormItem label="Default width" name="extraNetworkSidebarWidth">
            <InputNumber />
          </FormItem>
          <FormItem label="Default card size" name="extraNetworkCardSize">
            <InputNumber />
          </FormItem>
          <Divider style={{ margin: '4px 0 8px' }} />
          <SubTitle>Other</SubTitle>
          <FormItem label="Use svg icons" name="svgIcon" valuePropName="checked">
            <Switch />
          </FormItem>
          <Divider style={{ margin: '4px 0 16px' }} />
          <FormItem>
            <Space>
              <Button htmlType="button" onClick={onReset} style={{ borderRadius: 4 }}>
                Reset
              </Button>
              <Button htmlType="submit" style={{ borderRadius: 4 }} type="primary">
                Apply and restart UI
              </Button>
            </Space>
          </FormItem>
        </Form>
      }
      title={<Title>⚙ Setting</Title>}
      trigger="click"
    >
      <Button icon={<SettingOutlined />} title="Setting" />
    </Popover>
  );
};

export default React.memo(Setting);
