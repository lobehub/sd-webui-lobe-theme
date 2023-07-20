import { DraggablePanel, LayoutSidebarInner } from '@lobehub/ui';
import isEqual from 'fast-deep-equal';
import { memo, useEffect, useRef } from 'react';
import { shallow } from 'zustand/shallow';

import { selectors, useAppStore } from '@/store';
import { type DivProps } from '@/types';

import { useStyles } from './style';

export interface PreviewProps extends DivProps {
  headerHeight: number;
}

const Preview = memo<PreviewProps>(({ headerHeight }) => {
  const currentTab = useAppStore(selectors.currentTab, shallow);
  const setting = useAppStore(selectors.currentSetting, isEqual);
  const { cx, styles } = useStyles({
    headerHeight,
    isPrimaryColor: Boolean(setting.primaryColor),
    liteAnimation: setting.liteAnimation,
  });
  const txt2imgReference = useRef<HTMLDivElement>(null);
  const img2imgReference = useRef<HTMLDivElement>(null);
  const extras2imgReference = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.time('🤯 [layout] inject - Split Previewer');
    // tab_txt2img
    const txt2imgToprow = gradioApp().querySelector('#txt2img_toprow') as HTMLDivElement;
    const txt2imgSettings = gradioApp().querySelector('#txt2img_settings') as HTMLDivElement;
    if (txt2imgToprow && txt2imgSettings) {
      txt2imgSettings.prepend(txt2imgToprow);
    }
    // tab_img2img
    const img2imgToprow = gradioApp().querySelector('#img2img_toprow') as HTMLDivElement;
    const img2imgSettings = gradioApp().querySelector('#img2img_settings') as HTMLDivElement;
    if (img2imgSettings && img2imgToprow) {
      img2imgSettings.prepend(img2imgToprow);
    }
    // tab_txt2img
    const txt2imgPreview = gradioApp().querySelector('#txt2img_results') as HTMLDivElement;
    const txt2imgButton = gradioApp().querySelector('#txt2img_generate_box') as HTMLDivElement;
    if (txt2imgPreview && txt2imgButton) {
      txt2imgReference.current?.append(txt2imgButton, txt2imgPreview);
    }
    // tab_img2img
    const img2imgPreview = gradioApp().querySelector('#img2img_results') as HTMLDivElement;
    const img2imgButton = gradioApp().querySelector('#img2img_generate_box') as HTMLDivElement;
    if (img2imgPreview && img2imgButton) {
      img2imgReference.current?.append(img2imgButton, img2imgPreview);
    }
    // tab_extras
    const extrasPreview = gradioApp().querySelector('#extras_results') as HTMLDivElement;
    const extrasButton = gradioApp().querySelector('#extras_generate') as HTMLDivElement;
    if (extrasPreview && extrasButton) {
      extras2imgReference.current?.append(extrasButton, extrasPreview);
    }

    console.timeEnd('🤯 [layout] inject - Split Previewer');
  }, []);

  return (
    <DraggablePanel
      defaultSize={{ width: '30vw' }}
      expandable={false}
      minWidth={200}
      mode="fixed"
      pin
      placement="right"
    >
      <LayoutSidebarInner>
        <div className={styles.container}>
          <div
            className={cx(styles.inner, styles.preview)}
            ref={txt2imgReference}
            style={{ display: currentTab === 'tab_txt2img' ? 'flex' : 'none' }}
          />
          <div
            className={cx(styles.inner, styles.preview)}
            ref={img2imgReference}
            style={{ display: currentTab === 'tab_img2img' ? 'flex' : 'none' }}
          />
          <div
            className={cx(styles.inner, styles.preview)}
            ref={extras2imgReference}
            style={{ display: currentTab === 'tab_extras' ? 'flex' : 'none' }}
          />
        </div>
      </LayoutSidebarInner>
    </DraggablePanel>
  );
});

export default Preview;
