const path = require("path");
const CompressionPlugin = require("compression-webpack-plugin");
const isProduction = process.env.NODE_ENV === "production";
const productionGzipExtensions = ["js", "css", "woff", "ttf", "eot"]; // gzip压缩类型
// const proxyUrl = isProduction ? "guozhenqiang.xyz" : "http://localhost:2333";
const cdn = {
  externals: {
    vue: "Vue",
    vuex: "Vuex",
    "vue-router": "VueRouter",
    axios: "axios",
    "animate.css": "animate.css",
    vuetify: "vuetify",
    "vuetify-loader": "vuetify-loader",
    "highlight.js": "highlight.js"
  },
  css: [
    "https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.compat.min.css",
    "https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.min.css",
    "https://cdn.bootcdn.net/ajax/libs/vuetify/2.3.17/vuetify.min.css",
    "https://cdn.bootcdn.net/ajax/libs/highlight.js/10.4.1/styles/monokai-sublime.min.css"
  ],
  js: [
    "https://cdn.bootcss.com/vue/2.6.10/vue.min.js",
    "https://cdn.bootcss.com/vue-router/3.1.3/vue-router.min.js",
    "https://cdn.bootcss.com/vuex/3.1.2/vuex.min.js",
    "https://cdn.bootcss.com/axios/0.19.2/axios.min.js",
    "https://cdn.bootcdn.net/ajax/libs/vuetify/2.3.17/vuetify.min.js",
    "http://cdn.bootcss.com/highlight.js/8.0/highlight.min.js"
  ]
};

module.exports = {
  // transpileDependencies: ["vuetify"],
  css: {
    requireModuleExtension: true,
    extract: true,
    sourceMap: false,
    loaderOptions: {
      scss: {
        prependData: `@import "~@/assets/common/index.scss";`
      }
    }
  },

  chainWebpack: config => {
    /* 添加分析工具*/
    if (process.env.NODE_ENV === "production") {
      if (process.env.npm_config_report) {
        config
          .plugin("webpack-bundle-analyzer")
          .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin)
          .end();
      }
    }
    // 移除 prefetch 插件
    config.plugins.delete("prefetch"),
      config.plugins.delete("preload"),
      // 修改它的选项：
      /* config.plugin("prefetch").tap(options => {
        options[0].fileBlacklist = options[0].fileBlacklist || [];
        options[0].fileBlacklist.push(/myasyncRoute(.)+?\.js$/);
        return options;
      }); */

      // 注入cdn
      config.plugin("html").tap(args => {
        // 生产环境或本地需要cdn时，才注入cdn
        if (isProduction) {
          args[0].cdn = cdn;
        }
        return args;
      });
  },

  configureWebpack: config => {
    config.resolve = {
      extensions: [".js", ".json", ".vue"],
      alias: {
        vue: "vue/dist/vue.js",
        "@": path.resolve(__dirname, "./src")
      }
    };

    // 在生产环境
    if (isProduction) {
      config.mode = "production";
      config.externals = cdn.externals;

      // 分包策略(公共代码抽离)
      /* config.optimization.splitChunks.cacheGroups = {
        vendor: {
          chunks: "all",
          test: /node_modules/,
          name: "vendor",
          minChunks: 1,
          maxInitialRequests: 5,
          minSize: 0,
          priority: 100
        },
        common: {
          chunks: "all",
          test: /[\\/]src[\\/]js[\\/]/,
          name: "common",
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
          priority: 60
        },
        styles: {
          name: "styless",
          test: /\.(le|sa|sc|c)ss$/,
          chunks: "all",
          reuseExistingChunk: true,
          minChunks: 1,
          enforce: true,
          maxInitialRequests: 5,
          minSize: 0,
          priority: 60
        }
      }; */

      // 生产环境删除console
      config.optimization.minimizer[0].options.terserOptions.compress = {
        drop_console: true,
        drop_debugger: false,
        pure_funcs: ["console.log"]
      };

      // gzip压缩
      config.plugins.push(
        new CompressionPlugin({
          filename: "[path].gz[query]",
          // 压缩算法
          algorithm: "gzip",
          // 匹配文件
          test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
          minRatio: 0.8,
          threshold: 1024 // 对超过10k的数据压缩
          //删除原始文件只保留压缩后的文件
          // deleteOriginalAssets: isProduction
        })
      );
    }
  },
  devServer: {
    disableHostCheck: true, // 内网穿透
    port: 8023 //本地项目端口
    /* proxy: {
      "/api": {
        target: proxyUrl
      }
    } */
  },
  /* outputDir:{
    path:path.resolve(__dirname, "../public"),
    filename:
  }, */

  parallel: require("os").cpus().length > 1,
  outputDir: path.resolve(__dirname, "../public"),
  // publicPath: process.env.NODE_ENV === "production" ? "./" : "/", // 引用路径（这个会导致懒加载报错： Loading chunk *** failed.）
  publicPath: "/", // 引用路径
  assetsDir: "static",
  productionSourceMap: false
};
