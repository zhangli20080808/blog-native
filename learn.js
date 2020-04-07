const http = require('http');
const queryString = require('querystring');
const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  const path = url.split('?')[0];
  const query = queryString.parse(url.split('?')[1]);
  // 数据格式 数据很大的话怎么办呢 一个桶向另一个桶流动 每次有数据都会触发 data事件 来了触发 结束了返回
  console.log('content-type', req.headers['content-type']);
  // 设置返回格式
  res.setHeader('Content-type', 'application/json');

  const resData = {
    method,
    url,
    path,
    query,
  };
  // 返回
  if (method === 'GET') {
    res.end(JSON.stringify(resData));
  }
  if (req.method === 'POST') {
    //接受数据
    let postData = '';
    req.on('data', (chunk) => {
      postData += chunk.toString();
    });
    req.on('end', () => {
      const postData = postData
      res.end(JSON.stringify(postData))
    });
  }
});
server.listen(8011);
