class MySet {
  constructor () {
    this.valueList = []
  }

  add (item) {
    !this.has(item) && this.valueList.push(item)
  }

  delete (item) {
    let index = this.valueList.indexof(item)
    index != -1 && this.valueList.splice(index, 1)
  }

  size () {
    return this.valueList.length
  }

  has (item) {
    if (this.valueList.includes(item)) {
      return true
    }
    let ok = false
    this.valueList.forEach(ele => {
      !ok && (ok = same(item, ele))
    })
    return ok
  }
}
function same(tar, data) {
  let ok = false
  if (Array.isarray(tar) && Array.isarray(ele) && ele.length == tar.length) {
    tar.forEach((val, index) => {
      if (typeof val === 'object' && typeof ele[index] === 'object') {
        !ok && (ok = same(val, ele[index]))
      } else {
        !ok && (ok = val == ele[index])
      }
    })
  } else if (typeof tar === 'object') {
    let arrtar = Object.keys(tar)
    arrtar.forEach(val => {
      if (typeof tar[val] === 'object' && typeof data[val] === 'object') {
        !ok && (ok = same(tar[val], data[val]))
      } else {
        !ok && (ok = tar[val] == data[val])
      }
    })
  }
  return ok
}