<template>
  <div class="vk-swiper-item" :style="style">
    <slot />
  </div>
</template>
<script>
export default {
  name: 'vk-swiper-item',
  data() {
    return {
      offset: 0
    }
  },
  computed: {
    style() {
      const { width, height, direction } = this.$parent
      const style = {}
      if (direction === 'vertical') {
        style.height = height + 'px'
        style.transform = `translateY(${this.offset}px)`
      } else {
        style.display = 'inline-block'
        style.width = width + 'px'
        style.transform = `translateX(${this.offset}px)`
      }
      return style
    }
  },
  beforeCreate() {
    this.$parent.swipers.push(this)
  },
  destroyed() {
    this.$parent.swipers.splice(this.$parent.swipers.indexOf(this), 1)
  }
}
</script>
<style lang="stylus" scoped>
.vk-swiper-item
  vertical-align: bottom
</style>
