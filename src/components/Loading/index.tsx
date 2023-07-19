import { Icon } from '@lobehub/ui';
import isEqual from 'fast-deep-equal';
import { Loader2 } from 'lucide-react';
import { memo } from 'react';

import { Logo } from '@/components';
import { selectors, useAppStore } from '@/store';

import { useStyles } from './style';

const Loading = memo(() => {
  const setting = useAppStore(selectors.currentSetting, isEqual);
  const { styles } = useStyles({
    isPrimaryColor: Boolean(setting.primaryColor),
    liteAnimation: setting.liteAnimation,
  });

  return (
    <section className={styles.container}>
      {!setting.liteAnimation && <div className={styles.canvas} />}
      <div className={styles.inner}>
        <Logo size={48} />
        <Icon className={styles.icon} icon={Loader2} size={{ fontSize: 32 }} spin />
      </div>
    </section>
  );
});

export default Loading;
