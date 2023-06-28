import { LayoutHeader, LayoutMain, LayoutSidebar } from '@lobehub/ui';
import { useResponsive } from 'antd-style';
import isEqual from 'fast-deep-equal';
import { memo, useEffect } from 'react';
import { shallow } from 'zustand/shallow';

import replaceIcon from '@/script/replaceIcon';
import { useAppStore } from '@/store';

import Content from './Content';
import ExtraNetworkSidebar from './ExtraNetworkSidebar';
import Footer from './Footer';
import Header from './Header';
import Preview from './Preview';
import QuickSettingSidebar from './QuickSettingSidebar';
import { useStyles } from './style';

const HEADER_HEIGHT = 64;

const Index = memo(() => {
  const currentTab = useAppStore((st) => st.currentTab, shallow);
  const setting = useAppStore((st) => st.setting, isEqual);
  const { mobile } = useResponsive();
  const { cx, styles } = useStyles({
    headerHeight: HEADER_HEIGHT,
    isPrimaryColor: Boolean(setting.primaryColor),
  });

  useEffect(() => {
    if (setting.svgIcon) replaceIcon();
  }, []);

  return (
    <>
      <LayoutHeader headerHeight={HEADER_HEIGHT}>
        <Header />
      </LayoutHeader>
      <LayoutMain>
        <div className={styles.background} />
        <LayoutSidebar className={styles.sidebar} headerHeight={HEADER_HEIGHT} style={{ flex: 0 }}>
          <QuickSettingSidebar headerHeight={HEADER_HEIGHT} />
        </LayoutSidebar>
        <Content />
        {setting.layoutSplitPreview && mobile === false && (
          <LayoutSidebar
            className={cx(styles.sidebar, styles.panel)}
            headerHeight={HEADER_HEIGHT}
            style={{
              display: ['tab_txt2img', 'tab_img2img', 'tab_extras'].includes(currentTab) ?
                'block' :
                'none',
              flex: 0,
            }}
          >
            <Preview headerHeight={HEADER_HEIGHT} />
          </LayoutSidebar>
        )}
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
