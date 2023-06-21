import { memo, useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow';

import Layout from '@/layouts';
import Index from '@/pages';
import formatPrompt from '@/script/formatPrompt';
import promptBracketChecker from '@/script/promptBracketChecker';
import setupHead from '@/script/setupHead';
import { useAppStore } from '@/store';

const App = memo(() => {
  const [loading, setLoading] = useState(true);
  const setCurrentTab = useAppStore((st) => st.setCurrentTab, shallow);
  useEffect(() => {
    setupHead();
    onUiLoaded(() => {
      formatPrompt();
      promptBracketChecker();
      setLoading(false);
    });
    onUiUpdate(() => {
      setCurrentTab();
    });
  }, []);

  return <Layout>{!loading && <Index />}</Layout>;
});

export default App;
