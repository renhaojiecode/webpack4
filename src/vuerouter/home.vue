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
export default {
  components: {
    calendar
  },
  data() {
    return {
      isOnLoaded: true,
      timeSlotSlider: [],
      active: 0,
      maxActive: 0,
      minActive: 0,
      calendarH: 60,
      guideCalendar: 0,
    }
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
    background: #999999
</style>
<style module>
.black {
  background: black
}
</style>
