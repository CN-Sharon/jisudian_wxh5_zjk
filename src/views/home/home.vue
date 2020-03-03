<style lang="stylus" scoped>
.banner-img
  width 100%
  height 100%
</style>

<template>
  <div class="container">
    <vue-better-scroll
      :scrollbar="{fade: true}"
    >
      <van-swipe class="banner mgb10" :autoplay="3000" indicator-color="white">
        <van-swipe-item>
          <img class="banner-img" src="@/assets/banner@2x.png" alt="">
        </van-swipe-item>
        <!-- <van-swipe-item v-for="(banner, index) in bannerList" :key="index"> -->
          <!-- <img class="banner-img" :src="$imgUrl + banner.advertisementPic" alt=""> -->
        <!-- </van-swipe-item> -->
      </van-swipe>
      <van-row :gutter="10" type="flex" justify="center">
        <van-col span="12">
          <div class="pd20 bfff text-center radius-4" @click="scanQRCode">
            <div class="hei50">
              <img class="wid50" src="@/assets/btn15.png" alt="">
            </div>
            <p class="ft20 mg6-y">扫码测试</p>
            <p class="ft12 c999 lh24 mg0">（扫码测试基本信息、弹宝等）</p>
          </div>
        </van-col>
        <van-col span="12">
          <div class="pd20 bfff text-center radius-4" @click="adBoxClick">
            <div class="hei50">
              <img class="wid60" src="@/assets/btn16.png" alt="">
            </div>
            <p class="ft20 mg6-y">广告屏测试</p>
            <p class="ft12 c999 lh24 mg0">（测试广告屏等，敬请期待...）</p>
          </div>
        </van-col>
      </van-row>
      <van-row :gutter="10" type="flex" justify="center" class="mgt10">
        <van-col span="12">
          <div class="pd20 bfff text-center radius-4" @click="scanQRCodeTest">
            <div class="hei50">
              <img class="wid60" src="@/assets/btn14.png" alt="">
            </div>
            <p class="ft20 mg6-y">模拟测试</p>
            <p class="ft12 c999 lh24 mg0">（模拟用户扫码测试）</p>
          </div>
        </van-col>
        <van-col span="12">
        </van-col>
      </van-row>
    </vue-better-scroll>
  </div>
</template>
<script>
  import { urlParse }  from '@/utils'
  import VueBetterScroll from '@/components/better-scroll';
  import initWxConfig from '@/mixins/getSign';
  export default {
    components: {
      VueBetterScroll
    },
    data() {
      return {
        bannerList: [],
      }
    },
    mixins: [initWxConfig],
    mounted() {
      // 调用初始化函数地图
      this.$nextTick(() => {
        this.initWxConfig();
      })
    },
    methods: {
      // 广告屏测试
      adBoxClick(){
        this.$toast('暂未开放')
      },
      // 扫一扫
      async scanQRCode(){
        // todo-eq:
        // this.$router.push({
        //   name:'info-equipmentDetail',
        //   params:{ equipmentNumber:'JSD0000001' }
        // })
        // return
        this.$wx.scanQRCode({
          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
          success: async res => {
            var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
            let equipmentNumber = result.split("?")[1].split("=")[1];
            this.$router.push({
              name:'info-equipmentDetail',
              params:{ equipmentNumber }
            })
          },
          error:function(error){
            console.log("scanQRCode error----",error);
          }
        });
      },
      // 扫一扫（模拟测试）
      async scanQRCodeTest(){
        // todo-eq:
        // this.$router.push({
        //   name:'info-equipmentDetail-test',
        //   params:{ equipmentNumber:'JSD0000001' }
        // })
        // return
        this.$wx.scanQRCode({
          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
          success: async res => {
            var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
            let equipmentNumber = result.split("?")[1].split("=")[1];
            this.$router.push({
              name:'info-equipmentDetail-test',
              params:{ equipmentNumber }
            })
          },
          error:function(error){
            console.log("scanQRCode error----",error);
          }
        });
      },
    },
  }
</script>
<style scoped lang='stylus'>
._c
  overflow hidden
.container
  width auto
  height 100%
  padding: 12px
.banner
  width 100%
  border-radius 10px
  height 150px
.btn
  width 70%
  letter-spacing 2px
  margin-left 15%
  margin-bottom 50px
.phone_box
  line-height 50px
  border-radius 6px
  width 80%
  .txt1
    color #6aacff
  .txt2
    background #ffffff
    width 100%
    border-top 1px solid #f4f4f4
</style>
