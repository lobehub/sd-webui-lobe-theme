import { SiDiscord, SiGithub, SiMedium, SiX } from '@icons-pack/react-simple-icons';
import { ActionIcon } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import { DISCORD_URL, GITHUB_REPO_URL, MEDIDUM_URL, X } from '@/const/url';

const useStyles = createStyles(({ css, token }) => {
  return {
    icon: css`
      svg {
        fill: ${token.colorTextDescription};
      }

      &:hover {
        svg {
          fill: ${token.colorText};
        }
      }
    `,
  };
});

const Follow = memo(() => {
  const { styles } = useStyles();
  return (
    <Flexbox gap={8} horizontal>
      <a href={GITHUB_REPO_URL} rel="noreferrer" target={'_blank'}>
        <ActionIcon className={styles.icon} icon={SiGithub as any} title={'GitHub'} />
      </a>
      <a href={X} rel="noreferrer" target={'_blank'}>
        <ActionIcon className={styles.icon} icon={SiX as any} title={'X / Twitter'} />
      </a>
      <a href={DISCORD_URL} rel="noreferrer" target={'_blank'}>
        <ActionIcon className={styles.icon} icon={SiDiscord as any} title={'Discord'} />
      </a>
      <a href={MEDIDUM_URL} rel="noreferrer" target={'_blank'}>
        <ActionIcon className={styles.icon} icon={SiMedium as any} title={'Medium'} />
      </a>
    </Flexbox>
  );
});

export default Follow;
