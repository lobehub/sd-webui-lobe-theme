import GiscusComponent from '@giscus/react';
import { ActionIcon } from '@lobehub/ui';
import isEqual from 'fast-deep-equal';
import { Github } from 'lucide-react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { homepage, name } from '@/../package.json';
import { Modal, type ModalProps } from '@/components';
import { useAppStore } from '@/store';

const formatLang = (lang: string) => {
  if (['zh_CN', 'zh_TW'].includes(lang)) {
    return lang.replace('_', '-');
  } else if (lang === 'zh_HK') {
    return 'zh-TW';
  } else {
    return lang.split('_')[0];
  }
};

interface GiscusProps {
  onCancel?: ModalProps['onCancel'];
  open?: ModalProps['open'];
  themeMode: 'light' | 'dark';
}
const Giscus = memo<GiscusProps>(({ themeMode, open, onCancel }) => {
  const setting = useAppStore((st) => st.setting, isEqual);
  const { t } = useTranslation();
  return (
    <Modal
      onCancel={onCancel}
      open={open}
      title={
        <>
          <a href={homepage} rel="noreferrer" target="_blank">
            <ActionIcon icon={Github} title={`canisminor1990/${name}`} />
          </a>
          {t('themeFeedback')}
        </>
      }
    >
      <GiscusComponent
        emitMetadata="0"
        id="giscus"
        inputPosition="top"
        lang={formatLang(setting.i18n)}
        loading="lazy"
        mapping="number"
        reactionsEnabled="1"
        repo="canisminor1990/sd-webui-kitchen-theme"
        repoId="R_kgDOJCPcNg"
        term="53"
        theme={themeMode === 'dark' ? 'transparent_dark' : 'light'}
      />
    </Modal>
  );
});

export default Giscus;
