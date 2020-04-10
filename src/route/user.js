const { login } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');

function getCookieExpires () {
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
  // cookies 时间格式  Sat, 11 Apr 2020 07:23:13 GMT
  return d.toGMTString()
}

const handleUserRoute = (req, res) => {
  const method = req.method;
  // 新建博客
  if (method === 'GET' && req.path === '/api/user/login') {
    const { username, password } = req.query;
    const result = login(username, password);
    return result.then((loginData) => {
      if (loginData.username) {
        // 操作cookies
        res.setHeader(
          'Set-Cookie',
          `username=${loginData.username};path=/;httpOnly;expires=${getCookieExpires()}`
        );
        return new SuccessModel();
      } else {
        return new ErrorModel('登录失败');
      }
    });
  }
  //登录验证

  if (method === 'GET' && req.path === '/api/user/login-test') {
    if (req.cookie.username === 'zhangsan') { 
      return Promise.resolve(new SuccessModel());
    }
    return Promise.resolve(new ErrorModel('登录失败'));
  }
};
module.exports = handleUserRoute;
