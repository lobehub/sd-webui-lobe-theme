import { memo, useEffect } from 'react';

import { useObserver } from '@/hooks/useObserver';

import InfoBox from './features/InfoBox';

const Index = memo<{ parentId: string }>(({ parentId }) => {
  const value = useObserver(`${parentId} .infotext`, { subSelector: 'p' });

  useEffect(() => {
    const infoContainer = gradioApp().querySelector(`${parentId} .infotext`) as HTMLDivElement;
    infoContainer.style.display = 'none';
  }, []);

  return <InfoBox value={value} />;
});

export default Index;
