<style lang='stylus' scoped>
.d_cutdonw
  width: 60px;
</style>

<template>
  <div class="container">
      <div class="mgt40 mgb20 ">
        <van-field class="radius50 inp" v-model="userPhone" clearable maxlength="11" placeholder="请输入手机号码" type="number" />
      </div>
      <div class="mgb20 cutBox">
        <van-field class="radius50 inp" v-model="phoneCode" clearable maxlength="6" placeholder="请输入验证码" type="number" />
        <CutDown class="cutDown dlc-primary" ref='cut' :disabled="disabled" @click="getCodeNum"></CutDown>
      </div>
      <button class="btn mgt40 " :disabled="disabled1" @click="bindLogin">立即绑定</button>
  </div>
</template>

<script>
import store from "@/store";
import CutDown from "@/components/CutDown";
import { validatePhone } from "@/utils/validate";
import { sendSms, verifyPhone } from "@/http/api/test";
export default {
  components: {
    CutDown
  },
  data() {
    return {
      openId:'',
      userPhone: "",
      phoneCode: "",
      disabled1: false,
      disabled2: false,
    };
  },
  methods: {
    //发送验证码
    async getCodeNum() {
      if (!this.userPhone) {
        this.$toast('手机号码不能为空')
        return;
      }
      if (!validatePhone(this.userPhone)) {
        this.$toast('请输入正确的手机号码')
        return;
      }
      this.disabled2 = true
      try {
        const { data } = await sendSms({
          phone: this.userPhone
        });
        if (data.code == 1) {
          this.$refs.cut.start()
          this.$toast('验证码发送成功！')
        } else {
          this.$toast(data.msg)
          this.$refs.cut.reset()
          this.disabled2 = false
        }
      } catch (error) {
        this.$refs.cut.reset()
        this.disabled2 = false
      }
    },
    //绑定手机
    async bindLogin() {
      if (!this.userPhone) {
        this.$toast('手机号码不能为空')
        return;
      }
      if (!validatePhone(this.userPhone)) {
        this.$toast('请输入正确的手机号码')
        return;
      }
      if (!this.phoneCode) {
        this.$toast('验证码不能为空')
        return;
      }
      this.disabled1 = true;
      try {
        const { data } = await verifyPhone({
          phone:this.userPhone,
          phoneCode:this.phoneCode,
          openId:this.openId,
        });
        if (data.code == 1) {
          this.$toast('验证成功！')
          if(data.data){
            this.$store.commit('SET_TOKEN', data.data)
            this.$router.replace({name:'home'})
          }
        } else {
          this.disabled1 = false;
          this.$toast(data.msg)
        }
      } catch (error) {
        this.disabled1 = false;
      }

    }
  },
  computed:{
    disabled () {
      return !validatePhone(this.userPhone) && !this.disabled2
    }
  },
  created(){
    this.openId = this.$route.params.openId;
  }
};
</script>

<style lang='stylus' scoped>
.container{
  background #F4F7FB;
  padding 0 40px
}
.inp
  background #F1F1F1;
.cutBox
  position relative
.cutDown
  position absolute
  top 0
  right 0
.btn
  width 100%
  border-radius 50px!important
/deep/ .d_cutdonw{
  line-height: 50px;
  button{
    font-size: 16px!important;
  }
}
</style>
