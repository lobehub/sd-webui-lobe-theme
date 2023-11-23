import { type Highlighter, type HighlighterOptions, getHighlighter } from 'shiki-es';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

export const languageMap = [] as const;

/**
 * @title 代码高亮的存储对象
 */
interface Store {
  /**
   * @title Convert code to HTML string
   * @param text - The code text
   * @param language - The language of the code
   * @param isDarkMode - Whether it's in dark mode or not
   * @returns HTML string
   */
  codeToHtml: (text: string, language: string, isDarkMode: boolean) => string;
  /**
   * @title Highlighter object
   */
  highlighter?: Highlighter;
  /**
   * @title Initialize the highlighter object
   * @returns Initialization promise object
   */
  initHighlighter: (options?: HighlighterOptions) => Promise<void>;
}

export const useHighlight = createWithEqualityFn<Store>(
    (set, get) => ({
        codeToHtml: (text, language, isDarkMode) => {
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

        initHighlighter: async(options) => {
            if (!get().highlighter) {
                const highlighter = await getHighlighter({
                    langs: options?.langs,
                    themes: options?.themes,
                });

                set({ highlighter });
            }
        },
    }),
    shallow,
);
