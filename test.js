const mysql = require('mysql');

// 创建链接对象

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123',
  database: 'myblog',
});

// 开始连接
con.connect();
// 执行sql语句
// const sql = `select * from blogs`;
const sql = `INSERT INTO blogs (title,content,createtime,author) VALUES ('test123111','跟你说那个考试都能够快速','1586398993734','zl');`;
con.query(sql, (err, result) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(result); //数组集合
});
// 关闭连接
con.end();
