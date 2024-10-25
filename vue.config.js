const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/', // Cambia esto si tu aplicación está en una subcarpeta
  devServer: {
    port: 8080,
    allowedHosts: 'all',
  }
})
