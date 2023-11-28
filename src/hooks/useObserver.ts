import { useEffect, useState } from 'react';

const observerOptions = {
  attributes: true,
  characterData: true,
  childList: true,
  subtree: true,
};

export const useObserver = (
  selector: string,
  { subSelector, valueProp = 'innerHTML' }: { subSelector?: string; valueProp?: string } = {},
) => {
  const [value, setValue] = useState<string>('');
  useEffect(() => {
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList' || mutation.type === 'characterData') {
          if (subSelector) {
            const info = (mutation.target as any).querySelector(subSelector);
            setValue(String(info[valueProp]));
          } else {
            setValue(String((mutation.target as any)?.innerHTML));
          }
        }
      }
    });

    const infoContainer = gradioApp().querySelector(selector);

    if (infoContainer) {
      observer.observe(infoContainer, observerOptions);
      const info = subSelector ? infoContainer.querySelector(subSelector) : infoContainer;
      setValue(String((info as any)?.[valueProp]));
    }

    return () => {
      observer.disconnect();
    };
  }, [selector, subSelector, valueProp]);

  return String(value);
};
