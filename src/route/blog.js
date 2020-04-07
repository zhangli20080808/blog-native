const { getList, newBlog } = require('../controller/blog');
const { SuccessModel } = require('../model/resModel');
const handleBlogRoute = (req, res) => {
  const method = req.method;
  //获取博客列表
  if (method === 'GET' && req.path === '/api/blog/list') {
    const { keyword = '', author = '' } = req.query;
    const listData = getList(author, keyword);
    return new SuccessModel(listData);
  }
  // 获取详情

  if (method === 'GET' && req.path === '/api/blog/detail') {
    return {
      msg: '2',
    };
  } 
  // 新建博客
  if (method === 'POST' && req.path === '/api/blog/new') {
    console.log(req.body,2123);
    
    return new SuccessModel(req.body);
  }
  // 更新博客
  if (method === 'POST' && req.path === '/api/blog/update') {
    return {
      msg: '4',
    };
  }
  // 删除博客
  if (method === 'POST' && req.path === '/api/blog/del') {
    return {
      msg: '5',
    };
  }
};
module.exports = handleBlogRoute;
