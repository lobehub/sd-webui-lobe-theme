import { Meta } from '@lobehub/ui';
import { Suspense, memo, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { shallow } from 'zustand/shallow';

import { Loading } from '@/components';
import Layout from '@/layouts';
import Index from '@/pages';
import { useAppStore } from '@/store';

import manifest from './manifest';

export const App = memo(() => {
  const [loading, setLoading] = useState(true);
  const { setCurrentTab, onInit, storeLoading } = useAppStore(
    (st) => ({
      onInit: st.onInit,
      setCurrentTab: st.setCurrentTab,
      storeLoading: st.loading,
    }),
    shallow,
  );

  useEffect(() => {
    console.time('🤯 Lobe Theme loading');
    onInit();
    onUiLoaded(() => {
      setLoading(false);
      console.timeEnd('🤯 Lobe Theme loading');
    });
    onUiTabChange(() => {
      setCurrentTab();
    });
  }, []);

  return (
    <Suspense fallback="loading...">
      <Helmet>
        <Meta title={'Stable Diffusion · LobeHub'} />
        <link href={manifest} rel="manifest" />
      </Helmet>
      <Layout>{storeLoading === false && loading === false ? <Index /> : <Loading />}</Layout>
    </Suspense>
  );
});

export default App;
