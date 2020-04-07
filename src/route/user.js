const handleUserRoute = (req, res) => {
  const method = req.method;
  // 新建博客
  if (method === 'POST' && req.path === '/api/user/login') {
    return {
      msg: 'login',
    };
  }
};
module.exports = handleUserRoute;
