import { LayoutHeader, LayoutMain, LayoutSidebar } from '@lobehub/ui';
import isEqual from 'fast-deep-equal';
import { useResponsive } from 'antd-style';
import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

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
import NavRail from '../features/NavRail';
import QuickSettingSidebar from '../features/QuickSettingSidebar';
import Share from '../features/Share';
import Tools from '../features/Tools';
import { useStyles } from './style';

export const HEADER_HEIGHT = 64;

const Index = memo(() => {
  const setting = useAppStore(selectors.currentSetting, isEqual);
  const { mobile } = useResponsive();
  const { i18n } = useTranslation();

  // the language read at start-up is the last one this browser saw; follow the saved setting
  useEffect(() => {
    if (setting.i18n && i18n.language !== setting.i18n) i18n.changeLanguage(setting.i18n);
  }, [setting.i18n]);
  // the Studio layouts put the tabs in a rail on the left instead of the header (not on phones)
  const studio = setting.layoutPreset !== 'classic' && !mobile;
  const headerHeight = studio ? 0 : HEADER_HEIGHT;
  const { cx, styles } = useStyles({
    headerHeight,
    isPrimaryColor: Boolean(setting.primaryColor),
  });

  useEffect(() => {
    if (setting.enableHighlight) PromptHighlight();
    if (setting.enableImageInfo) ImageInfo();
    if (setting.svgIcon) replaceIcon();
  }, []);

  // Left and right sidebars; "Swap sidebars" puts each on the other side.
  const quickSettingSidebar = setting.enableSidebar && (
    <LayoutSidebar className={styles.sidebar} headerHeight={headerHeight} style={{ flex: 0, zIndex: 50 }}>
      <QuickSettingSidebar headerHeight={headerHeight} />
    </LayoutSidebar>
  );
  const extraNetworkSidebar = setting.enableExtraNetworkSidebar && (
    <LayoutSidebar className={styles.sidebar} headerHeight={headerHeight} style={{ flex: 0, zIndex: 50 }}>
      <ExtraNetworkSidebar headerHeight={headerHeight} />
    </LayoutSidebar>
  );

  return (
    <>
      <StructuredData />
      <GlobalStyle />
      {!studio && (
        <LayoutHeader headerHeight={HEADER_HEIGHT}>
          <Header />
        </LayoutHeader>
      )}
      <LayoutMain>
        {studio && <NavRail />}
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
