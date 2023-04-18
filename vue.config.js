module.exports = {
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
    proxy: {
      "/api": {
        target: "http://192.168.31.94:8080",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
};
