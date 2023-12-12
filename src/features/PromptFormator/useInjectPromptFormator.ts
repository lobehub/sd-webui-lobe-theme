import { useRef } from 'react';

import { createButton } from '@/features/PromptFormator/createButton';
import { useInject } from '@/hooks/useInject';

export const useInjectPromptFormator = (type: 'txt' | 'img') => {
  const ref = useRef<any>(createButton(type));
  useInject(ref, `#${type}2img_tools > div.form`, {
    inverse: true,
  });
};
