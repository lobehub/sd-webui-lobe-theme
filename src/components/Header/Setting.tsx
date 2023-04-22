import { SettingOutlined } from '@ant-design/icons'
import { useLocalStorageState } from 'ahooks'
import { Button, Form, InputNumber, Popover, Space, Switch } from 'antd'
import React from 'react'

export interface WebuiSetting {
  sidebarWidth: number
  enableExtraNetworkSidebar: boolean
  extraNetworkSidebarWidth: number
  extraNetworkCardSize: number
}

export const defaultValue = {
  sidebarWidth: 280,
  enableExtraNetworkSidebar: true,
  extraNetworkSidebarWidth: 340,
  extraNetworkCardSize: 86,
}

const Setting: React.FC = () => {
  const [form] = Form.useForm()
  const [setting, setSetting] = useLocalStorageState<WebuiSetting>('SD-KITCHEN-SETTING', {
    defaultValue,
  })

  const onReset = () => {
    form.setFieldsValue(defaultValue)
  }

  const onFinish = (value: WebuiSetting) => {
    setSetting(value)
    gradioApp().getElementById('settings_restart_gradio')?.click()
  }

  return (
    <Popover
      title="⚙ Setting"
      trigger="click"
      content={
        <Form size="small" initialValues={setting} layout="vertical" onFinish={onFinish} style={{ maxWidth: 240 }}>
          <Form.Item label="Sidebar default width" name="sidebarWidth">
            <InputNumber />
          </Form.Item>
          <Form.Item label="Enable ExtraNetwork sidebar" name="enableExtraNetworkSidebar" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item label="ExtraNetwork sidebar default width" name="extraNetworkSidebarWidth">
            <InputNumber />
          </Form.Item>
          <Form.Item label="ExtraNetwork default card size" name="extraNetworkCardSize">
            <InputNumber />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button htmlType="button" onClick={onReset} style={{ borderRadius: 4 }}>
                Reset
              </Button>
              <Button type="primary" htmlType="submit" style={{ borderRadius: 4 }}>
                Apply and restart UI
              </Button>
            </Space>
          </Form.Item>
        </Form>
      }
    >
      <Button title="Setting" icon={<SettingOutlined />} />
    </Popover>
  )
}

export default React.memo(Setting)
