import { Icon } from '@lobehub/ui';
import { Space, Tag } from 'antd';
import { Settings } from 'lucide-react';
import { memo } from 'react';

import { version } from '@/../package.json';
import { Modal, type ModalProps } from '@/components';

import SettingForm from './SettingForm';

interface SettingProps {
  onCancel?: ModalProps['onCancel'];
  open?: ModalProps['open'];
}

const Setting = memo<SettingProps>(({ open, onCancel }) => {
  return (
    <Modal
      okText={'Save and Refresh'}
      onCancel={onCancel}
      open={open}
      title={
        <Space>
          <Icon icon={Settings} />
          Theme Setting
          <Tag color="success">v{version}</Tag>
        </Space>
      }
    >
      <SettingForm />
    </Modal>
  );
});

export default Setting;
