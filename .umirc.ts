import { defineConfig } from 'umi'
export default defineConfig({
  routes: [{ path: '/', component: 'index' }],
  npmClient: 'yarn',
  mpa: {},
  codeSplitting: false,
  define: {
    'process.env': process.env,
  },
})
