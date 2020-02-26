<style lang="stylus" scoped>
.br
  border-radius 50%
</style>

<template>
  <div class="_c ">
    <vue-better-scroll
      :scrollbar="{fade: true}"
      >
      <template>
        <div class="container">
          <div class="bgg dlc-bg-main hei220"></div>
          <div class="main-box">
            <!-- <div class="main-img">
              <img src="~@/assets/5.jpg">
            </div> -->
            <p class="userName cfff ft20 text-center">{{userInfo.userName}}</p>
            <div class="flex-between solidLine pd10">
              <div>
                <img class="wid40" src="@/assets/ic_position@2x.png" alt="">
                <span class="tll ft16 pdl10">职位</span>
              </div>
              <div class="ft14 c999">{{levelName}}</div>
            </div>
            <div class="flex-between pd10">
              <div>
                <img class="wid40" src="@/assets/ic_phone@2x.png" alt="">
                <span class="tll ft16 pdl10">电话</span>
              </div>
              <div class="ft14 c999">{{userInfo.userAccount}}</div>
            </div>
          </div>
          <div class="notes w100 c999">
            <img class="wid30 l-block" src="@/assets/ic_logo@2x.png" alt="">
            <p class="mg4-y">服务热线 ：
              <a class='dlc-primary' :href="'tel:' + servicePhone">{{servicePhone}}</a>
            </p>
            <p class="mg0">四川极速电科技有限公司</p>
          </div>
        </div>
      </template>
    </vue-better-scroll>
  </div>
</template>
<script>
  import VueBetterScroll from '@/components/better-scroll';
  import { getCustomerPhone } from '@/http/api/test'
  export default {
    name: 'info-info',
    components: {
      VueBetterScroll
    },
    data() {
      return {
        altAvatar: '',
        serviceTel: '1',
        servicePhone:'',
        // userInfo:{}
      }
    },
    created() {
      this.getCustomerPhone()
      // this.getUserInfo()
      console.log(this.userInfo)

    },
    mounted() {
    },
    computed: {
      userInfo() {
        return this.$store.state.user.userInfo
      },
      levelName(){
        let txt = this.userInfo.managerLevel === 0?'平台':
        this.userInfo.managerLevel === 1?'省代理':
        this.userInfo.managerLevel === 2?'市代理':
        this.userInfo.managerLevel === 3?'渠道商':
        this.userInfo.managerLevel === 4?'直营管理员':
        this.userInfo.managerLevel === 5?'子账号':'测试工程师';
        return txt;
      }
    },
    methods: {
      async getCustomerPhone() {
        const {data} = await getCustomerPhone()
        this.servicePhone = data.data.systemValue
      },
    },
  }
</script>
<style lang='stylus' scoped>
.bgg{
  width 100vw
  float left
  top 0
}
.notes{
  position fixed
  bottom 70px
  text-align center
}
.main-img {
  width: 100px;
  height: 100px;
  background: #fff;
  border-radius: 50%;
  margin: -105px auto 0px auto;
  overflow: hidden;
  border: 4px solid #fff;
  img {
    width: 100px;
    height: 100px;
  }
}
.main-box {
  width: 340px;
  background: #fff;
  border-radius: 15px;
  position: absolute;
  box-sizing: border-box;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 20px 0px #e0e0e0;
}
.tll{
  position absolute
  margin-top 12px
}
.trr{
  position absolute
  right 20px
}
.userName
  position: absolute;
  width: 100%;
  margin-top: -60px;
</style>
