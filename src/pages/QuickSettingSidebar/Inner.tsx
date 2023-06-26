import { DivProps } from '@lobehub/ui';
import { memo, useEffect, useRef } from 'react';

import { SidebarBody } from '@/components';
import PromptGroup from '@/slots/PromptEditor';

const Inner = memo<DivProps>(() => {
  const sidebarReference: any = useRef<HTMLElement>();

  useEffect(() => {
    const sidebar = gradioApp().querySelector('#quicksettings');
    if (sidebar) sidebarReference.current?.append(sidebar);
  }, []);

  return (
    <SidebarBody>
      <PromptGroup />
      <div ref={sidebarReference} />
    </SidebarBody>
  );
});

export default Inner;
