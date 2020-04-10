// 获取环境变量
const env = process.env.NODE_ENV;
let MYSQL_CONF;
// 配置
if (env === 'dev') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'myblog',
  };
}

if (env === 'prodcution') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'myblog',
  };
}
module.exports = {
  MYSQL_CONF,
};
