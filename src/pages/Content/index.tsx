import isEqual from 'fast-deep-equal';
import { memo, useEffect, useRef } from 'react';

import { useAppStore } from '@/store';
import { DivProps } from '@/types';

import { useStyles } from './style';

const Content = memo<DivProps>(({ className, ...props }) => {
  const mainReference = useRef<HTMLDivElement>(null);
  const setting = useAppStore((st) => st.setting, isEqual);
  const { cx, styles } = useStyles({
    isPrimaryColor: Boolean(setting.primaryColor),
    isPromptResizable: setting.promptTextarea === 'resizable',
  });

  useEffect(() => {
    // Content
    const main = gradioApp().querySelector('.app');
    if (main) {
      mainReference.current?.append(main);
    }
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
  }, []);

  return (
    <div
      className={cx(
        styles.container,
        styles.textares,
        styles.text2img,
        styles.autocompleteResults,
        className,
      )}
      ref={mainReference}
      {...props}
    >
      <div className={styles.background} />
    </div>
  );
});

export default Content;
