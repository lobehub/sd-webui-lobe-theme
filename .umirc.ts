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
  extraBabelPlugins: [
    [
      'babel-plugin-styled-components',
      {
        minify: true,
        transpileTemplateLiterals: true,
        displayName: process.env.NODE_ENV === 'development',
        pure: true,
      },
    ],
  ],
  chainWebpack(memo) {
    memo.plugin('shell').use(WebpackShellPlugin, [
      {
        onBuildExit: {
          scripts: process.platform === 'win32' ? win : mac,
          blocking: false,
          parallel: false,
        },
      },
    ])
  },
})
