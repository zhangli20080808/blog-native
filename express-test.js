// const express = require('express');
const express = require('./express/like-express');
const app = express();

app.use((req, res, next) => {
  console.log('请求开始', req.method, req.url);
  next(); //这个 next 就是下一个 user里的函数
});

app.use((req, res, next) => {
  // 假设处理cookie
  req.cookie = {
    userid: '123',
  };
  next();
});

app.use((req, res, next) => {
  // 假设处理 异步
  console.log('处理异步');

  setTimeout(() => {
    req.body = {
      a: 100,
      b: 200,
    };
    next();
  }, 1000);
});

app.use('/api', (req, res, next) => {
  console.log('处理api路由');
  next();
});

app.get('/api', (req, res, next) => {
  console.log('处理 get api路由');
  next();
});
app.post('/api', (req, res, next) => {
  console.log('处理 post api路由');
  next();
});
// 模拟登陆验证  先进入中间件 执行成功的话我们next 不然我们抛出错误 可以放多个函数 但是不建议
function loginCheck(req, res, next) {
  console.log('模拟登陆失败');
  setTimeout(() => {
    // res.json({
    //   errno: -1,
    //   msg: '失败',
    // });
    // res.json({
    //   errno: 0,
    //   msg: '陈宫',
    // });
    next();
  });
}

app.get('/api/getcookie', loginCheck, (req, res, next) => {
  console.log('处理 cookie');
  res.json({
    errno: 0,
    data: req.cookie,
  });
});
app.post('/api/get-post-data', (req, res, next) => {
  console.log('处理 post data');
  res.json({
    errno: 0,
    data: req.body,
  });
});

app.listen(8010);

/**
 * 两种形式  注册中间件路由  app.use  app.get
 * 实现思路  listen use get next 一个一个往下传  这几个接口
 * 1. 通过app.use来注册中间价，先收集起来
 * 2. 遇到 http 请求 根据path 和 method 来判断触发哪些
 * 3. 实现 next 机制  即上一个通过 next 触发下一个
 */
