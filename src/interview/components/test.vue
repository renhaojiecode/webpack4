<template lang="pug">
  .name(@click="add", v-text="obj.num")
</template>
<script>
export default {
  data() {
    // 这里写  不会被监听到
    this.obj = {
      num: 1,
      name: 'obj',
    }
    return {
      //
    }
  },
  methods: {
    add() {
      this.obj.num++
    }
  }
}
</script>
<style lang="stylus" scoped>

</style>