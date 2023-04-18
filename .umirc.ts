import { defineConfig } from 'umi'
import WebpackShellPlugin from 'webpack-shell-plugin-next'

const mac = [
  'rm ./javascript/index.js',
  'rm ./style.css',
  'cp ./dist/index.js ./javascript/index.js',
  'cp ./dist/index.css ./style.css',
]

const win = [
  'del javascript\\index.js',
  'del style.css',
  'copy dist\\index.js javascript\\index.js',
  'copy dist\\index.css style.css',
]

export default defineConfig({
  routes: [{ path: '/', component: 'index' }],
  npmClient: 'yarn',
  mpa: {},
  codeSplitting: false,
  define: {
    'process.env': process.env,
  },
  chainWebpack(memo) {
    memo.plugin('shell').use(WebpackShellPlugin, [
      {
        onBuildExit: {
          scripts: process.platform === 'darwin' ? mac : win,
          blocking: false,
          parallel: false,
        },
      },
    ])
  },
})
