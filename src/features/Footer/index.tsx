import { Footer as F } from '@lobehub/ui';
import isEqual from 'fast-deep-equal';
import { memo, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { useInject } from '@/hooks/useInject';
import { selectors, useAppStore } from '@/store';
import { type DivProps } from '@/types';

import { Community, Help, MoreProducts, Resources } from './data';
import { useStyles } from './style';

const Footer = memo<DivProps>(({ className, ...props }) => {
  const setting = useAppStore(selectors.currentSetting, isEqual);
  const { cx, styles } = useStyles();
  const { t } = useTranslation();
  const footerReference = useRef<HTMLDivElement>(null);

  useInject(footerReference, '#footer', {
    debug: '[layout] inject - Footer',
    onSuccess: (footer) => {
      if (!setting.confirmPageUnload) return;
      window.addEventListener('beforeunload', (event) => {
        if (footer?.isConnected) {
          event.preventDefault();
          return (event.returnValue = '');
        }
      });
    },
  });

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
                  title: t('footer.resources'),
                },
                {
                  items: Community,
                  title: t('footer.community'),
                },
                {
                  items: Help,
                  title: t('footer.help'),
                },
                {
                  items: MoreProducts,
                  title: t('footer.moreProducts'),
                },
              ]
        }
      />
    </div>
  );
});

export default Footer;
