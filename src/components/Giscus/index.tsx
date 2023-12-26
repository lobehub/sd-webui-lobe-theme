import {
  DiscordIcon,
  Giscus as G,
  GradientButton,
  Icon,
  Modal,
  type ModalProps,
} from '@lobehub/ui';
import { Button } from 'antd';
import { useTheme } from 'antd-style';
import isEqual from 'fast-deep-equal';
import { Github, Heart } from 'lucide-react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Center, Flexbox } from 'react-layout-kit';

import VersionTag from '@/components/VersionTag';
import { DISCORD_URL, GISCUS_REPO_ID, GITHUB_REPO_URL, REPO_NAME, SPONSOR_URL } from '@/const/url';
import { selectors, useAppStore } from '@/store';

export interface GiscusProps {
  onCancel?: ModalProps['onCancel'];
  open?: ModalProps['open'];
}

const Giscus = memo<GiscusProps>(({ open, onCancel }) => {
  const setting = useAppStore(selectors.currentSetting, isEqual);
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <Modal
      footer={null}
      onCancel={onCancel}
      open={open}
      title={
        <Flexbox align={'center'} gap={4} horizontal>
          {t('modal.themeFeedback.title')}
          <VersionTag />
        </Flexbox>
      }
    >
      <Flexbox gap={32}>
        <Center
          gap={16}
          style={{
            background: theme.colorBgLayout,
            border: `1px solid ${theme.colorBorderSecondary}`,
            borderRadius: theme.borderRadiusLG,
            padding: '16px 0',
          }}
        >
          <Flexbox gap={16} horizontal>
            <a href={DISCORD_URL} rel="noreferrer" target="_blank">
              <Button icon={<Icon icon={DiscordIcon} />} size={'large'}>
                Join Discover
              </Button>
            </a>
            <a href={GITHUB_REPO_URL} rel="noreferrer" target="_blank">
              <Button icon={<Icon icon={Github} />} size={'large'}>
                Github
              </Button>
            </a>
            <a href={SPONSOR_URL} rel="noreferrer" target="_blank">
              <GradientButton icon={<Icon icon={Heart} />}>Sponsor</GradientButton>
            </a>
          </Flexbox>
        </Center>
        <G
          lang={setting.i18n}
          mapping="number"
          repo={REPO_NAME}
          repoId={GISCUS_REPO_ID}
          term="53"
        />
      </Flexbox>
    </Modal>
  );
});

export default Giscus;
