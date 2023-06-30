// @ts-ignore
import { type Highlighter, getHighlighter } from 'shiki-es';
import { create } from 'zustand';

import grammar from '@/components/SyntaxHighlighter/prompt.tmLanguage.json';
import { themeConfig } from '@/components/SyntaxHighlighter/promptTheme';

interface Store {
  codeToHtml: (text: string, language: string, isDarkMode: boolean) => string;
  highlighter?: Highlighter;
  initHighlighter: () => Promise<void>;
}

export const useHighlight = create<Store>((set, get) => ({
  codeToHtml: (text, language = 'prompt', isDarkMode) => {
    const { highlighter } = get();

    if (!highlighter) return '';

    try {
      return highlighter?.codeToHtml(text, {
        lang: language,
        theme: isDarkMode ? 'dark' : 'light',
      });
    } catch {
      return text;
    }
  },
  highlighter: undefined,

  initHighlighter: async() => {
    if (!get().highlighter) {
      const highlighter = await getHighlighter({
        langs: [
          {
            aliases: ['prompt'],
            grammar: grammar,
            id: 'prompt',
            scopeName: 'source.prompt',
          },
        ],
        themes: [themeConfig(true), themeConfig(false)],
      });

      set({ highlighter });
    }
  },
}));
