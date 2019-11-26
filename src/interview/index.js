'use strict;'
true && (function() {
  function creatDom(tag, cName) {
    let oNode = document.createElement(tag)
    if (cName) {
      oNode.className = cName
      oNode.innerText = cName
    }
    document.body.appendChild(oNode)
  }
  //测试 getElement...  和  querySelector
  function testGetElementAndQuerySelect() {
    for (let i = 0; i < 3; i++) {
      creatDom('div', 'ele-box')
    }
    let aDivG = document.getElementsByClassName('ele-box')
    for (let i = 0; i < aDivG.length; i++) {
      aDivG[i].innerText = 'ele-box-change'
      aDivG[i].className = 'ele-box-change'
    }
    // 可以改变1 3 的值：因为getElements 获取的是动态的 NodeList 所以第一个改变className 之后aDivG 只剩两个了

    for (let i = 0; i < 3; i++) {
      creatDom('div', 'query-box')
    }
    let aDivQ = document.querySelectorAll('.query-box')
    for (let i = 0; i < aDivQ.length; i++) {
      aDivQ[i].innerText = 'query-box-change'
      aDivQ[i].className = 'query-box-change'
    }
    // 全都可以改变 因为querySelector 获取的是静态的 NodeList 是当时节点的一个快照
  }
  // 总结 getElements 比 querySelector 更快 是因为 querySelector是单独存储了一个当时的快照保存了所有的节点信息 而getElements是动态的只是缓存了部分信息
  testGetElementAndQuerySelect()
})()

// 两数之和
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
function ListNode(val) {
  this.val = val
  this.next = null
}
console.log(abc([2, 4, 3], [5, 6, 4]))
function abc(l1, l2) {
  let l1Ln = l1.length
  let l2Ln = l2.length
  let ln = l1Ln > l2Ln ? l1Ln : l2Ln
  let n = 0
  let pro = 0
  let l3 = null
  let nl1 = null
  let nl2 = null
  while (n < ln) {
    let num = pro + (n < l1Ln ? l1[n] : 0) + (n < l2Ln ? l2[n] : 0)
    pro = 0
    if (num >= 10) {
      pro = Math.floor(num / 10)
      num = num % 10
    }
    nl1 = new ListNode(num)
    !l3 && (l3 = nl1)
    nl2 && (nl2.next = nl1)
    nl2 = nl1
    n++
  }
  if (pro > 0) {
    nl1 = new ListNode(pro)
    nl2.next = nl1
  }
  return l3
}