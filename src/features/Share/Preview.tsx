import { Logo } from '@lobehub/ui';
import { PropsWithChildren, memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import { GITHUB_REPO_URL } from '@/const/url';

import { useStyles } from './style';
import { FieldType } from './type';

const Preview = memo<FieldType & PropsWithChildren>(({ withBackground, withFooter, children }) => {
  const { styles } = useStyles(withBackground);

  return (
    <div className={styles.preview}>
      <div className={withBackground ? styles.background : undefined} id={'preview'}>
        <Flexbox className={styles.container} gap={16}>
          {children}
          {withFooter ? (
            <Flexbox align={'center'} className={styles.footer} gap={4}>
              <Logo extra={'SD'} type={'combine'} />
              <div className={styles.url}>{GITHUB_REPO_URL}</div>
            </Flexbox>
          ) : (
            <div />
          )}
        </Flexbox>
      </div>
    </div>
  );
});

export default Preview;
