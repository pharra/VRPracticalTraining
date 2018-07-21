module.exports = {
  assetsDir: 'webStatic',
  devServer: {
    proxy: {
      '/static': {
        target: 'http://127.0.0.1:8000/',
        ws: true,
        changeOrigin: true,
      },
      '/api': {
        target: 'http://127.0.0.1:8000/',
        ws: true,
        changeOrigin: true,
      },
    },
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
      title: 'home Page',
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
      title: 'index Page',
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
      title: 'Login Page',
    },
  },
  configureWebpack: {
    entry: {
      main: './src/home/home.ts', //入口js文件1
      login: './src/login/login.ts', //入口js文件2
      project: './src/main.ts',
    },
    // plugins: [
    //   new webpack.htmlWebpackPlugin({
    //     filename: 'index.html', //输出的html路径
    //     template: 'index.html', //html模板路径
    //     //inject : 'head',  //js文件在head中，若为body则在body中
    //     inject: 'body',
    //     //excludeChunks: ['main'],//打包时不打包main.js文件
    //     chunks: ['main'], //打包时只打包main和a的js文件，见entry，注意使用chunks时模板index.html文件里面不允许有script标签，即使注释掉也会报错
    //     date: new Date() /*,
    //       minify : {
    //           removeComments : true, //打包后删除参数
    //           collapseWhitespace : true //打包后删除空格
    //       }*/,
    //   }),
    //   new webpack.htmlWebpackPlugin({
    //     filename: 'login.html', //输出的html路径
    //     template: 'login.html', //html模板路径
    //     //inject : 'head',  //js文件在head中，若为body则在body中
    //     inject: 'body',
    //     //excludeChunks: ['main'],//打包时不打包main.js文件
    //     chunks: ['login'], //打包时只打包main和a的js文件，见entry，注意使用chunks时模板index.html文件里面不允许有script标签，即使注释掉也会报错
    //     date: new Date() /*,
    //       minify : {
    //           removeComments : true, //打包后删除参数
    //           collapseWhitespace : true //打包后删除空格
    //       }*/,
    //   }),
    //   new webpack.htmlWebpackPlugin({
    //     filename: 'home.html', //输出的html路径
    //     template: 'home.html', //html模板路径
    //     //inject : 'head',  //js文件在head中，若为body则在body中
    //     inject: 'body',
    //     //excludeChunks: ['main'],//打包时不打包main.js文件
    //     chunks: ['home'], //打包时只打包main和a的js文件，见entry，注意使用chunks时模板index.html文件里面不允许有script标签，即使注释掉也会报错
    //     date: new Date() /*,
    //       minify : {
    //           removeComments : true, //打包后删除参数
    //           collapseWhitespace : true //打包后删除空格
    //       }*/,
    //   }),
    // ],
  },
};
