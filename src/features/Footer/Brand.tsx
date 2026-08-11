import { Logo } from '@lobehub/ui';
import { createStyles, useThemeMode } from 'antd-style';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';
import urlJoin from 'url-join';

import { FORGE_NEO_URL, OFFICIAL_SITE, STATUS_URL } from '@/const/url';
import { useAppStore } from '@/store';

import Follow from './Follow';

export const COPYRIGHT = `© 2023-${new Date().getFullYear()} LobeHub, LLC`;

const useStyles = createStyles(({ css, token }) => {
  return {
    container: css`
      font-size: 14px;
    `,
    description: css`
      color: ${token.colorTextDescription};
    `,
    logo: css`
      display: flex;
      flex: none;
      align-items: center;
      color: inherit !important;
    `,
    status: css`
      border: none !important;
      color-scheme: none;
      background: transparent;
    `,
  };
});

const Brand = memo(() => {
  const { styles } = useStyles();
  const { isDarkMode } = useThemeMode();
  const isForgeNeo = useAppStore((st) => st.isForgeNeo);
  const { t } = useTranslation();

  return (
    <Flexbox className={styles.container} gap={16}>
      <a className={styles.logo} href={isForgeNeo ? FORGE_NEO_URL : OFFICIAL_SITE}>
        <Logo type={'combine'} />
      </a>
      <div>{isForgeNeo ? t('footer.taglineForge') : t('footer.tagline')}</div>
      {isForgeNeo && <div className={styles.description}>{t('footer.compatForge')}</div>}
      <div className={styles.description}>{COPYRIGHT}</div>
      <Follow />
      <iframe
        className={styles.status}
        height="30"
        loading={'lazy'}
        scrolling="no"
        src={urlJoin(STATUS_URL, `badge?theme=${isDarkMode ? 'dark' : 'light'}`)}
        width="250"
      />
    </Flexbox>
  );
});

export default Brand;
