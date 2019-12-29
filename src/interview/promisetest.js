let Promise = require('./promise.js')
Promise.deferred = function() {
  let dfd = {}
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}
// var promisesAplusTests = require('promises-aplus-tests')
// promisesAplusTests(Promise, function(err) {
//   //完成；输出在控制台中。或者检查`err`以了解失败的数量。
//   console.log(err)
// })
module.exports = Promise