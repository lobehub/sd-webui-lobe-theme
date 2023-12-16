import { HighlighterCore, getHighlighterCore } from 'shikiji/core';
import { getWasmInlined } from 'shikiji/wasm';
import useSWR from 'swr';

import prompt from '@/modules/PromptHighlight/features/grammar';
import { themeConfig } from '@/modules/PromptHighlight/features/promptTheme';

let cacheHighlighter: HighlighterCore;

const initHighlighter = async(): Promise<HighlighterCore> => {
  let highlighter = cacheHighlighter;

  if (highlighter) return highlighter;

  highlighter = await getHighlighterCore({
    // @ts-ignore
    langs: [prompt],
    loadWasm: getWasmInlined,
    themes: [themeConfig(true), themeConfig(false)],
  });

  cacheHighlighter = highlighter;

  return highlighter;
};

export const useHighlight = (text: string, isDarkMode: boolean) =>
  useSWR([isDarkMode ? 'dark' : 'light', text].join('-'), async() => {
    try {
      const highlighter = await initHighlighter();
      const html = highlighter?.codeToHtml(text, {
        lang: 'prompt',
        theme: isDarkMode ? 'dark' : 'light',
        transformers: [
          {
            code(node) {
              node.properties['id'] = 'lobe_highlighter';
            },
          },
        ],
      });
      return html;
    } catch {
      return text;
    }
  });
