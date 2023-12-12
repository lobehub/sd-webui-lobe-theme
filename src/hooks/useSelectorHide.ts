import { useEffect } from 'react';

export const useSelectorHide = (selectors: string) => {
  useEffect(() => {
    const ele = gradioApp().querySelector(selectors) as HTMLDivElement;
    if (!ele) return;
    ele.style.display = 'none';
  }, []);
};
