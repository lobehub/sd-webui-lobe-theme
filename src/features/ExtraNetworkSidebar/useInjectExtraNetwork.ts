import { useRef } from 'react';

import { useInject } from '@/hooks/useInject';
import { useSelectorRef } from '@/hooks/useSelectorRef';

import { refreshExtraNetwork } from './refreshExtraNetwork';

export const useInjectExtraNetwork = (type: 'txt' | 'img') => {
  const tabReference = useSelectorRef(`div#tab_${type}2img`);
  const extraNetworkSidebarReference = useRef<HTMLDivElement>(null);
  useInject(extraNetworkSidebarReference, `div#${type}2img_extra_tabs`);
  useInject(tabReference, 'div.tabitem.gradio-tabitem', {
    id: `${type}2img_render`,
    onSuccess: () => {
      refreshExtraNetwork(type);
    },
    parent: `div#${type}2img_extra_tabs`,
  });

  return extraNetworkSidebarReference;
};
