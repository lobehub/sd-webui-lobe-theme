import { memo, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { shallow } from 'zustand/shallow';

import Layout from '@/layouts';
import Index from '@/pages';
import formatPrompt from '@/script/formatPrompt';
import promptBracketChecker from '@/script/promptBracketChecker';
import Loading from '@/slots/Loading';
import { useAppStore } from '@/store';

const App = memo(() => {
  const [loading, setLoading] = useState(true);
  const setCurrentTab = useAppStore((st) => st.setCurrentTab, shallow);
  useEffect(() => {
    onUiLoaded(() => {
      formatPrompt();
      promptBracketChecker();
      setLoading(false);
    });
    onUiUpdate(() => {
      setCurrentTab();
    });
  }, []);

  return (
    <>
      <Helmet>
        <link
          href="https://npm.elemecdn.com/@lobehub/assets-favicons/assets/apple-touch-icon.png"
          rel="apple-touch-icon"
          sizes="180x180"
        />
        <link
          href="https://npm.elemecdn.com/@lobehub/assets-favicons/assets/favicon-32x32.png"
          rel="icon"
          sizes="32x32"
          type="image/png"
        />
        <link
          href="https://npm.elemecdn.com/@lobehub/assets-favicons/assets/favicon-16x16.png"
          rel="icon"
          sizes="16x16"
          type="image/png"
        />
        <link
          href="https://npm.elemecdn.com/@lobehub/assets-favicons/assets/site.webmanifest"
          rel="manifest"
        />
        <link
          color="#000000"
          href="https://npm.elemecdn.com/@lobehub/assets-favicons/assets/safari-pinned-tab.svg"
          rel="mask-icon"
        />
        <meta content="LobeHub" name="apple-mobile-web-app-title" />
        <meta content="LobeHub" name="application-name" />
        <meta content="#000000" name="msapplication-TileColor" />
        <meta content="#000000" name="theme-color" />
      </Helmet>
      <Layout>{loading ? <Loading /> : <Index />}</Layout>
    </>
  );
});

export default App;
