import { defineConfig } from 'umi'
import WebpackShellPlugin from 'webpack-shell-plugin-next'
// @ts-ignore
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
// @ts-ignore
import lightningcss from 'lightningcss'
// @ts-ignore
import browserslist from 'browserslist'

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
  npmClient: 'pnpm',
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
    memo.plugin('minimizer').use(CssMinimizerPlugin, [
      {
        minify: CssMinimizerPlugin.lightningCssMinify,
        minimizerOptions: {
          targets: lightningcss.browserslistToTargets(browserslist('>= 0.25%')),
        },
      },
    ])
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
