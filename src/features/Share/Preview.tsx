import { Logo } from '@lobehub/ui';
import { Button, SegmentedProps } from 'antd';
import { consola } from 'consola';
import dayjs from 'dayjs';
import { domToJpeg, domToPng, domToSvg, domToWebp } from 'modern-screenshot';
import { PropsWithChildren, memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import pkg from '@/../package.json';

import { useStyles } from './style';

export enum ImageType {
  JPG = 'jpg',
  PNG = 'png',
  SVG = 'svg',
  WEBP = 'webp',
}

export const imageTypeOptions: SegmentedProps['options'] = [
  {
    label: 'JPG',
    value: ImageType.JPG,
  },
  {
    label: 'PNG',
    value: ImageType.PNG,
  },
  {
    label: 'SVG',
    value: ImageType.SVG,
  },
  {
    label: 'WEBP',
    value: ImageType.WEBP,
  },
];

interface PreviewProps extends PropsWithChildren {
  imageType: ImageType;
  withBackground: boolean;
  withFooter: boolean;
}

const Preview = memo<PreviewProps>(({ imageType, withBackground, withFooter, children }) => {
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();
  const { styles } = useStyles(withBackground);

  const handleDownload = useCallback(async() => {
    setLoading(true);
    try {
      let screenshotFn: any;
      switch (imageType) {
        case ImageType.JPG: {
          screenshotFn = domToJpeg;
          break;
        }
        case ImageType.PNG: {
          screenshotFn = domToPng;
          break;
        }
        case ImageType.SVG: {
          screenshotFn = domToSvg;
          break;
        }
        case ImageType.WEBP: {
          screenshotFn = domToWebp;
          break;
        }
      }

      const dataUrl = await screenshotFn(document.querySelector('#preview') as HTMLDivElement, {
        features: {
          // 不启用移除控制符，否则会导致 safari emoji 报错
          removeControlCharacter: false,
        },
        scale: 2,
      });
      const link = document.createElement('a');
      link.download = `LobeTheme_${dayjs().format('YYYY-MM-DD')}.${imageType}`;
      link.href = dataUrl;
      link.click();
      setLoading(false);
    } catch (error) {
      consola.error('🤯 Failed to download image', error);
      setLoading(false);
    }
  }, [imageType]);

  return (
    <>
      <div className={styles.preview}>
        <div className={withBackground ? styles.background : undefined} id={'preview'}>
          <Flexbox className={styles.container} gap={16}>
            {children}
            {withFooter ? (
              <Flexbox align={'center'} className={styles.footer} gap={4}>
                <Logo extra={'SD'} type={'combine'} />
                <div className={styles.url}>{pkg.homepage}</div>
              </Flexbox>
            ) : (
              <div />
            )}
          </Flexbox>
        </div>
      </div>
      <Button block loading={loading} onClick={handleDownload} size={'large'} type={'primary'}>
        {t('shareModal.download')}
      </Button>
    </>
  );
});

export default Preview;
