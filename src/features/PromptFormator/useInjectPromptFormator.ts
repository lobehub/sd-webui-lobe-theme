import { useRef } from 'react';

import { useInject } from '@/hooks/useInject';

import { createButton } from './createButton';

export const useInjectPromptFormator = (type: 'txt' | 'img') => {
  const ref = useRef<any>(createButton(type));
  useInject(ref, `#${type}2img_tools > div.form`, {
    inverse: true,
  });
};
