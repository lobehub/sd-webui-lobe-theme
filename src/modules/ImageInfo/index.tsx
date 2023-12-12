import { memo } from 'react';

import { useObserver } from '@/hooks/useObserver';
import { useSelectorHide } from '@/hooks/useSelectorHide';

import InfoBox from './features/InfoBox';

const Index = memo<{ parentId: string }>(({ parentId }) => {
  const value = useObserver(`${parentId} .infotext`, { subSelector: 'p' });
  useSelectorHide(`${parentId} .infotext`);

  return <InfoBox value={value} />;
});

export default Index;
