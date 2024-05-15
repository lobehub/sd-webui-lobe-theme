import { SiDiscord, SiGithub, SiMedium, SiX } from '@icons-pack/react-simple-icons';
import { ActionIcon } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation('common');
  return (
    <Flexbox gap={8} horizontal>
      <a href={GITHUB_REPO_URL} rel="noreferrer" target={'_blank'}>
        <ActionIcon
          className={styles.icon}
          icon={SiGithub as any}
          title={t('follow', { name: 'GitHub' })}
        />
      </a>
      <a href={X} rel="noreferrer" target={'_blank'}>
        <ActionIcon className={styles.icon} icon={SiX as any} title={t('follow', { name: 'X' })} />
      </a>
      <a href={DISCORD_URL} rel="noreferrer" target={'_blank'}>
        <ActionIcon
          className={styles.icon}
          icon={SiDiscord as any}
          title={t('follow', { name: 'Discord' })}
        />
      </a>
      <a href={MEDIDUM_URL} rel="noreferrer" target={'_blank'}>
        <ActionIcon
          className={styles.icon}
          icon={SiMedium as any}
          title={t('follow', { name: 'Medium' })}
        />
      </a>
    </Flexbox>
  );
});

export default Follow;
