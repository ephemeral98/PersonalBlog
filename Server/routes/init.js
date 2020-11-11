// express (中间件) 模块

// const http = require('http');
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const path = require('path');

const app = express();

// 测试接口
app.use('/barry/', (req, res, next) => {
  console.log('hello，barry！');
  next();
});

// session 验证
/* app.use(session({
  secret: 'barry',
  name: 'allen'
})); */

/**
 * 快速搭建第三方服务器
 */
const staticRoot = path.resolve(__dirname, '../../../public');
app.use(express.static(staticRoot));

/**
 * 是否允许 cors 跨域请求
 */
const whiteList = ["null", "http://localhost:8080", "http://127.0.0.1:5500", "http://localhost:4399"];
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
app.use('/admin', require('./api/admin.js')); //用户接口
app.use('/categories', require('./api/category.js')); // 文章分类接口
app.use('/articles', require('./api/article.js')); //文章接口：用户/分类名字/
app.use('/api/upload', require('./api/upload.js')); // 文创头像接口
// app.use('/:loginId/:name/:id', require('./api/issues.js')); // 评论接口：用户/分类名字/文章id


/**
 * 创建服务器
 */
// const server = http.createServer(app);
const port = 4399;
app.listen(port, () => {
  console.log(`正在监听${port}端口！`);
})
