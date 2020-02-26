<template>
  <div class="container">
    <div class="box">
      <div class="text-center">
        <img
          class="wid300 mgt40 mgb20"
          src="~@/assets/bg5.jpg"
          alt=""
        >
      </div>
      <div class="main-box">
        <div class="title ft20 mgb30 text-center">修改密码</div>
        <input
          class="inp1"
          v-model="userAccount"
          type="text"
          readonly
          placeholder="用户账号"
        >
        <div class="inp flex">
          <input
            v-model="old_password"
            :type="valType1"
            placeholder="原密码"
            @blur="onBlur"
          >
          <div
            @click="eyeClick(1)"
            class="eye"
            :class="{eye_on:valType1=='text'}"
          ></div>
        </div>
        <div class="inp flex">
          <input
            v-model="new_password"
            :type="valType2"
            placeholder="新密码"
            @blur="onBlur"
          >
          <div
            @click="eyeClick(2)"
            class="eye"
            :class="{eye_on:valType2=='text'}"
          ></div>
        </div>
        <div class="inp flex">
          <input
            v-model="again_new_password"
            :type="valType3"
            placeholder="确认新密码"
            @blur="onBlur"
          >
          <div
            @click="eyeClick(3)"
            class="eye"
            :class="{eye_on:valType3=='text'}"
          ></div>
        </div>
        <!-- <div class="inp-box flex">
          <input
            class="inp inp_sp"
            v-model="phoneCode"
            type="text"
            placeholder="验证码"
          >
          <div>
            <CutDown
              class="btn_code"
              :startVal="120"
              ref="CutDown"
              :disabled="disabled"
              @click="getCodeNum"
            ></CutDown>
          </div>
        </div> -->
      </div>
      <div class="w100 mgt30 flex-center">
        <button
          :disabled="disabled"
          @click="submit"
          class="btn btn1 ft18"
        >确认</button>
        <button
          @click="cancel"
          class="btn ft18"
        >取消</button>
      </div>
    </div>
    <!-- 弹框 -->
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
          src="~@/assets/img2.jpg"
          alt=""
        >
        <div class="ft20 pd10-y">密码修改成功</div>
        <div class="ft16">请重新登录</div>
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
  </div>
</template>

<script>
import { updatePwd, getUserInfo } from "@/http/api/withdraw";
import CutDown from "@/components/CutDown";
export default {
  components: {
    CutDown
  },
  data () {
    return {
      show: false,
      disabled: false,
      valType1: 'password',
      valType2: 'password',
      valType3: 'password',
      old_password: "",
      new_password: "",
      again_new_password: "",
      phoneCode: "",
      userAccount: ""
    };
  },
  mounted () {
    this.getUser()
  },
  methods: {
    // 输入框失去焦点时
    onBlur () {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
    // 密码显示与隐藏
    eyeClick (type) {
      if (type == 1) {
        this.valType1 == 'password' ? this.valType1 = 'text' : this.valType1 = 'password'
      } else if (type == 2) {
        this.valType2 == 'password' ? this.valType2 = 'text' : this.valType2 = 'password'
      } else {
        this.valType3 == 'password' ? this.valType3 = 'text' : this.valType3 = 'password'
      }
    },
    // 获取当前账户
    async getUser () {
      const { data } = await getUserInfo()
      if (data.code == 1) {
        this.userAccount = "用户账号：" + data.data.userAccount
      }
    },
    //发送验证码
    async getCodeNum () {
      // const { data } = await getPhoneCode({
      //   type: type,
      //   phone: this.userPhone
      // });
      // if (data.code === 1) {
      //   this.$toast("验证码发送成功！")
      // } else {
      //   this.$toast(data.msg)
      //   this.$refs.CutDown.reset();
      // }
    },
    onCancel () {
      // this.$router.replace({ name: 'login' })
      this.show = false
      WeixinJSBridge.call('closeWindow');
    },
    async submit () {
      if (!this.old_password) {
        this.$toast('请输入原密码')
        return;
      }
      if (!this.new_password) {
        this.$toast('请输入新密码')
        return;
      }
      if (!this.again_new_password) {
        this.$toast('请再次输入新密码')
        return;
      }
      if (this.new_password !== this.again_new_password) {
        this.$toast('新密码前后不一致')
        return;
      }
      this.disabled = true
      try {
        const { data } = await updatePwd({
          oldPassWord: this.old_password,
          passWord: this.new_password,
        })
        if (data.code == 1) {
          this.show = true;
          this.disabled = false
        } else {
          this.disabled = false
        }
      } catch (error) {
        this.disabled = false
      }

    },
    cancel () {
      this.$router.go(-1)
    }
  }
};
</script>

<style lang='stylus' scoped>
@import '~@/stylus/variable.styl';

.d_cutdonw {
  margin-top: -16upx;
  line-height: 30upx;
}

/deep/ .d_cutdonw .dlc-btn {
  height: 42px;
  line-height: 42px;
  width: 70px;
  border-radius: 50px;
  color: #02a3d1;
  margin-bottom: 10px;
}

input::-webkit-input-placeholder {
  color: #999;
}

.box {
  min-height: 100vh;
  // overflow: hidden;
  background: #f9f9f9;
}

.inp1 {
  border: 0.02667rem solid #ebebeb;
  line-height: 40px;
  width: 80%;
  margin-left: 10%;
  margin-bottom: 10px;
  background: #fff;
  padding: 0 20px;
  color: #999;
  box-sizing: border-box;
  border-radius: 40px;
}

.inp {
  border: 0.02667rem solid #ebebeb;
  line-height: 40px;
  width: 80%;
  margin-left: 10%;
  margin-bottom: 10px;
  background: #fff;
  border-radius: 40px;

  input {
    width: 80%;
    padding: 0 20px;
    color: #999;
    box-sizing: border-box;
  }

  .eye {
    width: 20%;
    height: 40px;
    background: url('~@/assets/eye_close.png') no-repeat 100% 100%;
    background-size: 18px;
    background-position: center;
  }

  .eye_on {
    background: url('~@/assets/eye_on.png') no-repeat 100% 100%;
    background-size: 20px;
    background-position: center;
  }
}

.inp-box {
  width: 80%;
  margin-left: 10%;
}

.inp_sp {
  width: 80%;
  margin-left: 0;
}

.btn {
  width: 120px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  margin: 0 12px;
  background: #c2c2c2;
  border-radius: 50px;
  font-size: 18px;
  color: #666;
}

.btn1 {
  color: #fff;
  background: #02a3d1;
}

.mask {
  position: absolute;
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
  top: 140px;
}

.alert-main {
  width: 76%;
  margin-left: 12%;
  border-radius: 8px;
  padding: 20px 0 30px;
}

.logout {
  position: absolute;
  right: 10px;
  top: 20px;
}
</style>
