const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer:{
    proxy:{
      "/api":{
        "target":"http://192.168.10.186:9090/", //http://192.168.10.186:9090/
        "secure":false,   // 是否接受https请求
        "changeOrigin":true, // 启动一个虚拟服务，用于转发请求。实现跨域请求
        "pathRewrite":{
          "^/api":""
        }
      }
    }
  }
})

