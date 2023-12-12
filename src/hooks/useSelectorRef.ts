import { RefObject, useRef } from 'react';

export const useSelectorRef = (selectors: string): RefObject<HTMLDivElement> => {
  return useRef<HTMLDivElement>(gradioApp().querySelector(selectors) as HTMLDivElement);
};
