import { SyntaxHighlighter } from '@lobehub/ui';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Editor from 'react-simple-code-editor';
import { shallow } from 'zustand/shallow';

import { useExternalTextareaObserver } from '@/hooks/useExternalTextareaObserver';
import { useAppStore } from '@/store';

import grammar from './prompt.tmLanguage.json';
import { themeConfig } from './promptTheme';
import { useStyles } from './style';

interface AppProps {
  parentId: string;
}

const App = memo<AppProps>(({ parentId }) => {
  const reference = useRef(null);
  const [prompt, setPrompt] = useState<string>('');
  const themeMode = useAppStore((s) => s.themeMode, shallow);
  const { styles, cx } = useStyles();
  const nativeTextareaValue = useExternalTextareaObserver(`${parentId} label textarea`);

  const nativeTextarea = useMemo(
    () => gradioApp().querySelector(`${parentId} label textarea`) as HTMLTextAreaElement,
    [parentId],
  );

  const handlePromptChange = useCallback((event: any) => {
    setPrompt(event.target.value);
  }, []);

  useEffect(() => {
    nativeTextarea.style.minHeight = '0';
    nativeTextarea.style.maxHeight = '0';
    nativeTextarea.style.padding = '0';
    nativeTextarea.style.opacity = '0';
    nativeTextarea.addEventListener('change', handlePromptChange);

    return () => {
      nativeTextarea.removeEventListener('change', handlePromptChange);
    };
  }, []);

  useEffect(() => {
    setPrompt(nativeTextareaValue);
  }, [nativeTextareaValue]);

  const onBlur = useCallback(() => {
    nativeTextarea.value = prompt;

    const event = new Event('input');
    nativeTextarea.dispatchEvent(event);
  }, [prompt]);

  return (
    <Editor
      className={cx(styles.editor, 'prompt_editor')}
      highlight={(code) => (
        <SyntaxHighlighter
          language="prompt"
          options={{
            langs: [
              {
                aliases: ['prompt'],
                grammar: grammar as any,
                id: 'prompt',
                scopeName: 'source.prompt',
              },
            ],
            themes: [themeConfig(true), themeConfig(false)],
          }}
          theme={themeMode}
        >
          {code}
        </SyntaxHighlighter>
      )}
      onBlur={onBlur}
      onKeyUp={onBlur}
      onValueChange={setPrompt}
      padding={8}
      placeholder={nativeTextarea.placeholder}
      ref={reference}
      textareaClassName={cx(styles.textarea)}
      value={prompt}
    />
  );
});

export default App;
