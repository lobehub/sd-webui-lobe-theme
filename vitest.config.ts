import { defineConfig } from 'vitest/config';

import { name } from './package.json';

export default defineConfig({
  test: {
    alias: {
      '@': './src',
      [name]: './src',
    },
    environment: 'jsdom',
    globals: true,
  },
});
