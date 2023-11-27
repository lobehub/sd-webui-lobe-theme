import { consola } from 'consola';
import { createRoot } from 'react-dom/client';

import Page from './app/page';

if (window.global === undefined) window.global = window;

const skipLoad = window.location.href.includes('dev') && process.env.NODE_ENV === 'production';

if (!skipLoad) {
  document.addEventListener(
    'DOMContentLoaded',
    () => {
      consola.start(`🤯 Lobe Theme load in ${process.env.NODE_ENV}`);
      const root = document.createElement('div');
      root.setAttribute('id', 'root');
      try {
        gradioApp()?.append(root);
      } catch {
        document.querySelector('gradio-app')?.append(root);
      }
      const client = createRoot(root);
      client.render(<Page />);
    },
    { once: true },
  );
}
