<template>
  <div class="container flex-column-center">
    <van-loading size="30px" type="spinner" color="#3367D6"></van-loading>
    <p class="ft20 text-center">加载中...</p>
  </div>
</template>

<script>
import { testerLogin } from "@/http/api/test";
import { urlParse } from '@/utils'
export default {
  data() {
    return {
      openId:'',
    };
  },
  methods: {
    // 通过openId获取token并保存
    async testerLogin(){
      const { data } = await testerLogin({openId:this.openId})
      if(data.code === 1){
        if(data.data){
          this.$store.commit('SET_TOKEN', data.data)
          this.$router.replace({
            name: 'home',
          })
        }else{
          this.$router.replace({
            name: 'testLogin',
            params: {
              openId: this.openId
            }
          })
        }
      }
    }
  },
  created() {
    const { openId } = urlParse(document.URL)
    this.openId = openId
    this.testerLogin()
  }
};
</script>

<style lang='stylus' scoped>
/deep/
  .content
    padding 20px
    img
      max-width 100%
.container
  background #fff
</style>
