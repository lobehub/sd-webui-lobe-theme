import { ActionIcon } from '@lobehub/ui';
import { Space } from 'antd';
import { Book } from 'lucide-react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { homepage } from '@/../package.json';
import { Modal, type ModalProps } from '@/components';
import VersionTag from '@/components/VersionTag';

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
            <VersionTag />
          </Space>
        </>
      }
    >
      <SettingForm />
    </Modal>
  );
});

export default Setting;
