import { Icon, Logo } from '@lobehub/ui';
import isEqual from 'fast-deep-equal';
import { Loader2 } from 'lucide-react';
import { memo } from 'react';

import { useAppStore } from '@/store';

import { useStyles } from './style';

const Loading = memo(() => {
  const setting = useAppStore((st) => st.setting, isEqual);
  const { styles } = useStyles(Boolean(setting.primaryColor));

  return (
    <section className={styles.container}>
      <div className={styles.canvas} />
      <div className={styles.inner}>
        <Logo extra="SD" size={48} type="combine" />
        <Icon className={styles.icon} icon={Loader2} size={{ fontSize: 32 }} spin />
      </div>
    </section>
  );
});

export default Loading;
