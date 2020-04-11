# nodejs 和 javascript 的区别

1. ES 语法规范
   [ES6](https://es6.ruanyifeng.com/) 全都是语法的东西

   - 定义了语法，写 js 和 nodejs 都必须遵守
   - 定义变量 循环 判断 函数
   - 原型和原型链 作用域和闭包 异步

2. javascript
   使用了 es 的语法外加 web api(w3c 标准)，缺一不可
   dom 操作 bom 操作 事件绑定 ajax
   两者结合，即可完成浏览器端的任何操作

3. node
   使用了 es 的语法外加 nodejs api(w3c 标准)，缺一不可
   处理 http，处理文件
   两者结合，即可完成 server 端的任何操作

# commonjs 模块化

```
b.js-> module.export = {add,mul}  a.js->const {add,mul} = require('./b')
```

# nodejs debugger

# server 服务稳定性 考虑 cpu 优化拓展 日志记录 安全 集群 服务拆分 page view 页面浏览量 集群服务拆分

# 用 stream 写日志，使用 redis 存 session 优化内存和 cpu

# 日志记录

# 数据如何存储

1. 博客

- 表存储 设计结果 id title createTime author
- 用户 id username password realName

# 接口对接,接口设计

获取博客列表 /api/blog/list get keyword
获取博客详情 /api/blog/detail get id
新增博客 /api/blog/new post id
编辑博客 /api/blog/update post id
删除博客 /api/blog/del post id
登录 /api/user/login post

# 关于登录

# nodejs 处理 http 请求

1. get queryString
2. post 通过 post Data 传递数据
3. 路由

# 使用 cross-env 设置环境变量 兼容 mac linux 和 windows

# 登录校验 登录信息存储

1. cookies session 查看修改 登录验证
2. session 写入 redis

# cookie

1. cookie 概念 最大 5kb 跨域不共享 结构化数据 k1=v1;k2=v2;

- 每次发送 http 请求 会将请求域的 cookie 一起发送给 server
- server 可以修改 cookie 的值并返回给浏览器
- 浏览器动态操作 cookie 有限制

2. javascript 操作 cookie
3. server 端操作 cookie

# session

cookie 存储是比较危险的，解决方案 cookie 存储 userid(标识) server 端对应 username
session 即 server 端存储用户信息

# session 的问题

1.  目前 session 直接 js 变量 放在 nodejs 进程没存中
2.  进程内存有限 访问量过大 内存暴增怎么办 操作系统会给每一个进程分配一个有限的内存块 会限制每个进程的最大内存
3.  正式上线之后是多进程的 进程之间无法共享

正式上线 我们的 nodejs 程序是分多个进程跑的 你跑一个进程 不是太浪费了嘛  
能访问哪个进程是随机的

解决方案

# redis

1. web server 最常用的缓存数据库，数据存放在内存中 读写块 昂贵 一关就没了
2. 相比约 mysql 访问速度快
3. 但是成本更高，可存储的数据量更小

# 为何 session 适合用 redis

1. session 访问频繁 对性能要求极高 对比 mysql
2. session 可不考虑断电丢失数据的问题
3. session 数据量不会很大

# 为何网站数据不适合用 redis

1. 操作频率不是太高
2. 断电不能丢失，必须保留
3. 数据量太大，内存成本太高

# 日志

1. nodejs 文件操作 nodejs stream 为了节省 cup 和内存 我们要用 stream 的方式去做 性能提升
   日志存储到文件中 为什么不存在 mysql 中(如何没有那种复杂的查表，没必要放到 mysql 中)为什么不存在 redis 中？(内存数据库)
2. 日志功能开发使用
3. 日志拆分 内容分析 我们拆完之后也可以吧日志扔到其他的服务器去呀
   - 实现方式 linxu 的 crontab 命令 即定时任务
   - 分钟 小时 日期 月份 星期 command
   - 将 access.log 拷贝并重命名为 2019-02-10.access.log
   - 清空 access.log 文件 重新积累日志
   - crontab -e
   - 使用 nodejs 的 readline 基于 stream 效率高
