import { useEffect, useState } from 'react';

export const useExternalTextareaObserver = (textareaSelector: string) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    const observerCallback: MutationCallback = (mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes') {
          const externalTextarea = document.querySelector(textareaSelector) as HTMLTextAreaElement;
          setValue(externalTextarea.value);
        }
      }
    };

    const observerOptions: MutationObserverInit = {
      attributes: true,
      characterData: true,
      childList: true,
      subtree: true,
    };

    const observer = new MutationObserver(observerCallback);
    const externalTextarea = document.querySelector(textareaSelector) as HTMLTextAreaElement | null;

    if (externalTextarea) {
      observer.observe(externalTextarea, observerOptions);
      setValue(externalTextarea.value);
    }

    return () => {
      observer.disconnect();
    };
  }, [textareaSelector]);

  return value;
};
