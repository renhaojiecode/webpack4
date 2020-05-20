<template>
  <teachervideowrapper
    v-if="video.videoPanelShow"
    :zindex="10"
    :teacherinfotype="'all'"
    :videocurindex="video.videoIndex"
    :videolist="videoPlayList"
    @goback="videoGoback"
    @getnextlist="getNextVideoList"
  ></teachervideowrapper>
</template>
<script>
import data from './data.js'
import teachervideowrapper from './teachervideoswiper/teachervideoswiper.vue'
let typeMap = {
  UGC: 'ugcVideo',
  CLASS_VIDEO: 'classVideo',
  SELF: 'selfVideo',
}
export default {
  components: {
    teachervideowrapper,
  },
  data() {
    return {
      video: {
        videoPanelShow: false,
        videoIndex: 0,
      },
      videoPlayList: [],
    }
  },
  mounted() {
    this.init()
    this.video.videoPanelShow = true
  },
  methods: {
    init() {
      let arr = data.data.result.map((item) => {
        let vinfos = item.feedMediaList[0]
        return {
          feTeacherInfo: false, //是否有老师信息
          feVideoType: typeMap[this.type], //classVideo、ugcVideo、selfVideo
          feFoloow: item.follow, //关注
          like: item.like,
          likeCount: item.likeCount,
          teacherName: item.teacherName,
          teacherId: item.teacherId,
          feVideoId: vinfos.feedInfoId,
          feVideoUrl: vinfos.media,
          feVideoCoverImg: vinfos.poster,
          avatar: item.avatar,
          teachingExperience: '', //教龄
          ratingAverage: '', //家长评分
          levels: [], //解析好的数组
          feVideoDesc: item.originMessage, //视频描述
        }
      })
      this.videoPlayList = this.videoPlayList.concat(arr)
    },
    videoGoback() {
      this.video.videoPanelShow = false
    },
    getNextVideoList() {
      this.init() // 获取下一页
    },
  }
}
</script>
<style lang="stylus" scoped>
//
</style>