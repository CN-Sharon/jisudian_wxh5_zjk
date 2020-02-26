<template>
  <div class="container bfff">
    <img
      @click="forget"
      class="forget wid30"
      src="~@/assets/forget.png"
      alt=""
    >
    <img
      @click="logout"
      class="logout wid30"
      src="~@/assets/logout.png"
      alt=""
    >
    <!-- 通知栏 -->
    <!-- <van-notice-bar mode="closeable" background="#ff6666" color="#fff">
      为确保您个人资金安全，请及时修改密码
    </van-notice-bar> -->
    <div class="box cfff text-center">
      <div class="t1 ft16 pdt30 pdb10 c000">我的账号</div>
      <div class="bank text-left">
        <div class="num ft36 mgl20 pdt90">￥{{money}}</div>
        <div class="ft14 mgl20 pd8-y lh24">
          我的余额
          <img
            @click="showTxt"
            class="icon1 wid24 mgl8"
            src="~@/assets/icon.png"
            alt=""
          >
        </div>
      </div>
      <div class="main-box mgb20 mgt30">
        <div class="ft16 mgb10 c000 text-left">提现金额（不低于0.3元）：</div>
        <div class="inp flex-between">
          <div class="flex">
            <div class="ft24 c000 pd10-x">￥</div>
            <input
              v-model="number"
              class="wid160"
              type="number"
              placeholder="请输入金额"
            >
          </div>
          <div>
            <div
              @click="number = money"
              class="c999 ft12 pd10-x"
            >全部提现</div>
          </div>
        </div>
      </div>
      <div class="main-box mgb20 mgt30">
        <div class="ft16 mgb10 c000 text-left">提现方式：</div>
        <div class="flex-between mgb10">
          <div
            :class="{'box_on': active == 1}"
            @click="active = 1"
            class="box1 flex wid120 pd10-y"
          >
            <div class="wid44 hei24">
              <img
                class="icon pd8-x"
                src="~@/assets/weixin.png"
                alt=""
              >
            </div>
            <div class="ft14 c000 pdr10">微信零钱</div>
          </div>
          <div
            :class="{'box_on': active == 2}"
            @click="active = 2"
            class="box1 flex wid120 pd10-y"
          >
            <div class="wid44 hei24">
              <img
                class="icon pd8-x"
                src="~@/assets/bank.png"
                alt=""
              >
            </div>
            <div class="ft14 c000 pdr10">银行卡</div>
          </div>
        </div>
      </div>
      <button
        @click="submit"
        class="btn cfff mgt30"
      >确认提现</button>
    </div>
    <!-- 提现成功-弹框 -->
    <div
      v-if="show"
      class="mask"
    ></div>
    <div
      v-if="show"
      class="alert-box"
    >
      <div class="alert-main text-center bfff">
        <img
          class="wid124"
          src="~@/assets/img1.png"
          alt=""
        >
        <div class="ft20 pd10-y">提现成功</div>
        <div class="ft2014 c999">提现金额将在1个工作日内到账</div>
        <button class="btn cfff ft18 mgt30">查看进度</button>
      </div>
      <div
        class="alert-btn pd20 text-center mgt10"
        @click="onCancel"
      >
        <img
          class="wid40"
          src="~@/assets/close.png"
          alt=""
        >
      </div>
    </div>
    <!-- 确认是否提现-弹框 -->
    <div
      v-if="show1"
      class="mask"
    ></div>
    <div
      v-if="show1"
      class="alert-box alert-box-1"
    >
      <div class="alert-main text-center bfff">
        <div class="ft18 pd10-y">提示</div>
        <div class="ft18 pd10-y">是否确定提现？</div>
        <div class="flex-center mgt20">
          <button
            :disabled="disabled"
            @click="withdraw"
            class="btn-g btn-g-1"
          >确定</button>
          <button
            @click="show1 = false"
            class="btn-g"
          >取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { withdraw, getCashRequestBalance } from "@/http/api/withdraw";
export default {
  data () {
    return {
      money: 0,
      number: '',
      show: false,
      show1: false,
      active: 1,
      bankId: '',
      disabled: false
    };
  },
  mounted () {
    this.getCashRequestBalance()
    this.$notify({
      message: '为确保您个人资金安全，请及时修改密码',
      duration: 3400
    });
  },
  methods: {
    showTxt () {
      this.$dialog.alert({
        title: '',
        message: '如若收益为负数，是因为客人退款造成，如还有疑问，请联系公司人员'
      }).then(() => {
        // on close
      });
    },
    onCancel () {
      this.show = false
      this.number = ''
      this.getCashRequestBalance()
    },
    // 修改密码
    forget () {
      this.$router.push('withdrawEditPassword')
    },
    // 退出登陆
    logout () {
      this.$store.dispatch('user/FedLogOut')
      WeixinJSBridge.call('closeWindow');
    },
    // 获取余额
    async getCashRequestBalance (openId) {
      const { data } = await getCashRequestBalance()
      if (data.code == 1) {
        this.money = data.data
      }
    },
    // 提现按钮
    submit () {
      if (this.disabled) {
        return;
      }
      if (!this.number) {
        this.$toast('请输入提现金额')
        return
      }
      if (this.number < 0.3) {
        this.$toast('提现金额不能低于0.3元')
        return
      }
      if (this.number > this.money) {
        this.$toast('提现金额不能超过余额')
        return
      }
      this.show1 = true
    },
    // 提现
    async withdraw () {
      this.disabled = true
      try {
        const { data } = await withdraw({
          bankId: this.bankId,
          money: this.number,
          orderType: this.active,
        })
        if (data.code == 1) {
          this.disabled = false
          this.show1 = false
          this.show = true
        } else {
          this.disabled = false
          this.show1 = false
        }
      } catch (error) {
        this.disabled = false
        this.show1 = false
      }
    }
  }
};
</script>

<style lang='stylus' scoped>
@import '~@/stylus/variable.styl';

.van-notice-bar {
  height: 40px;
  opacity: 0.8;
}

.box {
  min-height: 100vh;
}

.main-box {
  width: 80%;
  margin-left: 10%;
  border-bottom: 1px solid #ddd;
}

.inp {
  div {
    vertical-align: middle;
    line-height: 40px;
  }

  input {
    vertical-align: middle;
    line-height: 40px;
    color: #000;
    font-size: 20px;
  }
}

.box1 {
  border: 1px solid #dddddd;
  border-radius: 4px;
}

.box_on {
  border: 1px solid #ff0000;
  background: url('~@/assets/choose.png') no-repeat 100% 100%;
  background-size: 12px;
}

.btn {
  border-radius: 50px;
  width: 80%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background: #009ec9;
  font-size: 16px;
}

.btn-g {
  width: 100px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 16px;
  background: #c9c9c9;
  color: #666;
  border-radius: 50px;
  margin: 0 12px;
  font-size: 16px;
}

.btn-g-1 {
  background: #009ec9;
  color: #fff;
}

.bank {
  width: 340px;
  height: 190px;
  margin-left: 20px;
  color: #ffffff;
  background: url('~@/assets/bg2.png') no-repeat 100% 100%;
  background-size: contain;
}

.mask {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  background: #000;
  opacity: 0.75;
  z-index: 80;
}

.alert-box {
  position: absolute;
  z-index: 99;
  width: 100vw;
  height: 100vh;
  top: 0px;
}

.alert-box-1 .alert-main {
  width: 74%;
  margin-left: 13%;
  height: 150px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}

.alert-main {
  width: 90%;
  margin-left: 5%;
  margin-top: 15%;
  border-radius: 8px;
  padding: 20px 0 30px;
}

.logout {
  position: absolute;
  right: 10px;
  top: 20px;
}

.icon {
  max-height: 24px;
  max-width: 24px;
  vertical-align: middle;
}

.icon1 {
  vertical-align: middle;
}

.forget {
  position: absolute;
  right: 70px;
  top: 20px;
}
</style>
