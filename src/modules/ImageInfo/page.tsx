import { consola } from 'consola';
import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';

import Inedx from './index';
import Layout from './layout';

const ImageInfo = (parentId: string, containerId: string) => {
  if (document.querySelector(containerId)) return;
  const settingsDiv = document.createElement('div') as HTMLDivElement;
  settingsDiv.id = containerId.replace('#', '');

  (gradioApp().querySelector(parentId) as HTMLDivElement).append(settingsDiv);

  createRoot(settingsDiv).render(
    <StrictMode>
      <Suspense fallback="loading...">
        <Layout>
          <Inedx parentId={parentId} />
        </Layout>
      </Suspense>
    </StrictMode>,
  );
};

export default () => {
  try {
    ImageInfo('#html_info_txt2img', '#lobe_html_info_txt2img');
    ImageInfo('#html_info_img2img', '#lobe_html_info_img2img');
    consola.success('🤯 [module] inject - ImageInfo');
  } catch (error) {
    consola.error('🤯 [module] inject - ImageInfo', error);
  }
};
