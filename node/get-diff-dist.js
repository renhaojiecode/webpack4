/**
 * 比对 多个文件夹的文件差异
 * exp：两次打包dist文件差异
 */
 const walk = require('walk');
 const _ = require('lodash');
 
 function getFileNamesByDir(dir) {
   return new Promise((resolve, reject) => {
     const files = [];
     const walker = walk.walk(dir, {followLinks: false});
 
     walker.on('file', function(root, stat, next) {
       let name = (root + '/' + stat.name).replace(dir, '');
       files.push({
         name: name,
         size: bytesToSize(stat.size),
       });
       next();
     });
 
     walker.on('end', function() {
       resolve(files);
     });
   });
 }
 
 function bytesToSize(bytes) {
     if (bytes === 0) return '0 B';
     var k = 1000, // or 1024
         sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
         i = Math.floor(Math.log(bytes) / Math.log(k));
  
    return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
 }
 
 function to(promise) {
   return new Promise((resolve) => {
     promise.then(res => resolve([null, res])).
         catch(err => resolve([err, undefined]));
   });
 }
 
 function difference(arr1, arr2) {
   let arr = [];
   arr2.forEach(item => {
     if (item.name.indexOf('.map') !== -1) return
     let index = _.findIndex(arr1, (target) => target.name === item.name);
     if (index === -1) {
       arr.push(item);
     }
   });
   return arr;
 }
 
 async function run() {
   let [err1, list1] = await to(getFileNamesByDir('./dist-base'));
   let [err2, list2] = await to(getFileNamesByDir('./dist-main'));
   console.log(difference(list1, list2));
   throw new Error('test');
 }
 
 ;(async () => {
   let [err] = await to(run());
   if (err) {
     console.log('=========== catch error ===========');
   }
 })();
 