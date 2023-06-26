import { createRoot } from 'react-dom/client';

import App from './App';

if (window.global === undefined) window.global = window;

if (window.location.href.includes('dev') && process.env.NODE_ENV === 'production') {
  console.log('🚧 Theme Loader in Dev Mode');
} else {
  document.addEventListener(
    'DOMContentLoaded',
    () => {
      const root = document.createElement('div');
      root.setAttribute('id', 'root');
      try {
        gradioApp()?.append(root);
      } catch {
        document.querySelector('gradio-app')?.append(root);
      }
      const client = createRoot(root);
      client.render(<App />);
    },
    { once: true },
  );
}
