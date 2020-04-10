const {
  getList,
  newBlog,
  getDetail,
  updateDeatil,
  deleteBlog,
} = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');

//  登录验证海曙

const loginCheck = (req) => {
  if (!req.session.username) {
    return Promise.resolve(new ErrorModel('尚未登录'));
  }
};

const handleBlogRoute = (req, res) => {
  const method = req.method;
  const { id } = req.query;
  //获取博客列表
  if (method === 'GET' && req.path === '/api/blog/list') {
    const { keyword = '', author = '' } = req.query;
    // const listData = getList(author, keyword);
    // return new SuccessModel(listData);newBlog
    const result = getList(author, keyword);
    return result.then((res) => {
      return new SuccessModel(res);
    });
  }
  // 获取详情
  if (method === 'GET' && req.path === '/api/blog/detail') {
    const result = getDetail(id);
    return result.then((res) => {
      return new SuccessModel(res);
    });
  }
  // 新建博客
  if (method === 'POST' && req.path === '/api/blog/new') {
    // const loginCheckResult = loginCheck(req);
    // if (loginCheckResult) {
    //   // 未登录
    //   return loginCheckResult;
    // }
    req.body.author = req.session.username;
    const data = newBlog(req.body);
    return data.then((res) => {
      if (res) {
        return new SuccessModel('创建成功');
      }
      return new ErrorModel('创建失败');
    });
  }
  // 更新博客
  if (method === 'POST' && req.path === '/api/blog/update') {
    const result = updateDeatil(id, req.body);
    return result.then((val) => {
      if (val) {
        return new SuccessModel();
      } else {
        return new ErrorModel('更新失败');
      }
    });
  }
  // 删除博客
  if (method === 'POST' && req.path === '/api/blog/del') {
    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      // 未登录
      return loginCheckResult;
    }
    // id 当前用户
    // let author = 'zls';
    const author = req.session.username;
    const result = deleteBlog(id, author);
    return result.then((val) => {
      if (val) {
        return new SuccessModel();
      } else {
        return new ErrorModel('删除失败');
      }
    });
  }
};
module.exports = handleBlogRoute;
