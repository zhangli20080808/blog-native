const handleBlogRoute = require('./src/route/blog');
const handleUserRoute = require('./src/route/user');

const queryString = require('querystring');

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

  // 处理post data
  getPostData(req).then((postData) => {
    req.body = postData;
    // 处理路由
    const blogData = handleBlogRoute(req, res);
    const userData = handleUserRoute(req, res);
    if (blogData) {
      res.end(JSON.stringify(blogData));
      return;
    }
    if (userData) {
      res.end(JSON.stringify(userData));
      return;
    }
    // 未命中路由 返回404
    res.writeHead(404, { 'Content-type': 'text/plain' });
    res.write('404 not found');
    res.end();
  });
};
module.exports = serverHandle;
