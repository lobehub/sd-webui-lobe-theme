import { StrictMode, Suspense, memo } from 'react';
import { createRoot } from 'react-dom/client';
import { shallow } from 'zustand/shallow';

import Layout from '@/layouts';
import { useAppStore } from '@/store';

import App from './App';

const Main = memo<{ parentId: string }>(({ parentId }) => {
  const { loading } = useAppStore((st) => ({ loading: st.loading }), shallow);

  return <Layout>{loading === false && <App parentId={parentId} />}</Layout>;
});

export const PromptHighlight = (parentId: string, containerId: string) => {
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
        <Main parentId={parentId} />
      </Suspense>
    </StrictMode>,
  );
};
