<template>
<div class="know-ledge-wrapper">
  <div class="left-sidebar">
    <h1 class="sidebar-title">目录</h1>
    <div class="sidebar-btn-wrapper">
      <div class="sidebar-btn"
        v-for="(item, index) in sumUpList"
        :key="index"
        :class="{'cur': nowIndex == index}"
        v-html="index + 1 + '、' + item.title"
        @click="showIndexContent(index)"
      ></div>
    </div>
  </div>
  <div class="content-wrapper">
    <div class="content-list-wrapper">
      <div class="content-item-wrapper"
        v-for="(item, index) in sumUpList"
        :key="index"
        v-show="nowIndex == index"
      >
        <h1 class="title" v-html="item.title"></h1>
        <div class="code-content-item"
          v-for="(content, contentindex) in item.content"
          :key="contentindex"
        >
          <h2 class="content-title" v-if="content.title" v-html="content.title"></h2>
          <p class="desc-item"
            v-for="(desc, descindex) in content.desc"
            v-show="desc != ''"
            :key="descindex"
            v-html="descindex + 1 + '、' + desc"
          >
          </p>
          <pre v-if="content.jsCode">
            <code v-text="content.jsCode"></code>
          </pre>
          <span class="copy-btn" v-if="content.jsCode" @click="copyCode(content.jsCode)">复制代码</span>
          <span class="try-btn" v-if="content.jsCode" @click="tryCode(content.jsCode)">try一下</span>
          <div class="img-wrapper" v-if="content.img && content.img.length">
            <div v-for="(img, imgindex) in content.img" :key="imgindex" v-html="img"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import hljs from '@common/highlight.js'
hljs.initHighlightingOnLoad() // pre 节点内的语法高亮
// import test from './sunmup/test.js' //测试 module语法等
import base from './sunmup/base.js'
import interview from './sunmup/interview.js'
import vueapi from './sunmup/vueapi.js'
import commonModule from './sunmup/Common-Module.js'
import promiseAsync from './sunmup/promise-async.js'
import constructor from './sunmup/constructor-prototype.js'
import prptotype from './sunmup/prptotype.js'
import eslint from './sunmup/eslint.js'
import webpack from './sunmup/Webpack.js'
export default {
  data() {
    return {
      nowIndex: location.hash.replace('#', '') - 0,
      sumUpList: [
        base,
        interview,
        vueapi,
        commonModule,
        promiseAsync,
        constructor,
        prptotype,
        eslint,
        webpack,
      ],
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      //
      // let arr = ['A', 'A1', 'A2', 'B', 'B1', 'B2', 'C', 'C1', 'C2', 'D', 'D1', 'D2'].sort((val1, val2) => {
      //   let a = val1.includes(val2) ? -1 : (val1 > val2 ? 1 : -1)
      //   return a
      // })
      // console.log(arr)
    },
    showIndexContent(index) {
      this.nowIndex = index
      location.hash = `#${index}`
    },
    copyCode(value) {
      let transfer = document.createElement('input')
      document.body.appendChild(transfer)
      transfer.value = value  // 这里表示想要复制的内容
      transfer.focus()
      transfer.select()
      if (document.execCommand('copy')) {
        document.execCommand('copy')
      }
      transfer.blur()
      // console.log('复制成功')
      document.body.removeChild(transfer)
    },
    tryCode(code) {
      eval('(function(){' + code + '})()')
    },
  }
}
</script>
<style lang="stylus">
.know-ledge-wrapper
  position: relative
  width: 100%
  .left-sidebar
    position: fixed
    left: 0
    top: 0
    padding: 10px
    width: 230px
    box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.07)
    border-radius: 10px
    background: #ffffff
    .sidebar-title
      margin-bottom: 10px
      line-height: 30px
      text-align: center
      font-size: 20px
    .sidebar-btn-wrapper
      .sidebar-btn
        width: 210px
        line-height: 30px
        font-size: 14px
        color: #304455
        cursor: pointer
        overflow: hidden
        &.cur
          color: #42b983
  .content-wrapper
    padding: 20px 10px 20px 240px
    min-height: 100vh
    background: #e5e5e5
    .content-list-wrapper
      padding-bottom: 50px
    h1.title
      padding: 10px 0
      line-height: 30px
      text-align: center
      font-size: 20px
    .code-content-item
      margin-bottom: 15px
    .content-title
      line-height: 30px
      font-size: 16px
    .desc-item
      margin: 10px
      line-height: 26px
      font-size: 16px
      color: #333333
    .copy-btn,
    .try-btn
      display: inline-block
      margin-top: 10px
      margin-right: 10px
      padding: 0 10px
      line-height: 20px
      font-size: 14px
      color: #42b983
      background: #fff
      border: 1px solid #333
      border-radius: 4px
      cursor: pointer
    .img-wrapper
      margin-top: 15px
      img
        display: block
        width: 100%
  pre
    margin-left: auto
    margin-right: auto
    padding-left: 10px
    line-height: 20px
    font-size: 14px
    color: #FFF
    background: #23241f
    border-radius: 5px
    overflow: scroll
</style>