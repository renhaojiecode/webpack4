import './style.css'
import './index.styl'
import icon from './img/5th-two.png'
import printMe from '../print.js'
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

document.body.appendChild(component())