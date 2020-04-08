const getList = (author, keyword) => {
  // 先返回假数据 格式是正确的
  return [
    {
      id: 1,
      title: 'title',
      content: 'neirong',
      createTime: 1231237218371283,
    },
  ];
};

const newBlog = (blogData = {}) => {
  console.log(blogData);

  // blogData 是一个博客对象
  return {
    id: 3, // 新建博客，插入到数据表中的id
  };
};

const getDetail = (id) => {
  return {
    id: id,
    title: 'title',
    content: 'neirong',
  };
};

const updateDeatil = (id, blogData) => {
  console.log(id, blogData);

  return true;
};

const deleteBlog = (id) => {
  return true;
};
module.exports = {
  getList,
  newBlog,
  getDetail,
  updateDeatil,
  deleteBlog
};
