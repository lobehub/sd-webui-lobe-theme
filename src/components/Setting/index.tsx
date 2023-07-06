import { ActionIcon } from '@lobehub/ui';
import { Space, Tag } from 'antd';
import { Book } from 'lucide-react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Modal, type ModalProps } from '@/components';

import { homepage, version } from '../../../package.json';
import SettingForm from './SettingForm';

export interface SettingProps {
  onCancel?: ModalProps['onCancel'];
  open?: ModalProps['open'];
}

const Setting = memo<SettingProps>(({ open, onCancel }) => {
  const { t } = useTranslation();
  return (
    <Modal
      onCancel={onCancel}
      open={open}
      title={
        <>
          <a href={homepage} rel="noreferrer" target="_blank">
            <ActionIcon icon={Book} title="Setting Documents" />
          </a>
          <Space>
            {t('themeSetting')}
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
