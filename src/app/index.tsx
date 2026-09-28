import { LayoutHeader, LayoutMain, LayoutSidebar } from '@lobehub/ui';
import isEqual from 'fast-deep-equal';
import { memo, useEffect } from 'react';

import StructuredData from '@/components/StructuredData';
import PromptFormator from '@/features/PromptFormator';
import '@/locales/config';
import ImageInfo from '@/modules/ImageInfo/page';
import PromptHighlight from '@/modules/PromptHighlight/page';
import replaceIcon from '@/scripts/replaceIcon';
import { selectors, useAppStore } from '@/store';
import GlobalStyle from '@/styles';

import Content from '../features/Content';
import ExtraNetworkSidebar from '../features/ExtraNetworkSidebar';
import Footer from '../features/Footer';
import Header from '../features/Header';
import QuickSettingSidebar from '../features/QuickSettingSidebar';
import Share from '../features/Share';
import Tools from '../features/Tools';
import { useStyles } from './style';

export const HEADER_HEIGHT = 64;

const Index = memo(() => {
  const setting = useAppStore(selectors.currentSetting, isEqual);
  const { cx, styles } = useStyles({
    headerHeight: HEADER_HEIGHT,
    isPrimaryColor: Boolean(setting.primaryColor),
  });

  useEffect(() => {
    if (setting.enableHighlight) PromptHighlight();
    if (setting.enableImageInfo) ImageInfo();
    if (setting.svgIcon) replaceIcon();
  }, []);

  // Left and right sidebars; "Swap sidebars" puts each on the other side.
  const quickSettingSidebar = setting.enableSidebar && (
    <LayoutSidebar className={styles.sidebar} headerHeight={HEADER_HEIGHT} style={{ flex: 0, zIndex: 50 }}>
      <QuickSettingSidebar headerHeight={HEADER_HEIGHT} />
    </LayoutSidebar>
  );
  const extraNetworkSidebar = setting.enableExtraNetworkSidebar && (
    <LayoutSidebar className={styles.sidebar} headerHeight={HEADER_HEIGHT} style={{ flex: 0, zIndex: 50 }}>
      <ExtraNetworkSidebar headerHeight={HEADER_HEIGHT} />
    </LayoutSidebar>
  );

  return (
    <>
      <StructuredData />
      <GlobalStyle />
      <LayoutHeader headerHeight={HEADER_HEIGHT}>
        <Header />
      </LayoutHeader>
      <LayoutMain>
        {<div className={setting.liteAnimation ? styles.backgroundLite : styles.background} />}
        {setting.sidebarSwap ? extraNetworkSidebar : quickSettingSidebar}
        <Content className={cx(!setting.enableSidebar && styles.quicksettings)} />
        <PromptFormator />
        <Share />
        <Tools />
        {setting.sidebarSwap ? quickSettingSidebar : extraNetworkSidebar}
      </LayoutMain>
      <Footer />
    </>
  );
});

export default Index;
