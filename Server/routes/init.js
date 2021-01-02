// express (中间件) 模块

// const http = require('http');
const express = require('express');
const cors = require('cors');
// const session = require('express-session');
const path = require('path');
const cookieSession = require('cookie-session');
// const history = require('connect-history-api-fallback');

const app = express();
// app.use(history());

/**
 * 是否允许 cors 跨域请求
 */
const whiteList = ["http://localhost:4399", "http://localhost:8081", "http://localhost:8080", "http://127.0.0.1:5500", "http://127.0.0.1:5501", "http://localhost:5006", "http://localhost:5002", "http://localhost:2333"];
app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        callback(null, "*");
        return;
      }
      if (whiteList.includes(origin)) {
        callback(null, origin);
      } else {
        callback(new Error("not allowed"));
      }
    },
    credentials: true,
  })
);

// session 验证
// app.use(session({
//   secret: 'barry',
//   name: 'mySessionId',
//   httpOnly:false,
//   cookie:{
//     domain:"127.0.0.1",
//     secure:!true
//   }
// }));

/**
 * 快速搭建第三方服务器
 */
const staticRoot = path.resolve(__dirname, '../../public');
app.use(express.static(staticRoot));



// 加入cookie-parser 中间件
// 加入之后，会在req对象中注入cookies属性，用于获取所有请求传递过来的cookie
// 加入之后，会在res对象中注入cookie方法，用于设置cookie
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// 处理token中间件
app.use(require('./utils/tokenMidWare.js'));

/**
 * 解析一些格式的请求
 */
// 解析 application/x-www-form-urlencoded 格式请求
app.use(express.urlencoded({
  extended: true,
}));
// 解析 application/json() 格式的请求
app.use(express.json());

/**
 * 各种接口
 */
// app.use(require('./utils/captchaMid.js'));
app.use('/admin', require('./api/admin.js')); //用户接口
app.use('/categories', require('./api/category.js')); // 文章分类接口
app.use('/articles', require('./api/article.js')); //文章接口：用户/分类名字/
app.use('/api/upload', require('./api/upload.js')); // 文创头像接口
app.use('/comment', require('./api/comment.js')); // 评论接口：用户/分类名字/文章id
app.use('/dayWords', require('./api/dayWords.js')); // 评论接口：用户/分类名字/文章id
app.use(require('./utils/errMiddleware.js')); //捕获错误


/**
 * 创建服务器
 */
// const server = http.createServer(app);
const port = 2333;
app.listen(port, () => {
  console.log(`正在监听${port}端口！`);
})
