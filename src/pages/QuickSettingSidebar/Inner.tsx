import { DivProps } from '@lobehub/ui';
import isEqual from 'fast-deep-equal';
import { memo, useEffect, useRef } from 'react';

import { SidebarBody } from '@/components';
import PromptGroup from '@/slots/PromptEditor';
import { useAppStore } from '@/store';

const Inner = memo<DivProps>(() => {
  const setting = useAppStore((st) => st.setting, isEqual);
  const sidebarReference = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.time('🤯 [layout] inject - QuickSettingSidebar');
    const sidebar = gradioApp().querySelector('#quicksettings');
    if (sidebar) sidebarReference.current?.append(sidebar);
    console.timeEnd('🤯 [layout] inject - QuickSettingSidebar');
  }, []);

  return (
    <SidebarBody>
      {setting.promptEditor && <PromptGroup />}
      <div ref={sidebarReference} />
    </SidebarBody>
  );
});

export default Inner;
