<template>
  <div id="app">
    <router-view />
    <div class="loading" v-show="loading">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <!-- <div class='full_sc' v-show="loading"> -->
      <!-- <van-loading class="custom-class" type="spinner" :size="50" color="#8adff4" /> -->
      <!-- <rise-loader class="custom-class" color="#8adff4" :loading="loading" :size="15" sizeUnit="px"></rise-loader> -->
    <!-- </div> -->
  </div>
</template>

<script>

export default {
  computed: {
    loading () {
      // return true
      return this.$store.state.loading
    }
  },
  watch: {
    loading (nv, ov) {
      const root = document.documentElement
      if (nv) {
        root.classList.add('_fc')
      } else {
        root.classList.remove('_fc')
      }
    }
  }
};
</script>

<style lang='stylus'>
.full_sc
  background-color: rgba(25, 25, 25, .6);
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0
  z-index: 99999
  text-align center
.custom-class
  top:50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
.loading{
    width: 80px;
    height: 60px;
    // margin: 0 auto;
    // margin-top:100px;
    top:50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
}
.loading span{
    display: inline-block;
    width: 8px;
    height: 100%;
    margin: 0 2px;
    border-radius: 4px;
    background: lightgreen;
    -webkit-animation: load 1s ease infinite;
}
@-webkit-keyframes load{
    0%,100%{
        height: 40px;
        background: lightgreen;
    }
    50%{
        height: 70px;
        margin: -15px 4px;
        background: lightblue;
    }
}
.loading span:nth-child(2){
    -webkit-animation-delay:0.2s;
}
.loading span:nth-child(3){
    -webkit-animation-delay:0.4s;
}
.loading span:nth-child(4){
    -webkit-animation-delay:0.6s;
}
.loading span:nth-child(5){
    -webkit-animation-delay:0.8s;
}
</style>
