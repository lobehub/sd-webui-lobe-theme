import { Footer as F } from '@lobehub/ui';
import isEqual from 'fast-deep-equal';
import { memo, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { selectors, useAppStore } from '@/store';
import { type DivProps } from '@/types';

import { Community, Help, MoreProducts, Resources } from './data';
import { useStyles } from './style';

const Footer = memo<DivProps>(({ className, ...props }) => {
  const setting = useAppStore(selectors.currentSetting, isEqual);
  const { cx, styles } = useStyles();
  const { t } = useTranslation();
  const footerReference = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.time('🤯 [layout] inject - Footer');
    const footer = gradioApp().querySelector('#footer');
    if (footer) footerReference.current?.append(footer);
    console.timeEnd('🤯 [layout] inject - Footer');
  }, []);
  return (
    <div className={cx(styles.footer, className)} {...props}>
      <F
        bottom={<div ref={footerReference} />}
        columns={
          setting.layoutHideFooter ?
            [] :
            [
                {
                  items: Resources,
                  title: t('resources'),
                },
                {
                  items: Community,
                  title: t('community'),
                },
                {
                  items: Help,
                  title: t('help'),
                },
                {
                  items: MoreProducts,
                  title: t('moreProducts'),
                },
              ]
        }
      />
    </div>
  );
});

export default Footer;
