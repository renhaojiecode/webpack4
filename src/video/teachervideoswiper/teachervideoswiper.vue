<template lang="pug">
  .videolist(:style="{'z-index': zindex}", v-cloak)
    .video-header(:style="{top: '0'}")
      .header-back(@click="historyBack")
    swiper.video-cover-list(
      v-if="videolist.length > 0"
      direction="vertical"
      :init-swiper="videoActive"
      :show-indicators="false"
      @changing="swiperChange"
      @change="swiperChanged"
    )
      swiper-video(
        ref="video"
        :src="videolist[videoActive].feVideoUrl"
        :poster="videolist[videoActive].feVideoCoverImg"
        :is-user-playing="isUserPlaying"
        :videobarbottom="'64px'"
      )
      swiper-item(v-for="(item, idx) in videolist", :key="idx")
        .video-item(@click="changePlayState")
          .video-cover(v-show="videoActive !== idx || isChanged")
            img(:src="item.feVideoCoverImg")
          .video-title(v-text="videoName(item.feVideoType)", :style="{top: titleTop + 'px'}")
          .video-info-wrapper
            .top-auto-box
              .teacher-name(v-if="item.teacherName", v-text="'@' + item.teacherName", @click.stop="teacherDetailClick(item)")
              .teacher-exp-rating(@click.stop="teacherDetailClick(item)")
                p(v-if="item.teachingExperience > 0")
                  span(v-text="item.teachingExperience")
                  | 年教龄
                p(v-if="item.ratingAverage")
                  | 家长评分
                  span(v-text="item.ratingAverage")
              .level-list(v-if="item.levels && item.levels.length", @click.stop="teacherDetailClick(item)")
                .level-item.font-size-11.vfe-1px(v-for="level in item.levels", v-text="level")
              .video-desc(v-if="item.feVideoType == 'ugcVideo' && item.feVideoDesc", v-text="item.feVideoDesc", @click.stop="teacherDetailClick(item)")
            .bottom-auto-box(:class="{'has-bar':isChanged}")
              .avatar-box
                img.teacher-avatar(:src="teacherAvatar(item.avatar)", @click.stop="teacherDetailClick(item, 'avater')")
                .follow-btn(v-if="!item.feFoloow && !isOnlyTeacherFollowed")
              .video-params(v-if="item.feVideoType != 'selfVideo'", :class="{'liked': item.like}")
                span(:class="item.like ? 'liked' : 'like'", @click.stop="clickLike(idx)")
                span {{item.likeCount}}
              .goto-timeslot(@click="goToTimeslot(item)") 约课
    .swiper-guide(v-if="guideShow")
</template>
<script>
import queryString from 'query-string'
import swiper from '../swiper/swiper.vue'
import swiperItem from '../swiper/swiper-item.vue'
import swiperVideo from '../swiper/swiper-videoplay.vue'
import NetStorage from '@common/_netstorage.js'
const qs = queryString.parse(window.location.search)

export default {
  props: {
    videolist: {
      type: Array,
      required: false,
      default: () => {
        return []
        // {
        //   feTeacherInfo: true, //是否有老师信息
        //   feVideoType: item.feVideoType, //classVideo、ugcVideo、selfVideo
        //   feFoloow: false, //关注
        //   like: item.like,
        //   likeCount: item.likeCount,
        //   teacherName: tinfos.shortName,
        //   teacherId: tinfos.teacherId,
        //   feVideoId: item.feedId,
        //   feVideoUrl: item.mediaUrl,
        //   feVideoCoverImg: item.poster,
        //   avatar: tinfos.avatar,
        //   teachingExperience: tinfos.teachingExperience, //教龄
        //   ratingAverage: tinfos.ratingAverage, //家长评分
        //   levels: this.stringSplitLevel(tinfos.levels), //解析好的数组
        //   feVideoDesc: '', //视频描述
        // }
      }
    },
    teacherinfotype: {
      // 老师信息请求次数 no once all 代表 once 时会把所有的关注按钮隐藏
      // 同时配合feTeacherInfo使用
      type: String,
      required: false,
      default: 'no'
    },
    videocurindex: {
      type: Number,
      required: false,
      default: 0
    },
    zindex: {
      type: Number,
      required: false,
      default: 10,
    },
    hasbar: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
  components: {
    swiper,
    swiperItem,
    swiperVideo,
  },
  data() {
    return {
      isApp219: false,
      courseId: qs.courseId,
      videoActive: 0,
      isUserPlaying: false,
      isChanged: true,
      isChangeActive: false,
      isShowWxShare: false,
      isClickedFocus: false,
      isOnlyTeacherFollowed: false,
      isLoading: false,
      guideShow: false,
      toastCon: {
        show: false,
        text: '',
        timer: null
      },
      teacherOnlyInfo: null,
    }
  },
  created() {
    this.init()
  },
  watch: {
    videolist() {
      this.isLoading = false
    }
  },
  computed: {
    titleTop() {
      return this.hasbar && this.isApp219 ? 12 : 12
    },
  },
  methods: {
    init() {
      this.videoActive = this.videocurindex
      this.isGuideShow()
    },
    isGuideShow() {
      let localStorage = new NetStorage()
      if (!localStorage.getItem('teacherVideoSwiperComponentsGuide')) {
        this.guideShow = true
        localStorage.setItem('teacherVideoSwiperComponentsGuide', 1)
      }
    },
    clickLike(idx) {
      if (!this.videolist[idx].like) {
        // this.likeVideo(idx)
      }
    },
    changePlayState() {
      this.isChanged = false
      this.isUserPlaying = !this.isUserPlaying
      if (this.isUserPlaying) {
        this.$refs.video.play()
      } else {
        this.$refs.video.pause()
      }
    },
    swiperChange() {
      this.isChangeActive = true
      this.isChanged = true
    },
    swiperChanged(idx) {
      if (this.isChangeActive) {
        this.videoActive = idx
        this.isChanged = !this.isUserPlaying
        this.isChangeActive = false
        // this.isClickedFocus = true
        // this.getTeacherInfo(this.videolist[idx])
        if (idx > this.videolist.length - 4 && !this.isLoading) {
          // 请求组件外数据
          this.isLoading = true
          this.$emit('getnextlist')
        }
        this.guideShow && (this.guideShow = false)
      }
    },
    showToast(text) {
      this.toastCon.text = text
      this.toastCon.show = true
    },
    // 自增
    historyBack() {
      this.$refs.video.pause()
      this.$emit('goback')
    },
    videoName(type) {
      let name = {
        classVideo: '上课视频',
        ugcVideo: '精彩视频',
        selfVideo: '自我介绍视频',
      }
      return name[type] ? name[type] : type
    },
    teacherAvatar(href) {
      return (href ? href + '?imageView2/1/w/200/h/200' : require('./img/default-teacher.png'))
    },
    teacherDetailClick(teacher) {
      let courseIdParam = this.courseId ? '&courseId=' + this.courseId : ''
      window.location.href = '/parents/teacher/teacherdetail/?_tbc=h&teacherId=' + teacher.teacherId + courseIdParam
    },
    goToTimeslot(item) {
      window.location.href = '/parents/bookclass/timeslot/?_tbc=h&teacherId=' + item.teacherId + '&courseId=597816'
    },
  }
}
</script>
<style lang="stylus" scoped>
.videolist
  overflow: hidden
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  background-color: #000
  .video-header
    position: absolute
    top: 0
    right: 0
    left: 0
    z-index: 99
  .header-back
    position: absolute
    top: 0
    left: 0
    width: 44px
    height: 44px
    background: url('./img/icon-left.png') no-repeat center center
    background-size: 22px 22px
  .video-cover-list
    height: 100%
  .video-item
    overflow: hidden
    position: relative
    height: 100%
  .video-title
    position: absolute
    top: 12px
    left: 50%
    margin-left: -80px
    width: 160px
    height: 22px
    text-align: center
    line-height: 22px
    font-size: 16px
    font-weight: 600
    color: #ffffff
  .video-cover
    position: absolute
    top: 50%
    width: 100%
    transform: translateY(-50%)
    img
      width: 100%
      vertical-align: bottom
    &::after
      position: absolute
      top: 50%
      left: 50%
      margin: -28px
      width: 56px
      height: 56px
      background: url('./img/icon-play.png') center/contain no-repeat
      content: ''
  .video-info-wrapper
    position: absolute
    right: 0
    bottom: 0
    left: 0
    z-index: 89
    color: #fff
    &::before
      position: absolute
      left: 0
      bottom: 0
      width: 100%
      height: 120%
      background: linear-gradient(180deg, rgba(0,0,0,0) 0%, #000 99%)
      pointer-events: none
      content: ''
    &>*
      position: relative
      z-index: 1
    .top-auto-box
      padding: 0 15px 12px
    .teacher-name
      height: 20px
      line-height: 20px
      font-size: 14px
      font-weight: bold
      color: #ffffff
    .teacher-exp-rating
      margin-top: 6px
      height: 16px
      line-height: 16px
      font-size: 14px
      color: #ffffff
      overflow: hidden
      p
        float: left
        margin-right: 10px
        span
          color: #FF6422
    .level-list
      overflow: hidden
      .level-item
        float: left
        margin: 6px 2px 0 0
        padding: 0 4px
        height: 14px
        line-height: 14px
        color: #FFC616
        font-size: 11px
        -webkit-transform-origin-x: 0
        -webkit-transform: scale(0.9)
        &:before
          border-radius: 6px
          border: 1px solid #FFC616
    .video-desc
      margin-top: 6px
      line-height: 18px
      font-size: 12px
      color: #ffffff
      text-align: justify
    .bottom-auto-box
      padding: 15px 15px 12px
      overflow: hidden
      &.has-bar::after
        content: ' '
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 3px
        background: rgba(255, 255, 255, 0.34)
      .avatar-box
        position: relative
        float: left
        border: 1px solid #ffffff
        border-radius: 50%
        img.teacher-avatar
          display: block
          width: 38px
          height: 38px
          border-radius: 50%
        .follow-btn
          position: absolute
          right: -2px
          bottom: -2px
          width: 38px
          height: 38px
          background: url('./img/icon-follow-default.png') no-repeat right bottom
          background-size: 18px 18px
      .video-params
        position: relative
        display: inline-block
        margin-top: 9px
        margin-left: 22px
        padding-left: 30px
        width: 64px
        height: 22px
        font-size: 14px
        line-height: 22px
        vertical-align: top
        color: #fff
        span
          overflow: hidden
          display: inline-block
          width: 100%
          white-space: nowrap
          text-overflow: ellipsis
        &.liked
          color: #ff6422
        .like
          position: absolute
          top: -5px
          bottom: -5px
          left: -5px
          margin: auto
          width: 32px
          background: url('./img/icon-like.png') center/22px no-repeat
        .liked
          position: absolute
          top: -5px
          bottom: -5px
          left: -5px
          margin: auto
          width: 32px
          background: url('./img/icon-like-active.png') center/22px no-repeat
        .share
          position: absolute
          top: -5px
          bottom: -5px
          left: -5px
          margin: auto
          width: 32px
          background: url('./img/icon-share.png') center/22px no-repeat
      .goto-timeslot
        float: right
        margin-top: 4px
        padding: 6px 0
        width: 86px
        line-height: 20px
        text-align: center
        font-size: 14px
        background: #F85415
        border-radius: 6px
  .swiper-guide
    position: absolute
    top: 30%
    left: 38px
    width: 142px
    height: 177px
    animation: swipe 1s both infinite
    pointer-events: none
    &::before
      position: absolute
      top: 0
      left: 0
      width: 40px
      height: 140px
      background: url('./img/bg-guide-arrow.png') center/contain no-repeat
      content: ''
    &::after
      position: absolute
      right: 0
      bottom: 0
      width: 94px
      height: 128px
      background: url('./img/bg-guide-hand.png') center/contain no-repeat
      content: ''
  @keyframes swipe
    0%
      opacity: 0
      top: 50%
    100%
      opacity: 1
      top: 30%
</style>