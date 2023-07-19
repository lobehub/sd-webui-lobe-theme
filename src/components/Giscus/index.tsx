import { ActionIcon, Giscus as G } from '@lobehub/ui';
import { Space } from 'antd';
import isEqual from 'fast-deep-equal';
import { Github } from 'lucide-react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { homepage } from '@/../package.json';
import Modal, { type ModalProps } from '@/components/Modal';
import VersionTag from '@/components/VersionTag';
import { selectors, useAppStore } from '@/store';

export interface GiscusProps {
  onCancel?: ModalProps['onCancel'];
  open?: ModalProps['open'];
}

const repoName = homepage.replace('https://github.com/', '') as `${string}/${string}`;

const Giscus = memo<GiscusProps>(({ open, onCancel }) => {
  const setting = useAppStore(selectors.currentSetting, isEqual);
  const { t } = useTranslation();
  return (
    <Modal
      onCancel={onCancel}
      open={open}
      title={
        <>
          <a href={homepage} rel="noreferrer" target="_blank">
            <ActionIcon icon={Github} title={repoName} />
          </a>
          <Space>
            {t('themeFeedback')}
            <VersionTag />
          </Space>
        </>
      }
    >
      <G lang={setting.i18n} mapping="number" repo={repoName} repoId="R_kgDOJCPcNg" term="53" />
    </Modal>
  );
});

export default Giscus;
