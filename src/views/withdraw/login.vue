<template>
  <div class="container">
    <div :style="{ height: bodyHeight + 'px' }" class="box cfff">
      <div class="text-right">
        <img class="img1 wid120 mgt40 mgb20 mgr40" src="~@/assets/bg1.png" alt="">
      </div>
      <div class="main-box">
        <div class="title ft20 mgb20">登录</div>
        <div class="inp mgb20">
          <img class="icon wid18 mgr10" src="~@/assets/phone.png" alt="">
          <input v-model="userAccount" type="text" placeholder="账号">
        </div>
        <div class="inp">
          <img class="icon wid18 mgr10" src="~@/assets/clock.png" alt="">
          <input v-model="passWord" type="password" placeholder="密码">
        </div>
      </div>
      <div class="w100 mgt30 flex-center">
        <button class="btn3"></button>
        <button @click="login" class="btn1 dlc-primary ft18">登录</button>
        <button class="btn2 cfff">忘记密码</button>
      </div>
      <img class="img2 w100 mgt30" src="~@/assets/bg3.png" alt="">
      <img class="img3 wid80" src="~@/assets/bg4.png" alt="">
    </div>
  </div>
</template>

<script>
import { ppLogin } from "@/http/api/withdraw";
export default {
  data() {
    return {
      userAccount:"",
      passWord:"",
      bodyHeight:0,
      openId:''
    };
  },
  mounted(){
    if(this.$route.query.openId){
      this.openId = this.$route.query.openId
    }
    this.bodyHeight=document.documentElement.clientHeight
  },
  methods: {
    async login(){
      if(!this.userAccount){
        this.$toast('请输入账号')
        return;
      }
      if(!this.passWord){
        this.$toast('请输入密码')
        return;
      }
      const { data } = await ppLogin({
        userAccount:this.userAccount,
        passWord:this.passWord,
        openId:this.openId
      })
      if(data.code == 1){
        console.log(this.$store)
        this.$store.commit('SET_TOKEN',data.data)
        console.log(this)
        this.$router.replace({name:'withdraw'})
      }
    }
  }
};
</script>

<style lang='stylus' scoped>
  @import '~@/stylus/variable.styl'
  .box{
    min-height 100vh
    overflow hidden
    background #30ced8
  }
  .main-box{
    width 80%
    margin-left 10%
  }
  .inp{
    border-bottom 1px solid #ffffff
    line-height 40px
    .icon{
      vertical-align middle
    }
    input{
      color #fff
      line-height 40px
      vertical-align middle
      font-size 16px
    }
    input::-webkit-input-placeholder{
      color: #fff;
    }
  }
  .img3{
    display block
    margin -30px auto 20px
  }
  .btn1{
    background #ffffff
    border-radius 50px
    width 140px
    height 40px
    line-height 40px
    text-align center
    margin 0 6px
  }
  .btn2{
    background #30ced8
    border-radius 1.33333rem
    width 1.86667rem
    height 0.69333rem
    line-height 0.69333rem
    font-size 0.32rem
    text-align center
    color #4e51e2
    text-decoration underline
    padding-top 8px
  }
  .btn3{
    background #30ced8
    width 70px
    height 30px
    line-height 30px
  }
</style>
