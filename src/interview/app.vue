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
            v-html="initdesc(descindex, desc)"
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
import http from './sunmup/http.js'
import codeSpeedUp from './sunmup/code-speed-up.js'

// import testVue from './components/test.vue'

export default {
  components: {
    // testVue,
  },
  data() {
    // 不会被vue监听
    this.obj = {
      text: 1,
      name: 'obj'
    }
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
        webpack,
        http,
        codeSpeedUp,
        eslint,
      ],
    }
  },
  created() {
    // this.text1 = 'hahah1'
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      //
      // 给定 nums1 = [1, 2, 2, 1]，nums2 = [2, 2]，返回 [2, 2]。
      console.log(getCommon([1, 2, 1, 3, 2, 1], [2, 2, 2, 1, 3]))
      function getCommon(arr1, arr2) {
        let commonList = []
        let nIndex = 0
        for (let i = 0; i < arr1.length; i++) {
          if (i < nIndex) continue
          let val = arr1[i]
          let n = i
          let arr2S = arr2.toString()
          if (arr2.indexOf(val) != -1) {
            let list = [val]
            let ok = true
            while (ok) {
              n++
              if (arr2S.indexOf([...list, arr1[n]].toString()) != -1) {
                list.push(arr1[n])
              } else {
                ok = false
              }
            }
            nIndex = n
            commonList.push(list)
          }
        }
        commonList.sort((arr1, arr2) => {
          return arr2.length - arr1.length
        })
        return commonList[0]
      }
      setTimeout(() => {
        this.text1 = 'hahah'
      }, 3000)
    },
    showIndexContent(index) {
      this.nowIndex = index
      location.hash = `#${index}`
    },
    initdesc(descindex, desc) {
      let str = desc.replace(/<br>&nbsp;&nbsp;/g, '<br><i class="subtitle"></i>')
      return descindex + 1 + '、' + str
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
  i.subtitle
    margin: 0 5px 0 15px
    border: 1px solid #f85415
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