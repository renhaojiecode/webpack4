<template lang="pug">
  <div>
    <canvas id="canvasDragon"></canvas>
    <canvas id="canvasDragon2"></canvas>
    <div id="container"></div>
  </div>
</template>
<script>
export default {
  props: [],
  data() {
    return {

    }
  },
  mounted() {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    init() {
      var canvas = document.getElementById('canvasDragon')
      var canvas2 = document.getElementById('canvasDragon2')
      var ctx = canvas.getContext('2d')
      var ctx2 = canvas2.getContext('2d')

      var image = new Image()
      image.src = require('../img/dragon.jpeg')
      image.onload = () => {
        canvas.width = image.width
        canvas.height = image.height
        canvas2.width = image.width
        canvas2.height = image.height

        ctx.drawImage(image, 0, 0)
        var imageData = ctx.getImageData(0, 0, image.width, image.height).data;
        this.getNodeList(image, imageData, ctx2)
      }
    },
    getNodeList(image, imageData, ctx) {
      ctx.fillStyle = '#e5e5e5';
      ctx.fillRect(0, 0, image.width, image.height);

      var gap = 6;

      for (var h = 0; h < image.height; h += gap) {
        for (var w = 0; w < image.width; w += gap) {
          var position = (image.width * h + w) * 4;
          var r = imageData[position], g = imageData[position + 1], b = imageData[position + 2];

          if (r + g + b == 0) {
            ctx.fillStyle = '#000';
            ctx.fillRect(w, h, 4, 4);
          }
        }
      }
      this.setRender(image, imageData, gap)
    },
    setRender(image, imageData, gap) {
      var dragonContainer = document.getElementById('container');
      var dragonScale = 2;

      for (var h = 0; h < image.height; h += gap) {
        for (var w = 0; w < image.width; w += gap) {
          var position = (image.width * h + w) * 4;
          var r = imageData[position], g = imageData[position + 1], b = imageData[position + 2];

          if (r + g + b == 0) {
            var bubble = document.createElement('img');
            bubble.src = require('../img/hecha.gif')
            bubble.setAttribute('class', 'bubble');

            var bubbleSize = Math.random() * 10 + 20;
            bubble.style.left = (w * dragonScale - bubbleSize / 2) + 'px';
            bubble.style.top = (h * dragonScale - bubbleSize / 2) + 'px';
            bubble.style.width = bubbleSize + 'px'
            bubble.style.height = bubbleSize + 'px'
            bubble.style.animationDuration = Math.random() * 6 + 4 + 's';

            dragonContainer.appendChild(bubble);
          }
        }
      }
    }
  }
}
</script>
<style lang="stylus">
#container
  height: 800px
  position: relative
.bubble
  position: absolute
</style>