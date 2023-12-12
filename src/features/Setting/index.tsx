import { ActionIcon, Modal, type ModalProps } from '@lobehub/ui';
import { Book } from 'lucide-react';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import VersionTag from '@/components/VersionTag';
import { GITHUB_REPO_URL } from '@/const/url';

import FormAppearance from './Form/Appearance';
import FormExperimental from './Form/Experimental';
import FormLayout from './Form/Layout';
import FormSidebar from './Form/Sidebar';
import Sidebar, { SettingsTabs } from './Sidebar';

export interface SettingProps {
  onCancel?: ModalProps['onCancel'];
  open?: ModalProps['open'];
}

const Setting = memo<SettingProps>(({ open, onCancel }) => {
  const [tab, setTab] = useState<SettingsTabs>(SettingsTabs.Appearance);
  const { t } = useTranslation();
  return (
    <Modal
      footer={false}
      onCancel={onCancel}
      open={open}
      title={
        <Flexbox align={'center'} gap={4}>
          <Flexbox align={'center'} gap={4} horizontal>
            <a href={GITHUB_REPO_URL} rel="noreferrer" target="_blank">
              <ActionIcon icon={Book} title="Setting Documents" />
            </a>

            {t('modal.themeSetting.title')}
            <VersionTag />
          </Flexbox>
        </Flexbox>
      }
      width={960}
    >
      <Flexbox gap={16} horizontal>
        <Sidebar setTab={setTab} tab={tab} />
        {tab === SettingsTabs.Appearance && <FormAppearance />}
        {tab === SettingsTabs.Layout && <FormLayout />}
        {tab === SettingsTabs.Sidebar && <FormSidebar />}
        {tab === SettingsTabs.Experimental && <FormExperimental />}
      </Flexbox>
    </Modal>
  );
});

export default Setting;
