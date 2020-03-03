<template>
  <div class="container">
    <div class="scroller-wrapper">
      <router-view />
    </div>
    <van-tabbar :fixed='false' v-model="active" active-color="#6aacff">
      <van-tabbar-item :to="{name: 'home'}">
        <span>调式工具</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon1.active : icon1.normal"
        >
      </van-tabbar-item>
      <van-tabbar-item :to="{name: 'info-info'}" :dot="isDot">
        <span>个人中心</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon2.active : icon2.normal"
        >
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        icon1:{
          normal:require('@/assets/ic_tool_n@2x.png'),
          active:require('@/assets/ic_tool_p@2x.png')
        },
        icon2:{
          normal:require('@/assets/ic_mine_n@2x.png'),
          active:require('@/assets/ic_mine_p@2x.png')
        },
        isRender: true
      }
    },
    methods:{
      initActiveTabbar (to) {
        let { name } = to
        switch (name) {
          case 'home':
            this.$store.dispatch('set_tabbar_index', 0)
            break;
          case 'info-info':
            this.$store.dispatch('set_tabbar_index', 1)
            break;
          default:
            break;
        }
      }
    },
    watch: {
      '$route' (to) {
        this.initActiveTabbar(to)
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.initActiveTabbar(to)
      })
    },
    computed: {
      active: {
        get () {
          return this.$store.state.app.tabbarActiveIndex
        },
        set (index) {
          this.$store.dispatch('set_tabbar_index',index)
        }
      },
      isDot: {
        get () {
          return this.$store.state.user.isDot > 0 ? true : false
        }
      }
    }
  }
</script>

<style scoped lang='stylus'>
.container
  display flex
  flex-direction column
.scroller-wrapper
  flex 1
  overflow hidden
</style>
