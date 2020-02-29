<template>
  <div class="container" v-if="show1">
    <template>
      <van-sticky>
        <div class="header w_100 hei80 pd10-x flex-between">
          <span class="ft22 bold">设备详情</span>
          <img class="wid80" src="@/assets/bg@2x.png" alt="">
        </div>
        <div class="pd10-x bgg">
            <!-- <p class="mg0 ft16 lh40 pd10-x">机柜信息</p> -->
            <div class="lh10 hei10"></div>
            <main class="pr main bgw radius-8 pd10 c999 ft14 lh24">
              <p class="mg0">机柜编号：{{equipmentNumber}}</p>
              <p class="mg0">
                <span>
                  4G强度信号：{{notes.signal}}
                </span>
                <img @click="show = true"  style="display:inline-block;vertical-align:middle" class="wid20 mgl80 mgb2" src="@/assets/question.png" alt="">
              </p>
              <p class="mg0">硬件版本：{{notes.hardVersion}}</p>
              <p class="mg0">软件版本：{{notes.softVersion}}</p>
              <p class="mg0">机柜温度：{{notes.temp}}°C</p>
              <div class="restart" @click="onRebootDevice">
                <img class="wid40" src="@/assets/restart@2x.png" alt="">
                <p class="p1 mg0 dlc-warning ft15 text-center" >重启</p>
              </div>
            </main>
            <div class="mg4-y ft16 lh40 pd10-x flex-between">
              <span>槽口</span>
              <div class="flex">
                <!-- <van-dropdown-menu active-color="#17AADB" overlay="false" @change="onPopAll">
                  <van-dropdown-item v-model="value1" :options="option1" />
                </van-dropdown-menu> -->
                <img @click="onPopAll" class="wid120" src="@/assets/btn_pop@2x.png" alt="">
                <!-- <img @click="onPopAll" class="wid100" src="@/assets/btn_popp@2x.png" alt=""> -->
                <img @click="onRefresh" class="wid20 mgl20" src="@/assets/ic_refresh@2x.png" alt="">
              </div>
            </div>
        </div>
      </van-sticky>
      <div class="pd10-x mgb30">
        <main class="main bgw radius-8 pd10 c999 ft14">
					<div
            v-for="(item,index) in eqList"
            :key="index"
            :class="{'solidLine':index!==eqList.length-1}"
            class="ft12 flex-between pdb6">
            <div class="flex">
              <span class="dlc-primary pdr8 wid20">{{item.index}}</span>
              <van-slider
                v-model="item.number"
                bar-height="16px"
                active-color="#CCF2FF"
                disabled
              >
                <div
                  slot="button"
                  class="custom-button ft12"
                >
                  {{ item.number }}%
                </div>
              </van-slider>
              <div class="pd16-x">
                <p class="mg0 pd4-y">
                  <span><i class="dlc-bg-success wid6 hei6 l-block radius mgr4 mgb2"></i>SN:{{item.batterySn}}</span>
                </p>
                <p class="mg0 pd4-y">
                  <span class="pdr8"><i class="dlc-bg-warning wid6 hei6 l-block radius mgr4 mgb2"></i>电压:{{item.voltage}}V</span>
                </p>
                <p class="mg0 pd4-y">
                  <span><i class="dlc-bg-danger wid6 hei6 l-block radius mgr4 mgb2"></i>温度:{{item.temp}}°C</span>
                </p>
              </div>
            </div>
            <div>
              <!-- <van-dropdown-menu direction="up" active-color="#17AADB">
                <van-dropdown-item v-model="item.type" :options="option1"  @change="onPopOne(item)"/>
              </van-dropdown-menu> -->
              <div v-if="item.state === 0" class="cfff btn2 ft14 pd14-x hei20 lh20 radius20 mg10">空仓</div>
              <div v-if="item.state !== 0" class="cfff btn1 dlc-bg-warning btn3 ft14 pd14-x hei20 lh20 radius20 mg10" @click="onPopOne(0,item.index)">锁定输出</div>
              <div v-if="item.state !== 0" class="cfff btn1 dlc-bg-main btn4 ft14 pd14-x hei20 lh20 radius20 mg10" @click="onPopOne(1,item.index)">开启输出</div>
              <!-- <div class="cfff dlc-bg-main ft14 pxd14-x hei20 lh20 radius20 mgt10" @click="onPopOne(1,item.index)">开启输出</div> -->
            </div>
					</div>
				</main>
      </div>
    </template>
    <!-- 信号信息框 -->
    <van-popup v-model="show" :style="{width:'80%',padding:'20px'}">
      <van-row class="line">
        <van-col class="row" span="8">信号值</van-col>
        <van-col class="row" span="16">信号强度</van-col>
      </van-row>
      <van-row class="line">
        <van-col class="row" span="8">0</van-col>
        <van-col class="row" span="16">-113dBm 或更低</van-col>
      </van-row>
      <van-row class="line">
        <van-col class="row" span="8">1</van-col>
        <van-col class="row" span="16">-111dBm</van-col>
      </van-row>
      <van-row class="line">
        <van-col class="row" span="8">2 ~ 30</van-col>
        <van-col class="row" span="16">-109dBm ~ -53dBm</van-col>
      </van-row>
      <van-row class="line">
        <van-col class="row" span="8">31</van-col>
        <van-col class="row" span="16">-51dBm 或更强</van-col>
      </van-row>
      <van-row class="line">
        <van-col class="row row1" span="8">99</van-col>
        <van-col class="row row2" span="16">正在上电初始化或者无信号或者4G设备故障</van-col>
      </van-row>
    </van-popup>
    <van-overlay :show="showLoading">
    <!-- <van-overlay :show="showLoading" @click="onClickHide"> -->
      <!-- <div class="overlay">
        <van-loading :show="showLoading"  style="margin:0 auto;" color="#1989fa" :size="60"/>
      </div> -->
    </van-overlay>
  </div>
</template>
<script>
  import { scanQR, popOne, popAll, rebootDevice } from '@/http/api/test'
  export default {
    components: {
    },
    name: 'equipment-orderDetail',
    data() {
      return {
        show:false,
        show1:false,
        showLoading:false,
        option1:[
          { text: '弹出充电宝', value: -1 },
          { text: '锁定输出', value: 0 },
          { text: '开启输出', value: 1 },
        ],
        equipmentNumber:'',
        notes:{},
        eqList:[],
      }
		},
    created() {
      // todo--eq:
      // this.equipmentNumber = 'JSD0000001';
      this.equipmentNumber = this.$route.params.equipmentNumber;
      this.getDetail();
    },
    computed: {
      userInfo () {
        return this.$store.state.user.userInfo
      }
    },
		methods:{
      onClickHide(){
        this.showLoading = false;
      },
      // 获取设备信息
      async getDetail(){
        this.show1 = false;
        const { data } = await scanQR({equipmentNumber:this.equipmentNumber})
        if(data.code === 1){
          this.$nextTick(() => {
            this.notes = data.iotData;
            this.eqList = data.iotData.batteryCheckDataList.map(item => {
              let min = 36;
              let max = 45;
              let number = null;
              if(item.state === 1){
                number = Math.round((item.voltage - min)/(max - min)*10000)/100.00;
              }else{
                number = 0;
              }
              return {
                ...item,
                number,
                type:-1,
              }
            });
          })
          this.show1 = true;
          this.showLoading = false;
        }else{
          this.show1 = true;
          this.showLoading = false;
          this.$router.go(-1)
        }
      },
      // 弹出
      async onPopOne(type,index){
        if(type === -1) return;
        this.showLoading = true;
        const params = {
          type,
          equipmentNumber:this.equipmentNumber,
          param:index,
        }
        const { data } = await popOne(params)
        if(data.code === 1){
          console.log(data)
          this.showLoading = false;
          if(data.iotData.status === 0){
            this.$toast('弹出失败！')
          }else{
            this.$toast('弹出成功！')
            setTimeout(() => {
              this.getDetail();
            },2000);
          }
        }else{
          this.showLoading = false;
        }
      },
      // 一键弹出
      async onPopAll(){
        this.showLoading = true;
        const params = {
          equipmentNumber:this.equipmentNumber
        }
        const { data } = await popAll(params)
        if(data.code === 1){
          setTimeout(() => {
            this.getDetail();
          },2000);
          if(data.data.fail.length){
            let num = data.data.fail.join(',').replace(/,$/gi,"")
            this.$toast(`以下仓位弹出失败:${num}`)
          }
          // else if(data.data.success.length){
          //   let num = data.data.success.join(',').replace(/,$/gi,"")
          //   this.$toast(`成功弹出仓位:${num}`)
          // }
          console.log(data.data)
        }else{
          setTimeout(() => {
            this.getDetail();
          },2000);
        }
      },
      // 刷新
      onRefresh(){
        this.getDetail()
      },
      // 重启设备
      async onRebootDevice(){
        const params = {
          iotDeviceName:this.notes.deviceName
        }
        const { data } = await rebootDevice(params)
        if(data.code === 1){
          console.log(data.data)
        }
      },
		},
  }
</script>

<style scoped lang='stylus'>
.overlay
  width 100vw
  height 100vh
  line-height 100vh
  text-align center
p
  color #000
.container
  color #000
  font-weight 600
.btn1
  width 60px
  text-align center
  // border 1px solid #41bfe8
  // color #41bfe8
  font-weight normal
.btn2
  width 60px
  text-align center
  // border 1px solid #999
  color #fff
  background #999
  font-weight normal

.dlc-btn-primary
  width 140px
.btn-link
  width 250px
.dlc-gray
  max-width 200px
// .header
//   height 300px
//   background-image url('~@/assets/back.png')
//   background-repeat no-repeat
//   background-size contain
.center
  width 140px
  height 140px
  box-shadow:0px 0px 79px 0px rgba(105,173,255,0.51);
  top 110px
.wrapper
  justify-content center
.restart
	position absolute
	bottom 30px
	right 20px
.header
	position relative
	background #CCF2FF
	-webkit-tap-highlight-color #fff
	>img
		position absolute
		right 20px
		bottom 0
/deep/ .van-slider, .van-slider__bar{
	width: 60px;
}
.bgg
  background: #f4f7fc;
/deep/ .van-dropdown-menu{
  background none;
}
.p1
  color: #e86675;
.line
  border-top 1px solid #000
  border-bottom 1px solid #000
  border-left 1px solid #000
  line-height 24px
.row
  padding 0 10px
  border-right 1px solid #000
.row1
  border-right 0px solid #000
.row2
  border-left 1px solid #000
</style>
