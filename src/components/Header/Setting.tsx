import { WebuiSetting, defaultSetting, useAppStore } from '@/store'
import { SettingOutlined } from '@ant-design/icons'
import { Button, Divider, Form, InputNumber, Popover, Space, Switch } from 'antd'
import React, { useCallback } from 'react'
import styled from 'styled-components'
import { shallow } from 'zustand/shallow'

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
`

const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
`

const SubTitle = styled.div`
  margin-bottom: 4px;
  font-size: 14px;
  font-weight: 500;
`

/******************************************************
 ************************* Dom *************************
 ******************************************************/

const Setting: React.FC = () => {
  const [setting, setSetting] = useAppStore((st) => [st.setting, st.onSetSetting], shallow)

  const onReset = useCallback(() => {
    setSetting(defaultSetting)
    gradioApp().getElementById('settings_restart_gradio')?.click()
  }, [])

  const onFinish = useCallback((value: WebuiSetting) => {
    setSetting(value)
    gradioApp().getElementById('settings_restart_gradio')?.click()
  }, [])

  return (
    <Popover
      title={<Title>⚙ Setting</Title>}
      trigger="click"
      content={
        <Form size="small" initialValues={setting} layout="horizontal" onFinish={onFinish} style={{ maxWidth: 240 }}>
          <Divider style={{ margin: '4px 0 8px' }} />
          <SubTitle>Sidebar</SubTitle>
          <FormItem label="Default expand" name="sidebarExpand" valuePropName="checked">
            <Switch />
          </FormItem>
          <FormItem label="Default width" name="sidebarWidth">
            <InputNumber />
          </FormItem>
          <Divider style={{ margin: '4px 0 8px' }} />
          <SubTitle>ExtraNetwork Sidebar</SubTitle>
          <FormItem label="Enable" name="enableExtraNetworkSidebar" valuePropName="checked">
            <Switch />
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
          <Divider style={{ margin: '4px 0 16px' }} />
          <FormItem>
            <Space>
              <Button htmlType="button" onClick={onReset} style={{ borderRadius: 4 }}>
                Reset
              </Button>
              <Button type="primary" htmlType="submit" style={{ borderRadius: 4 }}>
                Apply and restart UI
              </Button>
            </Space>
          </FormItem>
        </Form>
      }
    >
      <Button title="Setting" icon={<SettingOutlined />} />
    </Popover>
  )
}

export default React.memo(Setting)
