import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import * as process from 'node:process';
import { defineConfig } from 'vite';

const isProduction = process.env.NODE_ENV === 'production';

const SD_HOST = '127.0.0.1';
const SD_PORT = 7860;
export default defineConfig({
  base: '/dev',
  build: {
    cssMinify: true,
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
    terserOptions: {
      compress: {
        arguments: true,
        drop_console: true,
        hoist_funs: true,
        hoist_props: true,
        hoist_vars: true,
        inline: true,
        keep_fargs: false,
        keep_fnames: false,
        keep_infinity: false,
        loops: true,
        passes: 3,
        pure_funcs: [],
        pure_getters: true,
        reduce_vars: true,
        sequences: true,
        unused: true,
      },
      format: {
        comments: false,
      },
    },
  },
  define: {
    'process.env': process.env,
  },
  plugins: [
    react({
      babel: {
        plugins: [
          '@babel/plugin-syntax-import-assertions',
          'babel-plugin-antd-style',
          [
            'babel-plugin-styled-components',
            {
              displayName: !isProduction,
              minify: isProduction,
              pure: true,
              transpileTemplateLiterals: true,
            },
          ],
        ],
      },
    }),
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
