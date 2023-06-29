import { createRoot } from 'react-dom/client';

import App from './App';

if (window.global === undefined) window.global = window;

const skipLoad = window.location.href.includes('dev') && process.env.NODE_ENV === 'production';

if (!skipLoad) {
  document.addEventListener(
    'DOMContentLoaded',
    () => {
      console.time('🤯 Lobe Theme load in DevMode');
      const root = document.createElement('div');
      root.setAttribute('id', 'root');
      try {
        gradioApp()?.append(root);
      } catch {
        document.querySelector('gradio-app')?.append(root);
      }
      const client = createRoot(root);
      client.render(<App />);
      console.timeEnd('🤯 Lobe Theme load in DevMode');
    },
    { once: true },
  );
}
