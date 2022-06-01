const fs = require('fs')
const path = require('path');

var rootPath = path.resolve('./');

console.log('__dirname', __dirname, rootPath)
let arrNamePath = findFileFromName(
  'index.html',
  rootPath
)
console.log('allarrewewewewe', arrNamePath)
function findFileFromName(name, rootPath) {
  let nameFiles = []
  let stat = fs.statSync(rootPath)
  // 是否时文件夹
  if (!stat.isDirectory()) return []
  let files = fs.readdirSync(rootPath)
  if (!files) return []
  files.forEach(fileItem => {
    let path = `${rootPath}/${fileItem}`
    if (fileItem === name) {
      nameFiles.push(path)
    } else if (fileItem !== 'node_modules' && fileItem !== 'dist') {
      let nameFilesItem = findFileFromName(name, path)
      nameFiles.push(...nameFilesItem)
    }
  })
  return nameFiles
}
