import { DivProps } from '@lobehub/ui';
import { memo, useEffect, useRef } from 'react';

import PromptGroup from '@/slots/PromptEditor';

const Inner = memo<DivProps>(() => {
  const sidebarReference: any = useRef<HTMLElement>();

  useEffect(() => {
    const sidebar = gradioApp().querySelector('#quicksettings');
    if (sidebar) sidebarReference.current?.append(sidebar);
  }, []);

  return (
    <>
      <PromptGroup />
      <div ref={sidebarReference} />
    </>
  );
});

export default Inner;
