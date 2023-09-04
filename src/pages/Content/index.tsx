import { useResponsive } from 'antd-style';
import isEqual from 'fast-deep-equal';
import { memo, useEffect, useRef } from 'react';

import formatPrompt from '@/script/formatPrompt';
import { selectors, useAppStore } from '@/store';
import { type DivProps } from '@/types';

import SplitView from './SplitView';
import { useStyles } from './style';

const Content = memo<DivProps>(({ className, ...props }) => {
  const mainReference = useRef<HTMLDivElement>(null);
  const { mobile } = useResponsive();
  const setting = useAppStore(selectors.currentSetting, isEqual);

  const { cx, styles } = useStyles({
    isPromptResizable: setting.promptTextareaType === 'resizable',
    layoutSplitPreview: setting.layoutSplitPreview,
  });

  useEffect(() => {
    console.time('🤯 [layout] inject - Content');
    // Content
    const main = gradioApp().querySelector('.app');
    if (main) {
      mainReference.current?.append(main);
    }

    // remove prompt scroll-hide
    const textares = gradioApp().querySelectorAll(
      `[id$="_prompt_container"] textarea`,
    ) as NodeListOf<HTMLTextAreaElement>;
    if (textares) {
      for (const textarea of textares) {
        textarea.classList.remove('scroll-hide');
        textarea.style.height = 'auto';
      }
    }

    // textarea
    const interrogate = gradioApp().querySelector(
      '#img2img_toprow .interrogate-col',
    ) as HTMLDivElement;
    const actions = gradioApp().querySelector('#img2img_actions_column') as HTMLDivElement;
    if (interrogate && actions) {
      actions.append(interrogate);
    }

    formatPrompt();
    console.timeEnd('🤯 [layout] inject - Content');
  }, []);

  return (
    <>
      <div
        className={cx(
          styles.container,
          styles.textares,
          styles.text2img,
          setting.layoutSplitPreview && styles.splitView,
          className,
        )}
        ref={mainReference}
        {...props}
      />
      {setting.layoutSplitPreview && mobile === false && <SplitView />}
    </>
  );
});

export default Content;
