import { useResponsive } from 'antd-style';
import isEqual from 'fast-deep-equal';
import { memo, useRef } from 'react';

import { useInject } from '@/hooks/useInject';
import { selectors, useAppStore } from '@/store';
import { type DivProps } from '@/types';

import SplitView from './SplitView';
import { removePromptScrollHide } from './removePromptScrollHide';
import { useStyles } from './style';

const Content = memo<DivProps>(({ className, ...props }) => {
  const mainReference = useRef<HTMLDivElement>(null);
  const { mobile } = useResponsive();
  const setting = useAppStore(selectors.currentSetting, isEqual);
  // the Studio layouts have their own arrangement of the same blocks
  const splitPreview = setting.layoutSplitPreview && setting.layoutPreset === 'classic';
  const { cx, styles } = useStyles({
    isPromptResizable: setting.promptTextareaType === 'resizable',
    layoutSplitPreview: splitPreview,
  });

  useInject(mainReference, '.app', {
    debug: '[layout] inject - Content',
    onSuccess: () => {
      removePromptScrollHide();
    },
  });

  return (
    <>
      <div
        className={cx(
          styles.container,
          styles.textares,
          styles.txt2img,
          splitPreview && styles.splitView,
          className,
        )}
        ref={mainReference}
        {...props}
      />

      {splitPreview && mobile === false && <SplitView />}
    </>
  );
});

export default Content;
