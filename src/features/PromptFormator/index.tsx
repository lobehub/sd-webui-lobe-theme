import { memo } from 'react';

import { useInjectPromptFormator } from '@/features/PromptFormator/useInjectPromptFormator';

const PromptFormator = memo(() => {
  useInjectPromptFormator('txt');
  useInjectPromptFormator('img');
  return null;
});

export default PromptFormator;
