import { Icon } from '@lobehub/ui';
import { useThemeMode } from 'antd-style';
import { Loader2 } from 'lucide-react';
import { PropsWithChildren, memo } from 'react';
import { Center } from 'react-layout-kit';

import { useHighlight } from '@/hooks/useHighlight';

import { useStyles } from '../style';

const SyntaxHighlighter = memo<PropsWithChildren>(({ children }) => {
  const { styles } = useStyles();
  const { isDarkMode } = useThemeMode();
  const { data: codeToHtml, isLoading } = useHighlight(children as string, isDarkMode);

  return (
    <>
      {isLoading ? (
        <code>{children}</code>
      ) : (
        <div
          className={styles.shiki}
          dangerouslySetInnerHTML={{
            __html: codeToHtml as any,
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
