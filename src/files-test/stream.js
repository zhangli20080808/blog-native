// 标准输入输出
// process.stdin.pipe(process.stdout)

const http = require('http');
const fs = require('fs');
const path = require('path');

// 将流作为 结果返回  直接返回一个文件
// http
//   .createServer((req, res) => {
//     if (req.method === 'GET') {
//       // req.pipe(res);  //主要
//       const fileName = path.resolve(__dirname, 'a.txt');
//       const stream = fs.createReadStream(fileName);
//       stream.pipe(res); 将res作为 stream 的dest  
//     }
//   })
//   .listen('8001');

//  stream  复制文件
// const fileName1 = path.resolve(__dirname, 'a.txt');
// const fileName2 = path.resolve(__dirname, 'b.txt');

// // 读取文件的 stream 对象  创建水桶
// const readStream = fs.createReadStream(fileName1);
// // 写入文件的 stream 对象
// const writerStream = fs.createWriteStream(fileName2);
// // 执行拷贝 通过 pipe
// readStream.pipe(writerStream);
// // 读取数据完成，即完成拷贝  一点一点读取
// readStream.on('data', (chunk) => {
//   // 监听每一次读取的内容 
//   console.log(chunk.toString());
// });
// readStream.on('end', function () {
//   console.log('copy end');
// });
