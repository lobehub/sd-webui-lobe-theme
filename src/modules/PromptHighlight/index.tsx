import { useScroll, useSize } from 'ahooks';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useExternalTextareaObserver } from '@/hooks/useExternalTextareaObserver';

import SyntaxHighlighter from './features/SyntaxHighlighter';
import { useStyles } from './style';

interface AppProps {
  parentId: string;
}

const Index = memo<AppProps>(({ parentId }) => {
  const ref: any = useRef(null);
  const [prompt, setPrompt] = useState<string>('');
  const { styles, theme } = useStyles();
  const nativeTextareaValue = useExternalTextareaObserver(`${parentId} label textarea`);
  const nativeTextarea = useMemo(
    () => gradioApp().querySelector(`${parentId} label textarea`) as HTMLTextAreaElement,
    [parentId],
  );
  const size = useSize(nativeTextarea);
  const scroll = useScroll(nativeTextarea);

  const handlePromptChange = useCallback((event: any) => {
    setPrompt(event.target.value);
  }, []);

  const handlePromptResize = useCallback(() => {
    if (nativeTextarea.clientHeight < nativeTextarea.scrollHeight) {
      return size?.width === undefined ? '' : size?.width + 6;
    } else {
      return size?.width === undefined ? '' : size?.width + 2;
    }
  }, [nativeTextarea.clientWidth]);

  useEffect(() => {
    ref.current.scroll(0, scroll?.top || 0);
  }, [scroll?.top]);

  useEffect(() => {
    nativeTextarea.addEventListener('change', handlePromptChange);
    return () => {
      nativeTextarea.removeEventListener('change', handlePromptChange);
    };
  }, []);

  useEffect(() => {
    if (theme) {
      nativeTextarea.style.color = 'transparent';
      nativeTextarea.style.caretColor = theme.colorSuccess;
    }
  }, [theme]);

  useEffect(() => {
    setPrompt(nativeTextareaValue);
  }, [nativeTextareaValue]);

  return (
    <div
      className={styles.container}
      data-code-type="highlighter"
      ref={ref}
      style={{ height: size?.height, width: handlePromptResize() }}
    >
      <SyntaxHighlighter>{prompt}</SyntaxHighlighter>
    </div>
  );
});

export default Index;
