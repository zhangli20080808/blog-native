const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, 'a.txt');

// fs.readFile(filePath, (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   // data是二进制类型，需要转换成字符串  buffer 转成字符串 toString
//   // 比如说和这个文件很大 3g
//   console.log(data.toString());
// });

// // 写文件 我们想要写一个很大的文件 怎么办？ 那我们就要去学习 stream了
// const content = '这是新写入的内容11\n';
// // 是重写还是追歼
// const opt = {
//   flag: 'a', //追加写入 重写w
// };

// fs.writeFile(filePath, content, opt, (err) => {
//   if (err) {
//     console.error(err);
//   }
// });

// // 判断文件是否存在
// fs.exists(filePath, (exists) => {
//   console.log(exists); //true false
// });

// IO操作的网络瓶颈  网络IO(回忆post处理数据) 文件 IO 相比于cpu的计算和内存读写 IO突出的特点就是 慢
// 我们之前的读文件操作 是一下子读 搬过去 类似于给桶子倒水一样 stream 一点一点倒

// 标准输入输出 pipe就是管道（符合水流管道的模型图）
// process.stdin获取数据 直接通过管道换递给 process.stdout
// process.stdin.pipe(process.stdout)

