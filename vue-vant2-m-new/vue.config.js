const path = require('path');
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const modifyVars = require('./src/modifyVars.js');
const port = 9494;

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  outputDir: process.env.outputDir,
  assetsDir: 'static',
  publicPath: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_FLAG=== 'pro' ? '/':'/' : '/',
  devServer: {
    port: port,
    open: false,
    proxy: {
      '/dev-api': {
        target: `https://qietuniu.com`,
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
        'assets': '@/assets',
        'components': '@/components',
        'views': '@/views'
      }
    }
  },
  chainWebpack: config => {
    // 利用空闲时间提前获取用户未来可能会访问的内容
    config.plugins.delete('prefetch')
    config.plugins.delete('preload')
    
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
    types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)));
  },
  lintOnSave: false,
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 37.5,
            propList: ['*'],
            // 该项仅在使用 Circle 组件时需要
            // 原因参见 https://github.com/youzan/vant/issues/1948
            selectorBlackList: ['van-circle__layer']
          })
        ]
      },
      less: {
        modifyVars: modifyVars
      }
    }
  }
};
function addStyleResource(rule) {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [path.resolve(__dirname, 'src/assect/style/var.less')]
    });
}
