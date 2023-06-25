import { LayoutHeader, LayoutMain, LayoutSidebar } from '@lobehub/ui';
import isEqual from 'fast-deep-equal';
import { memo, useEffect } from 'react';

import replaceIcon from '@/script/replaceIcon';
import { useAppStore } from '@/store';

import Content from './Content';
import ExtraNetworkSidebar from './ExtraNetworkSidebar';
import Footer from './Footer';
import Header from './Header';
import QuickSettingSidebar from './QuickSettingSidebar';
import { useStyles } from './style';

const HEADER_HEIGHT = 64;

const Index = memo(() => {
  const { styles } = useStyles(HEADER_HEIGHT);
  const setting = useAppStore((st) => st.setting, isEqual);

  useEffect(() => {
    if (setting.svgIcon) replaceIcon();
  }, []);

  return (
    <>
      <LayoutHeader headerHeight={HEADER_HEIGHT}>
        <Header />
      </LayoutHeader>
      <LayoutMain>
        <LayoutSidebar className={styles.sidebar} headerHeight={HEADER_HEIGHT} style={{ flex: 0 }}>
          <QuickSettingSidebar headerHeight={HEADER_HEIGHT} />
        </LayoutSidebar>
        <Content />
        {setting?.enableExtraNetworkSidebar && (
          <LayoutSidebar
            className={styles.sidebar}
            headerHeight={HEADER_HEIGHT}
            style={{ flex: 0 }}
          >
            <ExtraNetworkSidebar headerHeight={HEADER_HEIGHT} />
          </LayoutSidebar>
        )}
      </LayoutMain>
      <Footer />
    </>
  );
});

export default Index;
