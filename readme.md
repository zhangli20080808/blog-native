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
 cookie 存储是比较危险的，解决方案 cookie存储userid(标识)  server端对应username 
 session 即server端存储用户信息 