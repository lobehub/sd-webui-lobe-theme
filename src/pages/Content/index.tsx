import isEqual from 'fast-deep-equal';
import { memo, useEffect, useRef } from 'react';

import draggablePanel from '@/script/draggablePanel';
import { useAppStore } from '@/store';
import { DivProps } from '@/types';

import { useStyles } from './style';

const Content = memo<DivProps>(({ className, ...props }) => {
  const mainReference = useRef<HTMLDivElement>(null);
  const setting = useAppStore((st) => st.setting, isEqual);
  const { cx, styles } = useStyles({
    isPromptResizable: setting.promptTextarea === 'resizable',
  });

  useEffect(() => {
    // Content
    const main = gradioApp().querySelector('.app');
    if (main) {
      mainReference.current?.append(main);
    }
    // remove prompt scroll-hide
    for (const textarea of gradioApp().querySelectorAll(`[id$="_prompt_container"] textarea`)) {
      textarea.classList.remove('scroll-hide');
    }
  }, []);

  useEffect(() => {
    if (!setting.layoutSplitPreviewer) draggablePanel();
  }, [setting.layoutSplitPreviewer]);

  return (
    <div
      className={cx(
        styles.container,
        styles.textares,
        styles.text2img,
        styles.autocompleteResults,
        setting.layoutSplitPreviewer ? styles.splitView : styles.draggableContainer,
        className,
      )}
      ref={mainReference}
      {...props}
    />
  );
});

export default Content;
