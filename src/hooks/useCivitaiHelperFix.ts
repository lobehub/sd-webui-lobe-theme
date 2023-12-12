import { consola } from 'consola';
import { useEffect, useRef, useState } from 'react';

import civitaiHelperFix from '@/scripts/civitaiHelperFix';

interface CivitaiHelperFixOptions {
  debug?: string;
  onStart?: () => void;
  onSuccess?: () => void;
  timeout?: number;
}
export const useCivitaiHelperFix = ({
  onStart,
  onSuccess,
  debug,
  timeout = 2000,
}: CivitaiHelperFixOptions = {}) => {
  const [isLoading, setIsLoading] = useState(true);
  const isInject = useRef(false);
  useEffect(() => {
    if (isInject.current) return;
    onStart?.();
    const canInject =
      !!document.querySelector('#tab_civitai_helper') &&
      !!document.querySelector('#txt2img_extra_refresh');

    if (canInject) {
      try {
        setTimeout(() => {
          const txt2imgButton = document.querySelector(
            '#txt2img_extra_refresh',
          ) as HTMLButtonElement;
          const img2imgButton = document.querySelector(
            '#img2img_extra_refresh',
          ) as HTMLButtonElement;
          txt2imgButton.click();
          img2imgButton.click();

          const civitaiText2ImgButton = document.querySelector('#txt2img_extra_refresh')
            ?.nextSibling as HTMLButtonElement;
          if (civitaiText2ImgButton) {
            civitaiText2ImgButton.onclick = civitaiHelperFix;
          }
          const civitaiImg2ImgButton = document.querySelector('#img2img_extra_refresh')
            ?.nextSibling as HTMLButtonElement;
          if (civitaiImg2ImgButton) {
            civitaiImg2ImgButton.onclick = civitaiHelperFix;
          }

          civitaiHelperFix();
        }, timeout);
      } catch (error: any) {
        setIsLoading(false);
        if (debug) consola.success(`🤯 ${debug}`, error);
      }
    }

    onSuccess?.();
    isInject.current = true;
    setIsLoading(false);
    if (debug) consola.success(`🤯 ${debug}`);
  }, []);

  return {
    isLoading,
  };
};
