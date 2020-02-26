<template>
  <div class="float_c" :style="positionStyle" @click="onClick">
    <slot></slot>
    <img class="icon_sc" :src="imgSrc" alt="">
  </div>
</template>

<script>
export default {
  props: {
    to: {
      type: [String, Object]
    },
    position: {
      type: Object,
      default: () => ({})
    },
    clickFn: {
      type: Function,
      default: () => {}
    },
    imgSrc: {
      type:String,
      default: ''
    }
  },
  computed: {
    positionStyle () {
      let res = ''
      for (let pos in this.position) {
        res += `${pos}:${this.position[pos]}px;`
      }
      return res
    }
  },
  methods: {
    onClick () {
      if (!this.to) {
        return
      }
      this.$router.push(this.to)
    }
  }
}
</script>

<style lang='stylus'>
.icon_sc
  width 50px
  height 50rpx
.float_c
  border-radius 50%
  position fixed
  z-index 999
</style>
