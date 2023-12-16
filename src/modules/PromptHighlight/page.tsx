import { consola } from 'consola';
import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';

import Index from './index';
import Layout from './layout';

declare global {
  interface Window {
    ignore_ids_for_localization: any;
  }
}

const PromptHighlight = (parentId: string, containerId: string) => {
  if (document.querySelector(containerId)) return;
  const settingsDiv = document.createElement('div') as HTMLDivElement;
  settingsDiv.id = containerId.replace('#', '');

  (gradioApp().querySelector(parentId) as HTMLDivElement).insertBefore(
    settingsDiv,
    (gradioApp().querySelector(parentId) as HTMLDivElement).firstChild,
  );

  createRoot(settingsDiv).render(
    <StrictMode>
      <Suspense fallback="loading...">
        <Layout>
          <Index parentId={parentId} />
        </Layout>
      </Suspense>
    </StrictMode>,
  );
};

export default () => {
  try {
    PromptHighlight('#txt2img_prompt', '#lobe_txt2img_prompt');
    PromptHighlight('#img2img_prompt', '#lobe_img2img_prompt');
    window.ignore_ids_for_localization['lobe_highlighter'] = 'SPAN';
    consola.success('🤯 [module] inject - PromptHighlight');
  } catch (error) {
    consola.error('🤯 [module] inject - PromptHighlight', error);
  }
};
