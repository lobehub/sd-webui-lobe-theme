import { CopyButton } from '@lobehub/ui';
import { CSSProperties, memo, useMemo } from 'react';
import { Flexbox } from 'react-layout-kit';

import { useStyles } from '../style';
import Highlighter from './Highlighter';
import { formatInfo } from './formatInfo';

export interface InfoBoxProps {
  className?: string;
  showConfig?: boolean;
  showCopy?: boolean;
  showNegative?: boolean;
  style?: CSSProperties;
  value: string;
}

const InfoBox = memo<InfoBoxProps>(
  ({ value, className, style, showCopy = true, showConfig = true, showNegative = true }) => {
    const { styles, cx } = useStyles();
    const data = useMemo(() => formatInfo(value), [value]);

    if (!value || value === 'undefined' || !data) return null;

    return (
      <Flexbox className={className} gap={4} style={style}>
        {data?.positive && (
          <Highlighter className={styles.highlight} showCopy={showCopy} title={'Positive Prompt'}>
            {data.positive}
          </Highlighter>
        )}
        {showNegative && data?.negative && (
          <Highlighter
            className={cx(styles.highlight, styles.negative)}
            showCopy={showCopy}
            title={'Negative Prompt'}
          >
            {data.negative}
          </Highlighter>
        )}
        {showConfig && data?.config && (
          <Flexbox className={styles.container} style={showCopy ? {} : { paddingRight: 24 }}>
            {Object.entries(data.config).map(([key, value]) => (
              <Flexbox gap={4} horizontal justify={'space-between'} key={key}>
                <Flexbox align={'center'} className={styles.configTitle} horizontal>
                  {key}:
                </Flexbox>
                <Flexbox align={'center'} className={styles.configValue} gap={4} horizontal>
                  {value as string}
                  {showCopy && <CopyButton content={value as string} size={'small'} />}
                </Flexbox>
              </Flexbox>
            ))}
          </Flexbox>
        )}
      </Flexbox>
    );
  },
);

export default InfoBox;
