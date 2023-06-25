import { Icon } from '@lobehub/ui';
import { Loader2 } from 'lucide-react';
import { memo } from 'react';
import { shallow } from 'zustand/shallow';

import { Logo } from '@/components';
import { useAppStore } from '@/store';

import { useStyles } from './style';

const Loading = memo(() => {
  const themeMode = useAppStore((st) => st.themeMode, shallow);
  const { styles } = useStyles();

  return (
    <section className={styles.container}>
      <div className={styles.canvas} />
      <div className={styles.inner}>
        <Logo size={36} themeMode={themeMode} />
        <Icon icon={Loader2} size={{ fontSize: 32 }} spin />
      </div>
    </section>
  );
});

export default Loading;
