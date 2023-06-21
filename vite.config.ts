import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: 'dev',
  build: {
    outDir: './',
    rollupOptions: {
      input: resolve(__dirname, 'src/main.tsx'),
      output: {
        assetFileNames: `javascript/[name].[ext]`,
        chunkFileNames: `javascript/[name].js`,
        entryFileNames: `javascript/[name].js`,
      },
    },
  },
  plugins: [
    react({
      babel: {
        plugins: ['@babel/plugin-syntax-import-assertions'],
      },
    }),
    {
      configureServer: (server) => {
        server.middlewares.use((_request, res, next) => {
          res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none');
          res.setHeader('Cross-Origin-Opener-Policy', 'unsafe-non');
          next();
        });
      },
      name: 'configure-response-headers',
    },
    {
      configureServer: (server) => {
        server.middlewares.use(async(_request, res, next): Promise<void> => {
          if (
            _request.originalUrl === '/dev' ||
            _request.originalUrl === '/dev?__theme=dark' ||
            _request.originalUrl === '/dev?__theme=light'
          ) {
            const response = await fetch('http://127.0.0.1:7860/');

            let updatedResponse = await response.text();

            const toAdd = `
                        <script type="module" src="/dev/src/_react_refresh.js"></script>
                        <script type="module" src="/dev/src/main.tsx"></script>
                       `;

            // replace </body> with </body><script type="module" src="/main.js"></script>
            updatedResponse = updatedResponse.replace('</body>', `</body>${toAdd}`);

            // Set the modified response
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.setHeader('charset', 'utf8');
            res.end(updatedResponse);
            return;
          }

          // Continue to the next middleware
          next();
        });
      },
      name: 'route-default-to-index',
    },
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    host: '127.0.0.1',
    port: 5173,
    proxy: {
      '/queue/join': {
        target: 'ws://127.0.0.1:7860',
        ws: true,
      },
      '^(?!.*dev).*$': 'http://127.0.0.1:7860',
    },
  },
});
