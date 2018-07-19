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
    pages: {
      home: {
        // entry for the page
        entry: 'src/home/home.ts',
        // the source template
        template: 'public/home.html',
        // output as dist/index.html
        filename: 'home.html',
        // when using title option,
        // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
        title: 'home Page'
      },
      // when using the entry-only string format,
      // template is inferred to be `public/subpage.html`
      // and falls back to `public/index.html` if not found.
      // Output filename is inferred to be `subpage.html`
      index: {
        // entry for the page
        entry: 'src/main.ts',
        // the source template
        template: 'public/index.html',
        // output as dist/index.html
        filename: 'index.html',
        // when using title option,
        // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
        title: 'index Page'
      },
      login: {
        // entry for the page
        entry: 'src/login/login.ts',
        // the source template
        template: 'public/Login.html',
        // output as dist/index.html
        filename: 'login.html',
        // when using title option,
        // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
        title: 'Login Page'
      },
    },
  }