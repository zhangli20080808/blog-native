const { exec } = require('../db/mysql');
const getList = (author, keyword) => {
  // 1=1 永远成立 占位置 不然预计会报错 语法正确
  let sql = `select * from blogs where 1=1 `;
  if (author) {
    sql += `and author='${author}' `;
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `;
  }
  sql += 'order by createtime desc; ';
  console.log(1);

  return exec(sql);
};

const newBlog = (blogData = {}) => {
  console.log(blogData);

  // blogData 是一个博客对象
  return {
    id: 3, // 新建博客，插入到数据表中的id
  };
};

const getDetail = (id) => {
  let sql = `select * from blogs where id='${id}'`;
  return exec(sql).then((res) => {
    return res[0];
  });
};

const updateDeatil = (id, blogData) => {
  // console.log(id, blogData);
  const { title, content } = blogData;
  let sql = `update blogs set title='${title}',content='${content}' where id=${id}`;
  return exec(sql).then((updateData) => {
    // console.log(updateData);
    if (updateData.affectedRows > 0) {
      return true;
    }
    return false;
  });
};

const deleteBlog = (id, author) => {
  let sql = `delete from blogs where id='${id}' and author='${author}'`;
  return exec(sql).then((deleteData) => {
    console.log(deleteData);
    
    if (deleteData.affectedRows > 0) {
      return true;
    }
    return false;
  });
};
module.exports = {
  getList,
  newBlog,
  getDetail,
  updateDeatil,
  deleteBlog,
};
