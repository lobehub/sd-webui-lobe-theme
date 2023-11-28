import react from '@vitejs/plugin-react-swc';
import dotenv from 'dotenv';
import { resolve } from 'node:path';
import * as process from 'node:process';
import { defineConfig } from 'vite';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

const SD_HOST = process.env.SD_HOST || '127.0.0.1';
const SD_PORT = process.env.SD_PORT || 7860;

console.log(SD_HOST, SD_PORT);
export default defineConfig({
  base: '/dev',
  build: {
    cssMinify: true,
    emptyOutDir: true,
    minify: 'terser',
    outDir: './javascript',
    rollupOptions: {
      input: resolve(__dirname, 'src/main.tsx'),
      output: {
        assetFileNames: `[name].[ext]`,
        chunkFileNames: `[name].js`,
        entryFileNames: `[name].js`,
      },
    },
  },
  define: {
    'process.env': process.env,
  },
  plugins: [
    react({ devTarget: 'esnext', tsDecorators: true }),

    !isProduction && {
      configureServer: (server) => {
        server.middlewares.use((_request, res, next) => {
          res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none');
          res.setHeader('Cross-Origin-Opener-Policy', 'unsafe-non');
          next();
        });
      },
      name: 'configure-response-headers',
    },
    !isProduction && {
      configureServer: (server) => {
        server.middlewares.use(async(_request, res, next): Promise<void> => {
          if (
            _request.originalUrl === '/dev' ||
            _request.originalUrl === '/dev?__theme=dark' ||
            _request.originalUrl === '/dev?__theme=light'
          ) {
            const response = await fetch(`http://${SD_HOST}:${SD_PORT}/`);

            let updatedResponse = await response.text();

            const toAdd = `
                        <script type="module" src="/dev/src/_react_refresh.js"></script>
                        <script type="module" src="/dev/src/main.tsx"></script>
                       `;
            updatedResponse = updatedResponse.replace('</body>', `</body>${toAdd}`);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.setHeader('charset', 'utf8');
            res.end(updatedResponse);
            return;
          }
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
    port: 8000,
    proxy: {
      '/queue/join': {
        target: `ws://${SD_HOST}:${SD_PORT}`,
        ws: true,
      },
      '^(?!.*dev).*$': `http://${SD_HOST}:${SD_PORT}`,
    },
  },
});
