import { LayoutHeader, LayoutMain, LayoutSidebar } from '@lobehub/ui';
import isEqual from 'fast-deep-equal';
import { memo, useEffect } from 'react';

import '@/locales/config';
import { PromptHighlight } from '@/modules/PromptHighlight';
import replaceIcon from '@/scripts/replaceIcon';
import { selectors, useAppStore } from '@/store';
import GlobalStyle from '@/styles';

import Content from '../features/Content';
import ExtraNetworkSidebar from '../features/ExtraNetworkSidebar';
import Footer from '../features/Footer';
import Header from '../features/Header';
import QuickSettingSidebar from '../features/QuickSettingSidebar';
import { useStyles } from './style';

const HEADER_HEIGHT = 64;

const Index = memo(() => {
  const setting = useAppStore(selectors.currentSetting, isEqual);
  const { cx, styles } = useStyles({
    headerHeight: HEADER_HEIGHT,
    isPrimaryColor: Boolean(setting.primaryColor),
  });

  useEffect(() => {
    if (setting.enableHighlight) {
      PromptHighlight('#txt2img_prompt', '#lobe_txt2img_prompt');
      PromptHighlight('#img2img_prompt', '#lobe_img2img_prompt');
    }
    if (setting.svgIcon) replaceIcon();
  }, []);

  return (
    <>
      <GlobalStyle />
      <LayoutHeader headerHeight={HEADER_HEIGHT}>
        <Header />
      </LayoutHeader>
      <LayoutMain>
        {<div className={setting.liteAnimation ? styles.backgroundLite : styles.background} />}
        {setting.enableSidebar && (
          <LayoutSidebar
            className={styles.sidebar}
            headerHeight={HEADER_HEIGHT}
            style={{ flex: 0, zIndex: 50 }}
          >
            <QuickSettingSidebar headerHeight={HEADER_HEIGHT} />
          </LayoutSidebar>
        )}
        <Content className={cx(!setting.enableSidebar && styles.quicksettings)} />
        {setting?.enableExtraNetworkSidebar && (
          <LayoutSidebar
            className={styles.sidebar}
            headerHeight={HEADER_HEIGHT}
            style={{ flex: 0, zIndex: 50 }}
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
