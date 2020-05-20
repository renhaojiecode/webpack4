<template>
  <span class="vfe-loading-small" v-bind:style="{width: diameter+'px', height: diameter+'px'}"></span>
</template>

<script>
export default {
  props: {
    diameter: {
      type: Number,
      default: 20
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import "./loading.styl"
</style>

