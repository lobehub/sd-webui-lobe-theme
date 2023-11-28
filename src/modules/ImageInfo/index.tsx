import { CopyButton } from '@lobehub/ui';
import { memo, useEffect } from 'react';
import { Flexbox } from 'react-layout-kit';

import { useObserver } from '@/hooks/useObserver';
import { formatInfo } from '@/modules/ImageInfo/features/formatInfo';

import Highlighter from './features/Highlighter';
import { useStyles } from './style';

const Index = memo<{ parentId: string }>(({ parentId }) => {
  const value = useObserver(`${parentId} .infotext`, { subSelector: 'p' });
  const { styles, cx } = useStyles();

  const data = formatInfo(value);

  useEffect(() => {
    const infoContainer = gradioApp().querySelector(`${parentId} .infotext`) as HTMLDivElement;
    infoContainer.style.display = 'none';
  }, []);

  return (
    <Flexbox gap={4}>
      {data?.positive && (
        <Highlighter className={styles.highlight} title={'Positive Prompt'}>
          {data.positive}
        </Highlighter>
      )}
      {data?.negative && (
        <Highlighter className={cx(styles.highlight, styles.negative)} title={'Negative Prompt'}>
          {data.negative}
        </Highlighter>
      )}
      {data?.config && (
        <Flexbox className={styles.container}>
          {Object.entries(data.config).map(([key, value]) => (
            <Flexbox gap={4} horizontal justify={'space-between'} key={key}>
              <Flexbox className={styles.configTitle} horizontal>
                {key}:
              </Flexbox>
              <Flexbox className={styles.configValue} gap={4} horizontal>
                {value as string}
                <CopyButton content={value as string} size={'small'} />
              </Flexbox>
            </Flexbox>
          ))}
        </Flexbox>
      )}
    </Flexbox>
  );
});

export default Index;
