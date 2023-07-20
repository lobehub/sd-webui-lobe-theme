import { SyntaxHighlighter } from '@lobehub/ui';
import { useScroll, useSize } from 'ahooks';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useExternalTextareaObserver } from '@/hooks/useExternalTextareaObserver';

import grammar from './prompt.tmLanguage.json';
import { themeConfig } from './promptTheme';
import { useStyles } from './style';

const options: any = {
  langs: [
    {
      aliases: ['prompt'],
      grammar,
      id: 'prompt',
      scopeName: 'source.prompt',
    },
  ],
  themes: [themeConfig(true), themeConfig(false)],
};

interface AppProps {
  parentId: string;
}

const App = memo<AppProps>(({ parentId }) => {
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
      style={{ height: size?.height, width: size?.width }}
    >
      <SyntaxHighlighter language="prompt" options={options}>
        {prompt.trim()}
      </SyntaxHighlighter>
    </div>
  );
});

export default App;
