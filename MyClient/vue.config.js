// 后台管理模块 导出到公共地方
const path = require("path");
const resolve = dir => path.join(__dirname, dir);
module.exports = {
  runtimeCompiler: true,
  chainWebpack: config => {
    config.resolve.alias.set("@", resolve("src"));
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/assets/common/index.scss";`
      }
    }
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:4399"
      }
    }
  },
  // build: {
    // index:path.resolve(__dirname, "../public/MyClient/index.html"),
    // assetsRoot: path.resolve(__dirname, "../public/MyClient"),
    // assetsSubDirectory:'static',
    // assetsPublicPath: './',
    // productionSourceMap:true,
  // },
  outputDir: path.resolve(__dirname, "../public/MyClient"),
  publicPath: "/MyClient",
  /* assetsDir: process.env.NODE_ENV === 'production'
  ? path.resolve(__dirname, "../public/MyClient/assets")
  : '/assets', */
};
