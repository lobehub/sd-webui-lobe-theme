import { memo, useEffect } from 'react';

import { useStyles } from './style';

interface GiscusProps {
  themeMode: 'light' | 'dark';
}
const Giscus = memo<GiscusProps>(({ themeMode }) => {
  const { styles, cx } = useStyles();

  useEffect(() => {
    // giscus
    const giscus: HTMLScriptElement = document.createElement('script');
    giscus.src = 'https://giscus.app/client.js';
    giscus.dataset.repo = 'canisminor1990/sd-webui-kitchen-theme';
    giscus.dataset.repoId = 'R_kgDOJCPcNg';
    giscus.dataset.mapping = 'number';
    giscus.dataset.term = '53';
    giscus.dataset.reactionsEnabled = '1';
    giscus.dataset.emitMetadata = '0';
    giscus.dataset.inputPosition = 'bottom';
    giscus.dataset.theme = themeMode;
    giscus.dataset.lang = 'en';
    giscus.crossOrigin = 'anonymous';
    giscus.async = true;
    document.querySelectorAll('head')[0].append(giscus);
  }, []);

  return <div className={cx('giscus', styles.container)} id="giscus" />;
});

export default Giscus;
