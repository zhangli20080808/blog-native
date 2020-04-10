const handleBlogRoute = require('./src/route/blog');
const handleUserRoute = require('./src/route/user');

const queryString = require('querystring');


function getCookieExpires() {
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
  // cookies 时间格式  Sat, 11 Apr 2020 07:23:13 GMT
  return d.toGMTString();
}

// session 数据
const SESSION_DATA = {};

// 用于处理 post data
const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({});
      return;
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({});
      return;
    }
    let postData = '';
    req.on('data', (chunk) => {
      postData += chunk.toString();
    });
    req.on('end', () => {
      if (!postData) {
        resolve({});
        return;
      }
      resolve(JSON.parse(postData));
    });
  });
  return promise;
};

const serverHandle = (req, res) => {
  res.setHeader('Content-type', 'application/json');
  // 获取path
  const url = req.url;
  req.path = url.split('?')[0];
  // 解析 query
  req.query = queryString.parse(url.split('?')[1]);

  // 解析 cookie 存储到对象
  req.cookie = {};
  const cookieStr = req.headers.cookie || ''; //k1=v1;k2=v2
  cookieStr.split(';').map((item) => {
    if (!item) {
      return;
    }
    const arr = item.split('=');
    const key = arr[0].trim();
    const val = arr[1].trim();
    req.cookie[key] = val;
  });

  // 解析 session
  let userId = req.cookie.userid;
  // 是否需要设置session
  let needSetCookie = false;
  if (userId) {
    if (!SESSION_DATA[userId]) {
      SESSION_DATA[userId] = {};
    }
  } else {
    needSetCookie = true;
    userId = `${Date.now()}_${Math.random()}`;
    SESSION_DATA[userId] = {};
  }
  req.session = SESSION_DATA[userId];
  // 处理post data
  getPostData(req).then((postData) => {
    req.body = postData;
    // 处理路由
    const blogResult = handleBlogRoute(req, res);
    if (blogResult) {
      blogResult.then((blogData) => {
        if (needSetCookie) { 
          res.setHeader(
            'Set-Cookie',
            `userid=${userId};path=/;httpOnly;expires=${getCookieExpires()}`
          );
        }
        res.end(JSON.stringify(blogData));
      });
      return;
    }
    const userResult = handleUserRoute(req, res);

    if (userResult) {
      return userResult.then((userData) => {
        if (needSetCookie) {
          res.setHeader(
            'Set-Cookie',
            `userid=${userId};path=/;httpOnly;expires=${getCookieExpires()}`
          );
        }
        res.end(JSON.stringify(userData));
      });
    }
    // 未命中路由 返回404
    res.writeHead(404, { 'Content-type': 'text/plain' });
    res.write('404 not found');
    res.end();
  });
};
module.exports = serverHandle;

// 为何将router和controller分开
// router 来了什么路由 我们分配什么数据   controller 我只管处理数据 更苦参数返回数据 你数据如何包装 我不关心
// session  理解
