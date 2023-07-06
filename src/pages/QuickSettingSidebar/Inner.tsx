import { DraggablePanelBody } from '@lobehub/ui';
import isEqual from 'fast-deep-equal';
import { memo, useEffect, useRef } from 'react';

import { PromptEditor } from '@/components';
import { useAppStore } from '@/store';
import { type DivProps } from '@/types';

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
    <DraggablePanelBody>
      {setting.promptEditor && <PromptEditor />}
      <div ref={sidebarReference} />
    </DraggablePanelBody>
  );
});

export default Inner;
