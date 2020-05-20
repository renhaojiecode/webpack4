/**
 * TODO:
 *
 * 网络存储，存储一些会话内容
 *
 */
export default class NetStorage {
  constructor() {
    try {
      this.storage = window.localStorage
    } catch (e) {
      return null
    }
  }

  static getInstance() {
    if (!NetStorage.instance) {
      NetStorage.instance = new NetStorage()
    }
    return NetStorage.instance
  }

  setItem(key, item) {
    this.storage.setItem(key, JSON.stringify(item))
  }

  getItem(key) {
    try {
      return JSON.parse(this.storage.getItem(key))
    } catch (e) {
      return null
    }
  }

  removeItem(key) {
    this.storage.removeItem(key)
  }

  clear() {
    this.storage.clear()
  }
}
