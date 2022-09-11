// vue.config.js
const path = require('path')
module.exports = {
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // // 1. 直接覆盖变量
            // 'text-color': '#111',
            // 'border-color': '#eee',
            // 2. 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            hack: `true; @import "${path.join(__dirname, '/src/style/cover.less')}";`
          }
        }
      }
    }
  }
  // devServer: {
  //   host: '192.168.2.5',
  //   port: 8080,
  //   client: {
  //     webSocketURL: 'ws://192.168.2.5:8080/ws'
  //   },
  //   headers: {
  //     'Access-Control-Allow-Origin': '*'
  //   }
  // }
}
