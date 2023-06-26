import GiscusComponent from '@giscus/react';
import { Icon } from '@lobehub/ui';
import { Space } from 'antd';
import { Github } from 'lucide-react';
import { memo } from 'react';

import { author, homepage, name } from '@/../package.json';
import { Modal, type ModalProps } from '@/components';

import { useStyles } from './style';

interface GiscusProps {
  onCancel?: ModalProps['onCancel'];
  open?: ModalProps['open'];
  themeMode: 'light' | 'dark';
}
const Giscus = memo<GiscusProps>(({ themeMode, open, onCancel }) => {
  const { styles } = useStyles();

  return (
    <Modal
      onCancel={onCancel}
      open={open}
      title={
        <a href={homepage} rel="noreferrer" target="_blank">
          <Space>
            <Icon icon={Github} />
            {`${author}/${name}`}
          </Space>
        </a>
      }
    >
      <div className={styles.container}>
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
      </div>
    </Modal>
  );
});

export default Giscus;
