import { consola } from 'consola';
import { useEffect, useRef, useState } from 'react';

import civitaiHelperFix from '@/scripts/civitaiHelperFix';

const replaceCivitaiHelper = (type: 'txt' | 'img') => {
  const button = document.querySelector(`#${type}2img_extra_refresh`) as HTMLButtonElement;
  button.click();

  const civitaiButton = document.querySelector(`#${type}2img_extra_refresh`)
    ?.nextSibling as HTMLButtonElement;
  if (civitaiButton) {
    civitaiButton.onclick = civitaiHelperFix;
  }
};

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
  timeout = 500,
}: CivitaiHelperFixOptions = {}) => {
  const [isLoading, setIsLoading] = useState(true);
  const isInject = useRef(false);
  useEffect(() => {
    if (isInject.current) return;
    onStart?.();
    const canInject =
      !!document.querySelector('#tab_civitai_helper') &&
      !!document.querySelector('#txt2img_extra_refresh');

    let timoutFn: any;

    if (canInject) {
      try {
        timoutFn = setTimeout(() => {
          replaceCivitaiHelper('txt');
          replaceCivitaiHelper('img');
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

    return () => {
      if (timoutFn) clearTimeout(timoutFn);
    };
  }, []);

  return {
    isLoading,
  };
};
