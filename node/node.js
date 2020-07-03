var fs = require('fs');
const {resolve} = require('path');

function copy(target, src) {
  fs.writeFileSync(target, fs.readFileSync(src))
}
copy(__dirname + '/setCopy.js', __dirname + '/set.js') // 复制小文件内容

function copyBigFile(target, src) {
  fs.createReadStream(src).pipe(fs.createWriteStream(target));
}
copyBigFile(__dirname + '/setCopyBig.js', __dirname + '/set.js') // 复制小文件内容

console.log('__dirname : ' + __dirname) // /Users/renhaojie/Documents/webpack4/node
console.log('resolve   : ' + resolve('./')) // /Users/renhaojie/Documents/webpack4
console.log('cwd       : ' + process.cwd()) // /Users/renhaojie/Documents/webpack4