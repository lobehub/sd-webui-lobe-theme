import { PropsWithChildren, memo } from 'react';

import GlobalLayout from '@/layouts';
import { useAppStore } from '@/store';

const Layout = memo<PropsWithChildren>(({ children }) => {
  const loading = useAppStore((st) => st.loading);

  return <GlobalLayout>{loading === false && children}</GlobalLayout>;
});

export default Layout;
