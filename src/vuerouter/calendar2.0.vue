<template lang="pug">
  .calendar-wrapper(@touchstart="")
    .date-wrapper(:class="{'no_book_full': noBookOrFull}", @touchmove="stopScroll")
      .date-week(
        ref="dateWeek",
        :style="trackStyle",
      )
        ul.scroll-week(v-for="(weekItem, weekIndex) in arrMonthDate", :style="weekItem.style")
          li.scroll-week-item(v-for="(dateItem, dateIndex) in weekItem.arrWeek", :class="dateItem.class", @click="dateSelect('date-select', dateItem, weekIndex, dateIndex)")
            .week(v-text="dateItem.w")
            .day(v-text="dateItem.d")
            .book-status
              span(v-text="dateItem.textFe")
            .workcease(v-if="dateItem.cur", :class="{'cease': dateItem.curText == '休' }", v-text="dateItem.curText", v-cloak)
      .year-and-month
        .month
          span(v-text="month")
          |月
    slot(name="list")
    .content-box-scrollbar-hidden
      .hours-wrapper(:class="{'no_book_full': noBookOrFull}" :style="{'height': height + 'px'}" ref="contentBox")
        .timeslot-status(
          ref="timeslotStatus",
          :style="trackStyle",
        )
          ul.timeslot-status-wrapper(v-for="(weekItem, index) in arrMonthDate", :style="weekItem.style")
            li.timeslot-status-item(v-for="dateItem in weekItem.arrWeek", :class="{'disabled': false}")
              .hour-minutes-status.default
              .hour-minutes-status(
                v-for="item in dateItem.arr",
                :class="computedClass(item)",
                @click="timeslotClick(item, dateItem.arr)"
              )
                .hour-minutes-status-pos(
                  v-if="item.enableFe && item.selectFe",
                  v-cloak,
                  :class="computedClassPos(item)",
                  :style="computedStylePos(item)",
                )
                  .course-name-over(v-if="item.enableFe && item.selectFe", v-cloak)
                    .course-name-table
                      .course-name(v-text="item.textFe")
        ul.timeslot(v-if="arrMonthDate.length")
          li.hour-minutes(v-for="item in arrMonthDate[0].arrWeek[0].arr", v-text="item.timeFe")
</template>
<script>
/**
 * @time-select  时间节点点击事件
 * :arr-month-week 用来渲染组件的数据  下边为具体数据介绍
 * 所有带Fe后缀的参数均为前端转化
 * let cancelDefault = [
 *  {
 *    arrWeek: [
 *      {
 *        class: "today",
          w: '明天', //week/'明天'
          d: 19, //date
          cur: true, //高亮
          curText: false, // 休 / 班
          textFe: '', //要显示的文字 textStatus
          arr: [
            {
              enableFe: false, //是否可以点击 enableStatus
              selectFe: false, //是否有选中状态 selectStatus
              textFe: '', //要显示的文字
              dateFe: 1520827129000, //当前时间节点的时间戳(服务器时间 目前无用只是先记录)
              timeFe: 10:00, //时间节点展示的时间
              month: 02,
              接口参数拼接。。。。
            }
          ], //每天的时间列表
        }
 *    ]
      month: "02"
      n: 0
 *  }
 * ]
 */
import Hammer from '../lib/hammer.min.js'
export default {
  props: {
    type: { // list 模式 用于课表
      type: String,
      default: 'calendar'
    },
    duration: {
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      required: true,
    },
    arrMonthWeek: {
      type: Array,
      required: true
    },
    active: { //选中位置
      type: Number,
      required: true,
    },
    maxActive: { //最大index  length
      type: Number,
      required: true,
    },
    minActive: { //最小index  0
      type: Number,
      required: true,
    },
    guide: { // 新版本的新手引导
      type: Number,
      required: false,
      default: 0
    }
  },
  data() {
    return {
      noBookOrFull: false, //日期是否展示 约满 未放课 已约等状态
      touchStartLock: false,
      startX: 0,
      startY: 0,
      delta: 0,
      width: 0,
      offset: 0,
      currentDuration: 0,
      activeCalendar: 0,
      startCalendar: 0,
      scrollStart: 10000,
      arrMonthDate: [],
      // addShowArr: null,
      leftTimeW: 38,
      majorCourseIdArr: [],
      openCourseIdArr: [],

      deltaX: 0,
      ticking: false,
      nameHeight: 36,
    }
  },
  mounted() {
    this.init()
  },
  watch: {
    arrMonthWeek(nVal) {
      this.arrMonthDate = this.arrMonthDateChange(nVal)
      return this.arrMonthDate
    },
    active(nVal) {
      this.activeCalendar = nVal
      return nVal
    },
    guide(nVal) {
      this.guideShow = nVal
      !this.guideShow && (this.$refs.contentBox.scrollTop = this.scrollStart)
      return nVal
    }
  },
  computed: {
    month() {
      return this.arrMonthDate[this.activeCalendar - this.minActive] ? this.arrMonthDate[this.activeCalendar - this.minActive].month : ''
    },
    trackStyle() {
      return {
        width: this.width * this.arrMonthDate.length + 'px',
        transform: `translateX(${this.offset})`,
        transitionProperty: 'transform',
        transitionDuration: this.currentDuration + 'ms'
      }
    },
  },
  methods: {
    init() {
      this.width = this.$el.getBoundingClientRect().width
      this.arrMonthDate = this.arrMonthDateChange(this.arrMonthWeek)
      this.noBookOrFull = this.getNoBookOrFull(this.arrMonthDate)
      this.guideShow = this.guide
      this.$nextTick(() => {
        this.hammerInfo(this.$refs.dateWeek, 'none')
        this.hammerInfo(this.$refs.timeslotStatus, 'pan-y')
        this.$refs.contentBox.scrollTop = this.guideShow ? 0 : this.scrollStart
      })
      this.activeCalendar = this.active
      this.offset = -(this.active * this.width) + 'px'
    },
    computedClass(item) {
      return {
        [item.enableFe + '-' + item.selectFe]: true,
      }
    },
    computedClassPos(item) {
      let major = this.majorCourseIdArr.indexOf(item.courseId - 0) !== -1
      let open = this.openCourseIdArr.indexOf(item.courseId - 0) !== -1
      return {
        // [item.enableFe + '-' + item.selectFe]: true,
        // ['space-' + item.space]: item.space,
        ['spos-' + item.spos]: item.spos,
        'major-course': major,
        'minor-course': item.courseId && !major && !open,
        'open-course': open,
      }
    },
    computedStylePos(item) {
      this.numstyle++
      if (!item.space || item.space <= 3) return ''
      let h = item.space * 15 + Math.floor(item.space / 3)
      return {
        'height': h + 'px',
        'padding-top': Math.floor((h - this.nameHeight) / 2) + 'px',
      }
    },
    timeslotClick(item, itemArr) {
      this.timeSelect('time-select', item, itemArr)
    },
    arrMonthDateChange(arr) {
      return arr.map((res, index) => {
        let n = res.n
        return {
          style: {
            width: this.width - this.leftTimeW + 'px',
            position: index == 0 ? 'relative' : 'absolute',
            transform: `translateX(calc(${(n * 100)}% + ${(n * this.leftTimeW + 'px')}))`,
          },
          month: res.month,
          arrWeek: res.arrWeek,
        }
      })
    },
    getNoBookOrFull(arrVal) {
      for (let k = 0; k < arrVal.length; k++) {
        let arr = arrVal[k].arrWeek
        let n = arr.length
        for (let i = 0; i < n; i++) {
          if (arr[i].textFe) {
            return true
          }
        }
      }
      return false
    },
    hammerInfo(dom, touchAction) {
      let manager = new Hammer.Manager(dom, {
        touchAction: touchAction
      })
      let pan = new Hammer.Pan()
      let swipe = new Hammer.Swipe()
      manager.add(pan)
      manager.add(swipe).recognizeWith(manager.get('pan'))
      manager.on('panstart', () => {
        this.deltaX = 0
        this.currentDuration = 0
        this.startCalendar = this.activeCalendar
      })
      manager.on('panmove', (ev) => {
        this.hammerPan(ev)
      })
      manager.on('panend', (ev) => {
        this.touchEnd(ev)
        this.requestElementUpdate()
      })
      manager.on('swipe', (ev) => {
        this.hammerSwipe(ev)
      })
    },
    hammerPan(ev) {
      if (this.guideShow) return // 出现新手引导时 不可操作
      if (ev.offsetDirection === 4 || ev.offsetDirection === 2) {
        this.deltaX = ev.deltaX
        this.requestElementUpdate()
      }
    },
    hammerSwipe(ev) {
      if (ev.offsetDirection === 4 || ev.offsetDirection === 2) {
        if (this.startCalendar == this.activeCalendar) {
          this.touchEnd(ev, 'swipe')
          this.requestElementUpdate()
        }
      }
    },
    touchEnd(ev, type = '') {
      let n = (Math.abs(this.deltaX) < this.width / 4 && type != 'swipe')
        ? 0
        : ev.offsetDirection == 2
          ? 1
          : -1
      this.currentDuration = this.duration
      this.activeCalendar += n
      this.deltaX = 0
      if (this.activeCalendar < this.minActive || this.activeCalendar >= this.maxActive) {
        this.activeCalendar = this.activeCalendar - n
      }
      this.$emit('touch-end', this.activeCalendar)
    },
    move() {
      this.offset = Math.min(Math.max(this.deltaX, -this.width), this.width) - this.activeCalendar * this.width + 'px'
      this.ticking = false
    },
    requestElementUpdate() {
      if (!this.ticking) {
        this.reqAnimationFrame()(this.move)
        this.ticking = true
      }
    },
    reqAnimationFrame() {
      return window[Hammer.prefixed(window, 'requestAnimationFrame')] || function(callback) {
        window.setTimeout(callback, 1000 / 60)
      }
    },
    timeSelect(name, item, itemArr) {
      this.$emit(name, item, itemArr)
    },
    dateSelect(name, item, weekIndex, dateIndex) {
      if (this.type == 'list') {
        this.$emit(name, item, weekIndex, dateIndex)
      }
    },
    autoScroll(n, refreshActive = false) {
      this.currentDuration = this.duration
      this.activeCalendar = n
      refreshActive && this.$emit('touch-end', this.activeCalendar)
      this.move()
    },
    stopScroll() {
      event.preventDefault()
    },
  }
}
</script>
<style lang="stylus" scoped>
  .calendar-wrapper
    position: relative
    .date-wrapper
      position: absolute
      top: 0
      left: 0
      z-index: 2
      width: 100%
      height: 60px
      background: #fff
      overflow: hidden
      box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.07)
      .year-and-month
        position: absolute
        left: 0
        top: 0
        width: 34px
        // height: 60px
        .month
          height: 28px
          text-align: center
          line-height: 28px
          font-size: 12px
          color: #333333
          border-radius: 0px 0px 9px 0px
          background: #EEEEEE
          span
            font-size: 18px
            font-weight: bold
      .date-week
        position: relative
        transform: translateX(0px)
        ul.scroll-week
          position: absolute
          left: 0
          top: 0
          margin-left: 38px
          padding: 8px 0
          // width: calc(100% - 38px)
          transform: translateX(0px)
          overflow: hidden
          li.scroll-week-item
            position: relative
            float: left
            width: calc(100% / 7)
            // height: 42px
            text-align: center
            &.today
              .day
                color: #ffffff
                font-size: 15px
                background: #FF6422
                border-radius: 50%
            .day
              display: inline-block
              width: 23px
              height: 23px
              line-height: 23px
              font-size: 17px
              font-weight: bold
              color: #333333
            .week
              margin-bottom: 4px
              line-height: 16px
              font-size: 12px
              color: #999999
              -webkit-transform: scale(0.91)
              transform: scale(0.91)
            .workcease
              position: absolute
              top: 18px
              right: -3px
              font-size: 20px
              color: #FF6422
              -webkit-transform: scale(0.5)
              transform: scale(0.5)
              &.cease
                color: #FFC616
            .book-status
              margin-top: 2px
              display: none
              height: 14px
              line-height: 14px
              font-size: 12px
              color: #999999
              span
                display: inline-block
                vertical-align: middle
                -webkit-transform: scale(0.83)
                transform: scale(0.83)
      &.no_book_full
        height: 74px
        .date-week
          ul.scroll-week
            li.scroll-week-item
              .book-status
                display: block
    .content-box-scrollbar-hidden
      overflow: hidden
    .hours-wrapper
      position: relative
      padding-top: 37px
      padding-right: 20px
      height: 100%
      width: calc(100% + 20px)
      overflow-x: hidden
      overflow-y: scroll
      -webkit-overflow-scrolling: touch
      &.no_book_full
        padding-top: 51px
        .timeslot
          padding-top: 91px
      .timeslot
        position: absolute
        left: 0
        top: 0
        padding-top: 77px
        width: 38px
        background: #ffffff
        .hour-minutes
          height: 46px
          text-align: center
          font-size: 12px
          color: #333333
      .timeslot-status
        position: relative
        transform: translateX(0px)
        .timeslot-status-wrapper
          position: absolute
          left: 0
          top: 0
          margin-left: 38px
          // width: calc(100% - 38px)
          transform: translateX(0px)
          background: #ffffff
          overflow: hidden
          .timeslot-status-item
            position: relative
            float: left
            width: calc(100% / 7)
            text-align: center
            border-top: 1px solid #F5F5F5
            &:last-child
              border-right: 1px solid #F5F5F5
            &.disabled
              background: #F9F9F9
            .hour-minutes-status
              position: relative
              z-index: 2
              padding: 5px 0 0
              height: 46px
              text-align: center
              line-height: 18px
              font-size: 12px
              border-left: 1px solid #F5F5F5
              border-bottom: 1px solid #F5F5F5
              background: #F9F9F9
              overflow: hidden
              // enableFe selectFe
              &.default
                background: #ffffff
              &.true-false
                cursor: pointer
                background: #ffffff
                &:active
                  background: #FFE5DA url('./img/calnew-add.png') no-repeat center center
                  background-size: 20px
              &.true-true
                cursor: pointer
                z-index: 3
                background: #ffffff
                overflow: visible
              &.false-false
                color: #B6B6B6
                background: #F9F9F9
            .hour-minutes-status-pos
              position: absolute
              left: -1px
              top: 0
              padding: 5px 0 0
              width: calc(100% + 1px)
              height: 46px
              text-align: center
              line-height: 18px
              font-size: 12px
              border-left: 1px solid #F5F5F5
              border-bottom: 1px solid #F5F5F5
              background: #F9F9F9
              overflow: hidden
              .course-name-over
                height: 36px
                overflow: hidden
                .course-name-table
                  display: table
                  height: 36px
                  width: 100%
                  // 解决 display: table-cell 遇到符号英文时的折行问题
                  table-layout: fixed
                  word-wrap: break-word
                  .course-name
                    display: table-cell
                    vertical-align: middle
              &.major-course
                color: #FF6422
                background: #FFE5DA
                border-left: 3px solid #FF6422
                border-bottom: 1px solid #FFE5DA
              &.minor-course
                color: #FFAF00
                background: #FFF2D5
                border-left: 3px solid #FFAF00
                border-bottom: 1px solid #FFF2D5
              &.open-course
                color: #486AF5
                background: #E5EAFF
                border-left: 3px solid #486AF5
                border-bottom: 1px solid #E5EAFF
              // &.space-2
              //   padding-top: 28px
              //   height: 92px
              //   color: #FF6422
              //   background: #FFE5DA
              //   border-left: 3px solid #FF6422
              &.spos-1
                top: 15px
              &.spos-2
                top: 30px
              // &.false-true 暂无此状态
</style>