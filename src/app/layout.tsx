import { useCdnFn } from '@lobehub/ui';
import { consola } from 'consola';
import { PropsWithChildren, Suspense, memo, useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import pkg from '@/../package.json';
import { Loading } from '@/components';
import GlobalLayout from '@/layouts';
import { useAppStore } from '@/store';
import { applyForgeDocumentFlag } from '@/utils/forge';

import manifest from './manifest';

const TITLE = 'Stable Diffusion · LobeHub';
const DESC = pkg.description;

export const Layout = memo<PropsWithChildren>(({ children }) => {
  const [loading, setLoading] = useState(true);
  const { setCurrentTab, onInit, storeLoading } = useAppStore((st) => ({
    onInit: st.onInit,
    setCurrentTab: st.setCurrentTab,
    storeLoading: st.loading,
  }));
  const genCdnUrl = useCdnFn();
  const genAssets = useCallback(
    (path: string) =>
      genCdnUrl({
        path,
        pkg: '@lobehub/assets-favicons',
        version: 'latest',
      }),
    [],
  );

  useEffect(() => {
    onInit();

    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      // Re-run after Gradio hydrates shadow DOM — early DOMContentLoaded detect can miss it
      applyForgeDocumentFlag();
      setLoading(false);
      consola.success('🤯 Lobe Theme loading');
    };

    // Theme toggle used to full-reload with ?__theme=… After reload Gradio can
    // fire onUiLoaded before React mounts, so the callback never runs and the
    // UI stays stuck on the Loading screen. Also poll + hard timeout.
    onUiLoaded(finish);
    const alreadyReady = () =>
      typeof gradioApp === 'function' && Boolean(gradioApp()?.querySelector('#txt2img_prompt'));
    if (alreadyReady()) {
      finish();
    } else {
      const poll = window.setInterval(() => {
        if (alreadyReady()) {
          window.clearInterval(poll);
          finish();
        }
      }, 100);
      window.setTimeout(() => {
        window.clearInterval(poll);
        finish();
      }, 12_000);
    }

    onUiTabChange(() => {
      setCurrentTab();
    });
  }, []);

  return (
    <Suspense fallback="loading...">
      <Helmet>
        <link href={genAssets('assets/favicon.ico')} rel="shortcut icon" />
        <link
          href={genAssets('assets/apple-touch-icon.png')}
          rel="apple-touch-icon"
          sizes="180x180"
        />
        <link
          href={genAssets('assets/favicon-32x32.png')}
          rel="icon"
          sizes="32x32"
          type="image/png"
        />
        <link
          href={genAssets('assets/favicon-16x16.png')}
          rel="icon"
          sizes="16x16"
          type="image/png"
        />
        <meta
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, viewport-fit=cover, user-scalable=no"
          name="viewport"
        />
        <title>{TITLE}</title>
        <meta content={TITLE} name="apple-mobile-web-app-title" />
        <meta content={TITLE} name="application-name" />
        <meta content={DESC} name="description" />
        <meta content="#000000" name="msapplication-TileColor" />
        <meta content="#fff" media="(prefers-color-scheme: light)" name="theme-color" />
        <meta content="#000" media="(prefers-color-scheme: dark)" name="theme-color" />
        <meta content="yes" name="apple-mobile-web-app-capable" />
        <meta content={TITLE} name="apple-mobile-web-app-title" />
        <meta content="black-translucent" name="apple-mobile-web-app-status-bar-style" />
        <meta content={TITLE} name="apple-mobile-web-app-title" />
        <meta content="yes" name="apple-mobile-web-app-capable" />
        <meta content="index,follow" name="robots" />
        <link href={manifest(genAssets)} rel="manifest" />
        <meta content={TITLE} property="og:title" />
        <meta content={DESC} property="og:description" />
        <meta content="https://github.com/lobehub/sd-webui-lobe-theme" property="og:url" />
        <meta content={TITLE} property="og:site_name" />
        <meta content="en-US" property="og:locale" />
        <meta
          content="https://repository-images.githubusercontent.com/606329910/7fd79db5-fd91-450c-9e95-8ccce8ffdc0b"
          property="og:image"
        />
        <meta content="website" property="og:type" />
        <meta content="summary_large_image" name="twitter:card" />
        <meta content="@lobehub" name="twitter:site" />
        <meta content={TITLE} name="twitter:title" />
        <meta content={DESC} name="twitter:description" />
        <meta
          content="https://repository-images.githubusercontent.com/606329910/7fd79db5-fd91-450c-9e95-8ccce8ffdc0b"
          name="twitter:image"
        />
        <link href="https://github.com/lobehub/sd-webui-lobe-theme" rel="canonical" />
      </Helmet>
      <GlobalLayout>
        {storeLoading === false && loading === false ? children : <Loading />}
      </GlobalLayout>
    </Suspense>
  );
});

export default Layout;
