export default {
  title: '考察 Promise async await',
  name: '',
  content: [
    {
      title: '面试题',
      jsCode: `let a;
const b = new Promise((resolve) => {
  console.log('promise1');
  resolve();
}).then(() => {
  console.log('promise2');
}).then(() => {
  console.log('promise3');
}).then(() => {
  console.log('promise4');
})

a = new Promise( async (resolve) => {
  console.log(a);
  await b;
  console.log(a);
  console.log('after1');
  /* a Promise对象 被await 但是一直是pending态 resolve在await后边永远无法执行 */
  await a;
  resolve(true);
  console.log('after2');
})

console.log('end')
/* promise1 / undefined / end / promise2 / promise3 / promise4 / Promise{<pending>} / after1 */`,
      desc: [
        'async函数返回一个 Promise 对象',
        'await 命令只能用在 async 函数之中',
        'await 返回 后边的 Promise 的 resolve 值即:res / 如果不是Promise 对象 会自动转成立即 resolved 的 Promise 对象',
        'await 后边的 Promise 对象出错或reject 会阻断后边的执行 可以用 async 的catch 或 Promise 的catch处理 放在try catch也行'
      ],
      img: [
        '<img src="' + require('../img/async-await.jpg') + '"/>',
      ]
    },
    {
      title: '面试题2',
      jsCode: `
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}
async function async2() {
    console.log('async2');
}
console.log('script start');
setTimeout(function() {
    console.log('setTimeout');
}, 0)
async1();
new Promise(function(resolve) {
    console.log('promise1');
    resolve();
}).then(function() {
    console.log('promise2');
});
console.log('script end');
/* script start / async1 start / async2 / promise1 / script end / async1 end / promise2 / setTimeout */`,
    },
    {
      title: 'Generator 小试',
      jsCode: `let testFnList = [function(payload, nextFn) {
        console.log('payload', payload)
        payload.url += 'fn1/'
        nextFn(payload)
      }, function(payload, nextFn) {
        console.log('payload', payload)
        payload.url += 'fn2/'
        nextFn(payload)
      }, function(payload, nextFn) {
        console.log('payload', payload)
        payload.url += 'fn3/'
        nextFn(payload)
      }]
      let payload = {
        url: 'http://'
      }
      middleware()
      function middleware() {
        let gFn = beforeLogoutTestGeneratorFn(testFnList)
        let reVal = {done: false}
        nextFn(payload)
        function nextFn(payload) {
          reVal = gFn.next()
          console.log('reVal', reVal)
          if (!reVal.done) {
            reVal.value(payload, nextFn)
          } else {
            // 结束
            console.log('done',payload)
          }
        }
      }
      
      function* beforeLogoutTestGeneratorFn(list) {
        for(let val of list) {
          yield val
        }
      }`,
      desc: [
        '',
      ],
      img: [
        // '<img src="' + require('../img/async-await.jpg') + '"/>',
      ]
    },
    {
      title: '',
      jsCode: ``,
      desc: [
        '<br>&nbsp;&nbsp;  ',
      ],
      img: []
    },
  ]
}

