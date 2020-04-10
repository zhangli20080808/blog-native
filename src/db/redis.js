const redis = require('redis');
const { REDIS_CONF } = require('../config/db');

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);

redisClient.on('error', (err) => {
  console.error(err);
});
function set(key, value) {
  if (typeof value === 'object') {
    value = JSON.stringify(value);
  }
  redisClient.set(key, value, redis.print);
}

function get(key) {
  const promise = new Promise((resolve, reject) => {
    redisClient.get(key, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      if (data == null) {
        resolve(null);
        return
      }
      // 如果是一个json格式的有可能不成功
      try {
        resolve(JSON.parse(data));
      } catch (error) {
        resolve(data);
      }
    });
  });
  return promise;
}

module.exports = {
  set,
  get,
};
