import { ActionIcon } from '@lobehub/ui';
import { Space, Tag } from 'antd';
import { Book } from 'lucide-react';
import { memo } from 'react';

import { homepage, version } from '@/../package.json';
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
        <>
          <a href={homepage} rel="noreferrer" target="_blank">
            <ActionIcon icon={Book} title="Setting Documents" />
          </a>
          <Space>
            Theme Setting
            <Tag color="success">v{version}</Tag>
          </Space>
        </>
      }
    >
      <SettingForm />
    </Modal>
  );
});

export default Setting;
