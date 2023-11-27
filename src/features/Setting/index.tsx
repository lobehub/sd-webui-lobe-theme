import { ActionIcon, Modal, type ModalProps } from '@lobehub/ui';
import { Space } from 'antd';
import { Book } from 'lucide-react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import VersionTag from '@/components/VersionTag';

import { homepage } from '../../../package.json';
import SettingForm from './SettingForm';

export interface SettingProps {
  onCancel?: ModalProps['onCancel'];
  open?: ModalProps['open'];
}

const Setting = memo<SettingProps>(({ open, onCancel }) => {
  const { t } = useTranslation();
  return (
    <Modal
      footer={false}
      onCancel={onCancel}
      open={open}
      title={
        <Flexbox align={'center'} gap={4} horizontal>
          <a href={homepage} rel="noreferrer" target="_blank">
            <ActionIcon icon={Book} title="Setting Documents" />
          </a>
          <Space>
            {t('modal.themeSetting.title')}
            <VersionTag />
          </Space>
        </Flexbox>
      }
    >
      <SettingForm />
    </Modal>
  );
});

export default Setting;
