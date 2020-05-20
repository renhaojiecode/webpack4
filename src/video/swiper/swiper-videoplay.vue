<template>
<div class="video-fullplay" :style="fitSwiper" v-show="!isVideoChanged">
  <video :src="src" :poster="poster" ref="video" type="video/mp4" autoplay="autoplay" preload="none" webkit-playsinline="true" playsinline="true" x-webkit-airplay="true" t7-video-player-type="inline" loop></video>
  <div class="video-bar" :style="{'bottom': videobarbottom}">
    <span :style="barStyle"></span>
  </div>
  <div class="video-loading" v-show="isLoading">
    <loading-small :diameter="30"></loading-small>
  </div>
  <div class="video-playbtn" v-show="!isPlaying"></div>
</div>
</template>
<script>
/**
 * src  视频地址
 * poster  视频封面图
 * loop  视频是否循环播放，否的话播放完当前视频会自动滑到下一个视频播放
 * isUserPlaying  用户是否在播放视频
 */
import loadingSmall from '../loading/loading.vue'

export default {
  props: {
    src: {
      type: String,
      required: true
    },
    poster: {
      type: String,
      required: true
    },
    loop: {
      type: Boolean,
      default: true
    },
    isUserPlaying: {
      type: Boolean,
      default: false
    },
    videobarbottom: {
      type: String,
      required: false,
      default: '66px'
    }
  },
  data() {
    return {
      isPlaying: false,
      isChanging: false,
      isLoading: false,
      isVideoChanged: true,
      isAutoChanging: false,
      videoTime: 0,
      videoTimeTotal: 1000
    }
  },
  computed: {
    fitSwiper() {
      let height = this.$parent.height || 0
      let active = this.$parent.activeIndicator + 1 || 0
      return `top:${height * active}px;height:${height}px;`
    },
    barStyle() {
      return { width: (100 * this.videoTime / this.videoTimeTotal).toFixed(2) + '%' }
    }
  },
  components: { loadingSmall },
  mounted() {
    let v = this.$refs.video
    this.$emit('addevent', v)
    v.addEventListener('loadstart', () => {
      this.videoTime = 0
      this.isLoading = this.isUserPlaying
    })
    v.addEventListener('durationchange', () => {
      this.videoTimeTotal = v.duration
    })
    v.addEventListener('canplay', () => {
      this.isLoading = false
      if (this.isUserPlaying) {
        this.isPlaying = true
        v.play()
      } else {
        this.isPlaying = false
        v.pause()
      }
    })
    v.addEventListener('timeupdate', () => {
      this.videoTime = v.currentTime
    })
    v.addEventListener('waiting', () => {
      this.isLoading = true
    })
    v.addEventListener('ended', () => {
      this.isAutoChanging = true
      this.$parent.$emit('changing', this.$parent.activeIndicator)
      this.$parent.currentDuration = 500
      this.$parent.move(1)
    })
    this.$parent._events.changing.push(() => {
      this.isVideoChanged = true
      this.isChanging = true
      this.isPlaying = false
      !this.isAutoChanging && v.pause()
    })
    this.$parent._events.change.push(() => {
      if (this.isChanging && this.isUserPlaying) {
        this.isVideoChanged = false
        this.isChanging = false
        this.isPlaying = true
        this.isAutoChanging ? (this.isAutoChanging = false) : v.play()
      }
    })
  },
  methods: {
    play() {
      this.isVideoChanged = false
      this.isPlaying = true
      this.$refs.video.play()
    },
    pause() {
      this.isPlaying = false
      this.$refs.video.pause()
    }
  }
}
</script>
<style lang="stylus" scoped>
.video-fullplay
  overflow: hidden
  position: absolute
  top: 0
  width: 100%
  video
    position: absolute
    top: 50%
    width: 100%
    transform: translateY(-50%)
    &.hide
      top: 100%
      transform: none
.video-loading
  position: absolute
  top: 50%
  left: 50%
  margin: -15px
.video-bar
  position: absolute
  bottom: 0
  left: 0
  width: 100%
  height: 3px
  z-index: 3
  background-color: rgba(255, 255, 255, 0.34)
  span
    display: inline-block
    width: 0
    height: 3px
    vertical-align: top
    background-color: #fff
.video-playbtn
  position: absolute
  top: 50%
  left: 50%
  margin: -28px
  width: 56px
  height: 56px
  background: url('./img/icon-play.png') center/contain no-repeat
</style>
