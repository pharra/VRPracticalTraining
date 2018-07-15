module.exports = {
    assetsDir:'webStatic',
    devServer: {
      proxy: {
        '/static': {
          target: 'http://127.0.0.1:8000/',
          ws: true,
          changeOrigin: true
        },
        '/post_login': {
          target: 'http://127.0.0.1:8000/',
          ws: true,
          changeOrigin: true
        },
        '/post_signup': {
          target: 'http://127.0.0.1:8000/',
          ws: true, 
          changeOrigin: true
        }
      }
    },
  }