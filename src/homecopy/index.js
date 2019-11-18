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