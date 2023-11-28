import { consola } from 'consola';
import { PropsWithChildren, Suspense, memo, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import { Loading } from '@/components';
import GlobalLayout from '@/layouts';
import { useAppStore } from '@/store';

import manifest from './manifest';

export const Layout = memo<PropsWithChildren>(({ children }) => {
  const [loading, setLoading] = useState(true);
  const { setCurrentTab, onInit, storeLoading } = useAppStore((st) => ({
    onInit: st.onInit,
    setCurrentTab: st.setCurrentTab,
    storeLoading: st.loading,
  }));

  useEffect(() => {
    onInit();
    onUiLoaded(() => {
      setLoading(false);
      consola.success('🤯 Lobe Theme loading');
    });
    onUiTabChange(() => {
      setCurrentTab();
    });
  }, []);

  return (
    <Suspense fallback="loading...">
      <Helmet>
        <link
          href="https://registry.npmmirror.com/@lobehub/assets-favicons/1.1.0/files/assets/apple-touch-icon.png"
          rel="apple-touch-icon"
          sizes="180x180"
        />
        <link
          href="https://registry.npmmirror.com/@lobehub/assets-favicons/1.1.0/files/assets/favicon-32x32.png"
          rel="icon"
          sizes="32x32"
          type="image/png"
        />
        <link
          href="https://registry.npmmirror.com/@lobehub/assets-favicons/1.1.0/files/assets/favicon-16x16.png"
          rel="icon"
          sizes="16x16"
          type="image/png"
        />
        <link
          href="https://registry.npmmirror.com/@lobehub/assets-favicons/1.1.0/files/assets/site.webmanifest"
          rel="manifest"
        />
        <meta content="Stable Diffusion · LobeHub" name="apple-mobile-web-app-title" />
        <meta content="Stable Diffusion · LobeHub" name="application-name" />
        <meta content="#000000" name="msapplication-TileColor" />
        <meta content="#000000" name="theme-color" />
        <link href={manifest} rel="manifest" />
      </Helmet>
      <GlobalLayout>
        {storeLoading === false && loading === false ? children : <Loading />}
      </GlobalLayout>
    </Suspense>
  );
});

export default Layout;
