import GiscusComponent from '@giscus/react';
import { ActionIcon } from '@lobehub/ui';
import { Github } from 'lucide-react';
import { memo } from 'react';

import { homepage, name } from '@/../package.json';
import { Modal, type ModalProps } from '@/components';

interface GiscusProps {
  onCancel?: ModalProps['onCancel'];
  open?: ModalProps['open'];
  themeMode: 'light' | 'dark';
}
const Giscus = memo<GiscusProps>(({ themeMode, open, onCancel }) => {
  return (
    <Modal
      onCancel={onCancel}
      open={open}
      title={
        <>
          <a href={homepage} rel="noreferrer" target="_blank">
            <ActionIcon icon={Github} title={`canisminor1990/${name}`} />
          </a>
          Theme Feedback
        </>
      }
    >
      <GiscusComponent
        emitMetadata="0"
        id="giscus"
        inputPosition="top"
        lang="en"
        loading="lazy"
        mapping="number"
        reactionsEnabled="1"
        repo="canisminor1990/sd-webui-kitchen-theme"
        repoId="R_kgDOJCPcNg"
        term="53"
        theme={themeMode}
      />
    </Modal>
  );
});

export default Giscus;
