const { login } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');

const handleUserRoute = (req, res) => {
  const method = req.method;
  // 新建博客
  if (method === 'GET' && req.path === '/api/user/login') {
    const { username, password } = req.query;
    const result = login(username, password);
    return result.then((loginData) => {
      if (loginData.username) {
        // 设置 session
        req.session.username = loginData.username;
        req.session.realname = loginData.realname;
        return new SuccessModel();
      } else {
        return new ErrorModel('登录失败');
      }
    });
  }
  //登录验证
  if (method === 'GET' && req.path === '/api/user/login-test') {
    if (req.session.username === 'zhangsan') {
      return Promise.resolve(new SuccessModel({ session: req.session }));
    }
    return Promise.resolve(new ErrorModel('尚未登录'));
  }
};
module.exports = handleUserRoute;
