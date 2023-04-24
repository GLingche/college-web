module.exports = {
  publicPath: "./",
  // outputDir:'dist/college-web',
  // path.posix.resolve(this.basePath, routePath),
  pages: {
    index: {
      //入口
      entry: "src/main.js",
    },
  },
  lintOnSave: true, // 语法检查
  //开启代理服务器（方法一）
  devServer: {
    https: false,
    hotOnly: false,
    port: 8060,
    // proxy: {
    //   "/api": {
    //     target: "http://192.168.98.190:8085",
    //     changeOrigin: true,
    //     pathRewrite: {
    //       "^/api": "",
    //     },
    //   },
    // },
  },
};
