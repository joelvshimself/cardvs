const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8080, // Cambia este número si necesitas otro puerto
    disableHostCheck: true, // Desactiva la verificación del Host para evitar el error "Invalid Host header"
  }
})
