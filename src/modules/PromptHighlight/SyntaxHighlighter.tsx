import { Icon } from '@lobehub/ui';
import { useThemeMode } from 'antd-style';
import { Loader2 } from 'lucide-react';
import { memo, useEffect } from 'react';
import { Center } from 'react-layout-kit';
import { type HighlighterOptions } from 'shiki-es';

import { useStyles } from './style';
import { useHighlight } from './useHighlight';

export interface SyntaxHighlighterProps {
  children: string;
  language: string;
  options?: HighlighterOptions;
}

const SyntaxHighlighter = memo<SyntaxHighlighterProps>(({ children, language, options }) => {
    const { styles } = useStyles();
    const { isDarkMode } = useThemeMode();
    const [codeToHtml, isLoading] = useHighlight((s) => [s.codeToHtml, !s.highlighter]);

    useEffect(() => {
        useHighlight.getState().initHighlighter(options);
    }, [options]);

    return (
        <>
            {isLoading ? (
                <code>{children}</code>
            ) : (
                <div
                    className={styles.shiki}
                    dangerouslySetInnerHTML={{
                        __html: codeToHtml(children, language, isDarkMode) || '',
                    }}
                />
            )}

            {isLoading && (
                <Center className={styles.loading} gap={8} horizontal>
                    <Icon icon={Loader2} spin />
          Highlighting...
                </Center>
            )}
        </>
    );
});

export default SyntaxHighlighter;
