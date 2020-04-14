import { readFile, writeFileSync as wfs } from 'fs';
import { resolve as r } from 'path';
import { promisify } from 'util';

// promisify(readFile)(r(__dirname, './a.json')).then((data) => {
//   const a = JSON.parse(data); //JSON.parse可以转 buffer
//   // const b = data.toString();
//   wfs(r(__dirname, './name.txt'), String(a), 'utf-8');
// });

import { name, getName } from './constract';
// console.log(name, getName());

async function read(){
  let data = await promisify(readFile)(r(__dirname, './a.json'))
  console.log(data.toString(),111);
}
read()