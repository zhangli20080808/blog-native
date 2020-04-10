const http = require('http');

// const db = require('../src/config/db')
const serverHandle = require('../app');
const server = http.createServer(serverHandle);
server.listen(8011,()=>{
  console.log('服务启动 8011端口')
});
