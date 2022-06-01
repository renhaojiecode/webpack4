const { basename, resolve } = require('path');
const mime = require('mime-types');
const fs = require('fs');

// 判断是否是 serviceworker 文件
function isSw(path) {
  let name = basename(path, '.js')
  return name === 'sw-c' || /workbox-*/.test(name);
}
module.exports = function() {
  return async function sitemap(ctx, next) {
    if (isSw(ctx.path)) {
      ctx.response.set('content-type', mime.lookup('js'));
      ctx.body = fromDist(ctx.path);
    } else {
      await next();
    }
  };
};

function getLocale(path) {
  return path.split('/')[1]
}

function fromDist(path) {
  let filePath = path.replace(`/${getLocale(path)}/food/`, '')
  const src = fs.createReadStream(resolve(__dirname, `../../dist/${filePath}`));
  return src
}