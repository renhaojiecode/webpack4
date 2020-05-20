<template>
  <div class="vk-swiper-wrapper" @touchmove="stopScroll">
    <div class="vk-swiper-viewport" ref="viewport">
      <div
        class="vk-swiper-content"
        :style="trackStyle"
        @touchstart="canSwipe && handleTouchStart($event)"
        @touchmove="canSwipe && handleTouchMove($event)"
        @touchend="canSwipe && handleTouchEnd()"
        @touchcancel="canSwipe && handleTouchEnd()"
        @transitionend="$emit('change', activeIndicator)"
      >
        <slot />
      </div>
    </div>
    <div
      class="vk-swiper-indicators"
      v-if="showIndicators"
    >
      <i
        v-for="index in count"
        :key="index"
        :class="{active: index - 1 === activeIndicator}"
        class="vk-swiper-indicator"
      ></i>
    </div>
  </div>
</template>
<script>
/**
 * direction 滑动方向，默认为水平，垂直为vertical
 * duration  动画持续时间，默认500ms
 * autoplay  自动播放间隔时间，默认不自动播放
 * loop  是否循环，默认不循环
 * init-swiper  初始位置，默认为0
 * show-indicators  是否显示指示器，默认为是
 * @changing  移动开始时触发事件，参数为当前也索引
 * @change  移动完成后触发事件，参数为当前也索引
 */
export default {
  props: {
    direction: {
      type: String,
      default: 'horizontal'
    },
    duration: {
      type: Number,
      default: 500
    },
    autoplay: {
      type: Number,
      default: 0
    },
    loop: {
      type: Boolean,
      default: false
    },
    canSwipe: {
      type: Boolean,
      default: true
    },
    initSwiper: {
      type: Number,
      default: 0
    },
    showIndicators: {
      type: Boolean,
      default: true
    },
    allowTopScroll: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      swipers: [],
      width: 0,
      height: 0,
      active: 0,
      currentDuration: 0,
      delta: 0,
      offset: 0,
      start: 0
    }
  },
  computed: {
    count() {
      return this.swipers.length
    },
    trackStyle() {
      const style = {
        transitionDuration: this.currentDuration + 'ms'
      }
      if (this.direction === 'vertical') {
        style.paddingTop = this.height + 'px'
        style.transform = `translateY(${this.offset}px)`
      } else {
        style.width = this.width * (this.count + 2) + 'px'
        style.paddingLeft = this.width + 'px'
        style.transform = `translateX(${this.offset}px)`
      }
      return style
    },
    dirkey() {
      const key = {
        box: 'width',
        event: 'clientX'
      }
      if (this.direction === 'vertical') {
        key.box = 'height'
        key.event = 'clientY'
      }
      return key
    },
    activeIndicator() {
      return (this.active + this.count) % this.count
    }
  },
  methods: {
    stopScroll() {
      if (this.allowTopScroll) {
        return
      }
      event.preventDefault()
    },
    init() {
      clearTimeout(this.timer)

      this[this.dirkey.box] = this.$refs.viewport.getBoundingClientRect()[this.dirkey.box]
      this.active = this.initSwiper
      this.currentDuration = 0
      this.offset = this.count > 1 ? -this[this.dirkey.box] * (this.active + 1) : -this[this.dirkey.box]

      this.autoPlay()
    },
    handleTouchStart(event) {
      clearTimeout(this.timer)

      this.delta = 0
      this.currentDuration = 0
      this.start = event.touches[0][this.dirkey.event]
      this.active === -1 && this.move(this.count)
      this.active === this.count && this.move(-this.count)
    },
    handleTouchMove(event) {
      let moveing = event.touches[0][this.dirkey.event]
      this.delta = moveing - this.start
      this.move(0, Math.min(Math.max(this.delta, -this[this.dirkey.box]), this[this.dirkey.box]))
    },
    handleTouchEnd() {
      let move = 0
      let change = false
      let deltaMax = Math.min(this[this.dirkey.box] / 3, 80)

      if (
        !this.loop &&
        ((this.active === 0 && this.delta > 0) ||
        this.active === this.count - 1 && this.delta < 0)
      ) {
        change = false
      } else {
        change = Math.abs(this.delta) > deltaMax
      }

      this.currentDuration = this.duration
      change && (move = this.delta > 0 ? -1 : 1) && this.$emit('changing', this.activeIndicator)
      this.move(move)

      this.autoPlay()
    },
    move(move = 0, offset = 0) {
      let { active, count } = this

      if (
        !this.loop &&
        ((this.active === 0 && (offset > 0 || move < 0)) ||
        this.active === this.count - 1 && (offset < 0 || move > 0))
      ) {
        if (offset) {
          this.offset = offset / 3 - (this.active + 1) * this[this.dirkey.box]
        }
        return
      }

      if (move) {
        this.swipers[0].offset = active === count - 1 && move > 0 ? count * this[this.dirkey.box] : 0
        this.swipers[count - 1].offset = active === 0 && move < 0 ? -count * this[this.dirkey.box] : 0
        this.offset = -(active + 1) * this[this.dirkey.box]
        this.active += move
      } else {
        if (active === 0 && offset > 0) {
          this.swipers[count - 1].offset = -this[this.dirkey.box] * count
        }

        if (active === count - 1 && offset < 0) {
          this.swipers[0].offset = this[this.dirkey.box] * count
        }
      }
      this.offset = offset - (this.active + 1) * this[this.dirkey.box]
    },
    autoPlay() {
      if (!this.autoplay || this.count <= 1) {
        return
      }
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.currentDuration = 0
        this.active >= this.count && this.move(-this.count)
        setTimeout(() => {
          this.currentDuration = this.duration
          if (this.active >= this.count - 1 && !this.loop) {
            this.move(-this.count + 1)
          } else {
            this.move(1)
          }
          this.$emit('changing', this.activeIndicator)
          this.autoPlay()
        })
      }, this.autoplay)
    }
  },
  mounted() {
    this.init()
  },
  destroyed() {
    clearTimeout(this.timer)
  },
  watch: {
    swipers() {
      this.init()
    },
    initSwiper() {
      this.init()
    },
    autoplay() {
      if (!this.autoplay) {
        clearTimeout(this.timer)
      }
    }
  },
}
</script>
<style lang="stylus" scoped>
.vk-swiper-wrapper
  position relative
  overflow hidden

.vk-swiper-viewport
  width: 100%
  height: 100%

.vk-swiper-content
  transition-timing-function: ease
  transition-property: transform

.vk-swiper-indicators
  position absolute
  right: 0
  bottom 10px
  left: 0
  text-align center
  height 6px

.vk-swiper-indicator
  display inline-block
  width 6px
  height 6px
  border-radius 100%
  background #999
  margin 0 3px
  vertical-align top
  &.active
    background #f60
</style>

