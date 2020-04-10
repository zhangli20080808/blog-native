const redis = require('redis');
// 创建客户端
const redisClient = redis.createClient(6379, '127.0.0.1');

redisClient.on('error', (err) => {
  console.error(err);
});
// test
redisClient.set('test', 'test', redis.print);
redisClient.get('test', (err, data) => {
  if (err) {
    console.error(err);
    return
  }
  console.log(data);
  redisClient.quit();
});
