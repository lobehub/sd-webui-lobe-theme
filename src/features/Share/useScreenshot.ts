import { consola } from 'consola';
import dayjs from 'dayjs';
import { domToJpeg, domToPng, domToSvg, domToWebp } from 'modern-screenshot';
import { useCallback, useState } from 'react';

import { ImageType } from './type';

export const useScreenshot = (imageType: ImageType = ImageType.JPG) => {
  const [loading, setLoading] = useState(false);

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

  return {
    loading,
    onDownload: handleDownload,
  };
};
