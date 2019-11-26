<template lang="pug">
  .home-wrapper
    | 好惨啊啊怎么老是报错
    div( :class="{[$style.black]: true}")
    calendar(
      v-if="isOnLoaded",
      :arr-month-week="timeSlotSlider",
      :active="active",
      :max-active="maxActive",
      :min-active="minActive",
      :height="calendarH",
      @time-select="selectTime",
      :guide="guideCalendar"
    )
</template>

<script>
import calendar from './calendar2.0.vue'
import data from './calendar.js'
export default {
  components: {
    calendar
  },
  data() {
    return {
      isOnLoaded: true,
      timeSlotSlider: [],
      active: 0,
      maxActive: 2,
      minActive: 0,
      calendarH: 500,
      guideCalendar: 0,
    }
  },
  mounted() {
    this.timeSlotSlider = data
  },
  methods: {
    selectTime() {
      console.log(this.$style.black + 'selectTime event')
    }
  }
}
</script>
<style lang="stylus" scoped>
.home-wrapper
  height: 100%
  background: #999999
</style>
<style module>
.black {
  background: black
}
</style>
