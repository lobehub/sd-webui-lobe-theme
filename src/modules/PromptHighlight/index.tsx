import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';

import Layout from '@/layouts';

import App from './App';

export const PromptHighlight = (parentId: string, containerId: string) => {
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
          <App parentId={parentId} />
        </Layout>
      </Suspense>
    </StrictMode>,
  );
};
