const path = require('path')
const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')
const modifyVars = require('./src/modifyVars.ts')
const port = 9494

const merge = require('webpack-merge')
const tsImportPluginFactory = require('ts-import-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  outputDir: process.env.outputDir,
  assetsDir: 'static',
  publicPath:
    process.env.NODE_ENV === 'production'
      ? process.env.VUE_APP_FLAG === 'pro'
        ? '/'
        : '/'
      : '/',
  devServer: {
    port: port,
    open: false,
    proxy: {
      '/dev-api': {
        target: 'https://qietuniu.com',
        changeOrigin: true,
        pathRewrite: {
          '^/dev-api': ''
        }
      }
    },
    disableHostCheck: true
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
        assets: '@/assets',
        components: '@/components',
        views: '@/views'
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [resolve('src/assets/style/var.less')]
    }
  },
  chainWebpack: config => {
    config.plugins.delete('prefetch')
    config.plugins.delete('preload')
    config.module
      .rule('ts')
      .use('ts-loader')
      .tap(options => {
        options = merge(options, {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [
              tsImportPluginFactory({
                libraryName: 'vant',
                libraryDirectory: 'es',
                style: true
              })
            ]
          }),
          compilerOptions: {
            module: 'es2015'
          }
        })
        return options
      })
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 37.5,
            propList: ['*'],
            selectorBlackList: ['van-circle__layer']
          })
        ]
      },
      less: {
        modifyVars: modifyVars
      }
    }
  },
  transpileDependencies: ['vuex-module-decorators']
}
