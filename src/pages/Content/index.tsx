import { useResponsive } from 'antd-style';
import isEqual from 'fast-deep-equal';
import { memo, useEffect, useRef } from 'react';

import draggablePanel from '@/script/draggablePanel';
import formatPrompt from '@/script/formatPrompt';
import { selectors, useAppStore } from '@/store';
import { type DivProps } from '@/types';

import { useStyles as usePreviewStyles } from '../Preview/style';
import { useStyles } from './style';

const Content = memo<DivProps>(({ className, ...props }) => {
  const mainReference = useRef<HTMLDivElement>(null);
  const setting = useAppStore(selectors.currentSetting, isEqual);
  const { mobile } = useResponsive();
  const { cx, styles } = useStyles({
    isPromptResizable: setting.promptTextareaType === 'resizable',
    layoutSplitPreview: setting.layoutSplitPreview,
  });
  const previewStyle = usePreviewStyles({
    isPrimaryColor: Boolean(setting.primaryColor),
    liteAnimation: setting.liteAnimation,
  });

  const useDragablePanel = !setting.layoutSplitPreview && mobile === false;

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

  useEffect(() => {
    if (useDragablePanel) draggablePanel();
  }, [useDragablePanel]);

  return (
    <div
      className={cx(
        styles.container,
        styles.textares,
        styles.text2img,
        setting.layoutSplitPreview ? styles.splitView : styles.draggableContainer,
        useDragablePanel && previewStyle.styles.preview,
        className,
      )}
      ref={mainReference}
      {...props}
    />
  );
});

export default Content;
