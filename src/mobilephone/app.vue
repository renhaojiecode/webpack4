<template>
<div class="mobile-phone-wrapper">
  <div class="screen-wrapper">
    <div class="screen-item"
      v-for="(item, index) in screenList"
      :key="'screen' + index"
      v-text="item.name"
      @click="screenClick(item)"
    ></div>
  </div>
  <div class="phone-list-wrapper">
    <div class="phone-detail-item"
      v-for="(item, index) in mobileList"
      :key="'mobile' + index"
    >
      <div class="options">
        <div class="option-name">机型</div>
        <div class="option-value" v-html="item.mName"></div>
      </div>
      <div class="options">
        <div class="option-name">网络</div>
        <div class="option-value" v-html="item.signal"></div>
      </div>
      <div class="options">
        <div class="option-name">CPU</div>
        <div class="option-value" v-html="item.CPU"></div>
      </div>
      <div class="options">
        <div class="option-name">运存</div>
        <div class="option-value" v-html="item.runMemory"></div>
      </div>
      <div class="options">
        <div class="option-name">内存</div>
        <div class="option-value" v-html="item.memory"></div>
      </div>
      <div class="options">
        <div class="option-name">屏幕尺寸</div>
        <div class="option-value" v-html="item.lcdSize"></div>
      </div>
      <div class="options">
        <div class="option-name">屏幕类型</div>
        <div class="option-value" v-html="item.lcd"></div>
      </div>
      <div class="options">
        <div class="option-name">分辨率</div>
        <div class="option-value" v-html="item.resolutionRatio"></div>
      </div>
      <div class="options">
        <div class="option-name">像素密度</div>
        <div class="option-value" v-html="item.ppi"></div>
      </div>
      <div class="options">
        <div class="option-name">电池容量</div>
        <div class="option-value" v-html="item.mah"></div>
      </div>
      <div class="options">
        <div class="option-name">充电速度</div>
        <div class="option-value" v-html="item.charge"></div>
      </div>
      <div class="options">
        <div class="option-name">相机</div>
        <div class="option-value" v-html="item.CMOS"></div>
      </div>
      <div class="options">
        <div class="option-name">防抖</div>
        <div class="option-value" v-html="item.ois"></div>
      </div>
      <div class="options">
        <div class="option-name">解锁方式</div>
        <div class="option-value" v-html="item.lock"></div>
      </div>
      <div class="options">
        <div class="option-name">NFC</div>
        <div class="option-value" v-html="item.nfc"></div>
      </div>
      <div class="options">
        <div class="option-name">耳机孔</div>
        <div class="option-value" v-html="item.headphone"></div>
      </div>
      <div class="options">
        <div class="option-name">重量</div>
        <div class="option-value" v-html="item.weight"></div>
      </div>
      <div class="options">
        <div class="option-name">机身尺寸</div>
        <div class="option-value" v-html="item.size"></div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
let screenList = [
  {
    name: '所有',
    key: 'All'
  },
  {
    name: '华为',
    key: 'HUAWEI'
  },
  {
    name: '荣耀',
    key: 'HONOR'
  },
]
import mList from './data.js'
export default {
  data() {
    return {
      screenList: screenList,
      mobileList: mList.slice()
    }
  },
  mounted() {
    //
  },
  methods: {
    screenClick(item) {
      return item.key
    }
  }
}
</script>
<style lang="stylus">
.mobile-phone-wrapper
  margin: 0 auto
  padding: 10px 10px 20px
  max-width: 480px
  width: 100%
  min-height: 100%
  background: #e5e5e5
  .screen-wrapper
    overflow: hidden
    .screen-item
      float: left
      margin-right: 10px
      padding: 0 10px
      line-height: 22px
      text-align: center
      font-size: 14px
      background: #ffffff
      border-radius: 2px
  .phone-list-wrapper
    margin-top: 20px
    overflow: hidden
    .phone-detail-item
      float: left
      width: 48%
      background: #ffffff
      border-radius: 6px
      &:nth-child(2n)
        float: right
      .options
        overflow: hidden
        padding: 5px 0
        line-height: 20px
        font-size: 12px
        color: #333333
        .option-name
          float: left
          margin-right: 5px
          text-align: right
          width: 55px
        .option-value
          position: relative
          float: left
          width: calc(100% - 60px)
          text-align: left
          word-break: break-all
          word-wrap: break-word
          &::after
            content: ''
            position: absolute
            left: -3px
            top: 0
            width: 0
            height: 100%
            border-left: 1px solid #42b983
</style>