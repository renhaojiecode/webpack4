import './style.css'
import './index.styl'
import icon from './img/5th-two.png'
import { printMe } from '../components/print.js'

function component() {
  let oDiv = document.createElement('div')
  oDiv.innerHTML = 'Hello, webpack'
  oDiv.classList.add('hello')
  let oImg = document.createElement('img')
  oImg.src = icon
  oDiv.appendChild(oImg)
  let btn = document.createElement('button')
  btn.innerHTML = '点击查看consolesajsajsj'
  btn.style.color = 'red'
  btn.onclick = printMe
  oDiv.appendChild(btn)
  return oDiv
}
let element = component()
document.body.appendChild(element)
setTimeout(() => {
  assign()
}, 100)
function assign() {
  let a = {b: 567}
  Object.assign(a, {c: 789})
}

function addTwoNumbers(l1, l2) {
  let l1Ln = l1.length
  let l2Ln = l2.length
  let ln = l1Ln > l2Ln ? l1Ln : l2Ln
  let n = 0
  let arr = []
  let pro = 0
  while (n < ln) {
    let num = pro + (n < l1Ln ? l1[n] : 0) + (n < l2Ln ? l2[n] : 0)
    pro = 0
    if (num >= 10) {
      pro = Math.floor(num / 10)
      num = num % 10
    }
    arr[n] = num
    n++
  }
  pro > 0 && (arr[n] = pro)
  return arr
}
console.log(addTwoNumbers([2, 4, 3, 6], [5, 6, 4]))

// import axios from 'axios'
// axios.get('/rest/parentrest/api/system/dateTime/mobile').then(res => {
//   console.log(res)
// })

// if (module.hot) {
//   module.hot.accept('../print.js', function() {
//     console.log('Accepting the updated printMe module!')
//     document.body.removeChild(element)
//     element = component() // 重新渲染 "component"，以便更新 click 事件处理函数
//     document.body.appendChild(element)
//   })
// }