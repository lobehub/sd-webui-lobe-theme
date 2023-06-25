import { Icon, Logo } from '@lobehub/ui';
import { Loader2 } from 'lucide-react';
import { memo } from 'react';

import { useStyles } from './style';

const Loading = memo(() => {
  const { styles } = useStyles();

  return (
    <section className={styles.container}>
      <div className={styles.canvas} />
      <div className={styles.inner}>
        <Logo extra="SD" size={48} type="combine" />
        <Icon icon={Loader2} size={{ fontSize: 32 }} spin />
      </div>
    </section>
  );
});

export default Loading;
