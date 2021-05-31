## 前言

该项目一开始是在2020年中刚学完Vue2整的一个Demo，本来只有前端，后端用的假数据。后来整着整着，后端用上了 node.js，MySQL。。

由于那时候刚学完Vue不久，加上本来开始就是一个练手的项目，所以有些代码质量不高。。

后面如果有时间的话，前台打算拆掉vuetify等UI框架，用nuxt或者React+Ts进行重构。



## 项目搭建情况

该项目 前端是用Vue2全家桶和一个UI框架vuetify搭建的。为什么不用Element UI？因为那时候听说Element不更新了，就没用它。

别说Element了，我用Vuetify后，发现有点后悔。。，这个东西有点臃肿。当初选择这个UI框架一部分是因为想练习一下UI框架的使用，再者就是对比了 npm 上比较火的几个UI框架（element、iview），发现vuetify的 Material Design 设计风格真的顶！后来用着用着发现，再好的设计，也不是我想要的设计。。所以只用到极少量的组件，这些组件中，后面还会一一改写！

 后端是用 node 的 express 搭建的。然后数据库用的 ORM 框架 Sequelize 映射 MySQL。、

## 文件情况：

> 前台的文件是 Client、后台是 MyClient、服务端是 Server

## 关于前端

### 前台页面

> 设计真的。。花费了我不少时间。参考了很多人的博客风格，最后总结起来的一套设计方案，主色调是的B站的蓝色和骚粉。

> 响应式设计，兼容PC端和手机端两套风格。

1. 看文章
2. 文章分类
3. 时光机（暂时没开发，没有想到好的设计方案）
4. 实验室

 - 告白信
 - 小游戏
 - 戴上耳机进来

5. 留言板
6. 关于我

### 后台页面

> 后台的设计就比较随意了，毕竟只有我看。。

#### 主要功能：

1. 查看文章、修改文章、添加文章、删除文章
2. 查看分类、修改分类、添加分类、删除分类
3. 查看每日一句、修改每日一句、添加每日一句、删除每日一句
4. 查看评论、添加评论、删除评论
5. 修改博主的信息
6. 修改技能加点Lv

目前后台页面有些地方有改动，有空我会更新上去。

##### 不足的地方：

写文章是用 富文本编辑器，那时候用的是wangEditor这个库，真心觉得没有markdown来的方便，后续会改成markdown

## 关于服务器端

> - 三层架构：model 表现层、service 业务逻辑层、routes 数据访问层
> - CORS 解决跨域问题、token验证身份（目前主要是后台验证博主的身份）
> - 博主密码MD5加密，默认1234

#### 数据库表：

1. admin  （用户表，目前只能是博主一个）
2. articles  （文章列表）
3. categories  （文章分类）
4. comments  （评论）
5. daywords  （每日一句）
6. marriages  （告白信模块）
7. skills  （技能加点）



#### 服务器

我用的阿里云ECS的最低配，2020年双十一入手的，首次年费仅84大洋

#### 静态资源OSS

> 我用的是七牛云，为我提供静态资源的外链，我是打着白嫖的心态用的，到目前为止花费了我几毛钱。。

