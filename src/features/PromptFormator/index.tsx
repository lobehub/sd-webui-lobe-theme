import { memo } from 'react';

import { useInjectPromptFormator } from './useInjectPromptFormator';

const PromptFormator = memo(() => {
  useInjectPromptFormator('txt');
  useInjectPromptFormator('img');
  return null;
});

export default PromptFormator;
