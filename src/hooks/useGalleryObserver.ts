import { useEffect, useState } from 'react';

const observerOptions = {
  attributes: true,
  characterData: true,
  childList: true,
  subtree: true,
};

export const useGalleryObserver = (selector: string) => {
  const [value, setValue] = useState<string>('');
  const [allValue, setAllValue] = useState<string[]>([]);
  useEffect(() => {
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList' || mutation.type === 'characterData') {
          const info = (mutation.target as any).querySelector('img[data-testid="detailed-image"]');
          const infoDoms = (mutation.target as any).querySelectorAll('.thumbnails button img');
          const infos = Array.from(infoDoms)
            .filter(Boolean)
            .map((i: any) => i.src);
          setValue(String(info.src));
          setAllValue(infos);
        }
      }
    });

    const infoContainer = gradioApp().querySelector(selector);

    if (infoContainer) {
      observer.observe(infoContainer, observerOptions);
      const info = infoContainer.querySelector('img[data-testid="detailed-image"]');
      const infoDoms = infoContainer.querySelectorAll('.thumbnails button img');
      const infos = Array.from(infoDoms)
        .filter(Boolean)
        .map((i: any) => i.src);
      setValue((info as any)?.src);
      setAllValue(infos);
    }

    return () => {
      observer.disconnect();
    };
  }, [selector]);

  return {
    image: value,
    images: allValue,
  };
};
