// 后台管理模块 导出到公共地方
const path = require("path");
// const resolve = dir => path.join(__dirname, dir);
const isProduction = process.env.NODE_ENV === "production";

const cdn = {
  externals: {
    vue: "Vue",
    vuex: "Vuex",
    "vue-router": "VueRouter",
    axios: "axios",
    "bootstrap-vue": "bootstrap-vue",
    "animate.css": "animate.css"
  },
  css: [
    "https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.compat.min.css",
    "https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.min.css",
    "https://unpkg.com/bootstrap/dist/css/bootstrap.min.css",
    "https://unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.min.css"
  ],
  js: [
    "https://cdn.bootcss.com/vue/2.6.10/vue.min.js",
    "https://cdn.bootcss.com/vue-router/3.1.3/vue-router.min.js",
    "https://cdn.bootcss.com/vuex/3.1.2/vuex.min.js",
    "https://lib.baomitu.com/element-ui/2.13.2/index.js",
    "https://cdn.bootcss.com/axios/0.19.2/axios.min.js",
    "https://cdn.bootcdn.net/ajax/libs/bootstrap-vue/2.21.0/bootstrap-vue.min.js"
  ]
};

module.exports = {
  runtimeCompiler: true,
  chainWebpack: config => {
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
        "@": path.resolve(__dirname, "./src"),
        "@up": path.resolve(__dirname, "./upload")
      }
    };

    // 在生产环境
    if (isProduction) {
      config.mode = "production";
      config.externals = cdn.externals;

      // 公共代码抽离(分包策略)
      config.optimization.splitChunks.cacheGroups = {
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
          name: "styles",
          test: /\.(le|sa|sc|c)ss$/,
          chunks: "all",
          reuseExistingChunk: true,
          minChunks: 1,
          enforce: true
        }
      };

      // 生产环境删除console
      config.optimization.minimizer[0].options.terserOptions.compress = {
        drop_console: true,
        drop_debugger: false,
        pure_funcs: ["console.log"]
      }; // 移除console
    }
  },

  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/assets/common/index.scss";`
      }
    },
    sourceMap: false
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:4399"
      }
    }
  },
  outputDir: path.resolve(__dirname, "../public/MyClient"),
  publicPath: "/MyClient/"

  // build: {
  // index:path.resolve(__dirname, "../public/MyClient/index.html"),
  // assetsRoot: path.resolve(__dirname, "../public/MyClient"),
  // assetsSubDirectory:'static',
  // assetsPublicPath: './',
  // productionSourceMap:true,
  // },
  /* assetsDir: process.env.NODE_ENV === 'production'
  ? path.resolve(__dirname, "../public/MyClient/assets")
  : '/assets', */
};
