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
              <div @click="onPopOne" class="btn-pop btn1 cfff ft14 pdl30 pdr14 hei24 lh24 radius4">模拟弹出</div>
              <p class="mg0 whattxt" @click="showWhat = true">
                <span class="dlc-primary ft12 txt2">
                  什么是模拟弹出
                </span>
                <img  style="display:inline-block;vertical-align:middle" class="wid20 mgl80 mgb2" src="@/assets/question.png" alt="">
              </p>
            </main>
            <div class="mg4-y ft16 lh40 pd10-x flex-between">
              <span>槽口</span>
            </div>
        </div>
      </van-sticky>
      <div class="pd10-x mgb30" v-if="show1">
        <main>
          <div
            class="o-box fl mgb10"
            v-for="(item,index) in eqList"
            :key="index">
            <div class="bfff radius-8 pdb10">
              <div class="dlc-primary lh30 ft16 ta line-index mgb5">{{item.index}}</div>
              <div class="pdl20 lh25">SN: {{item.batterySn}}</div>
              <div class="pdl20 lh25">电量: <span :class="{'dlc-danger':item.electric<40}">{{item.electric}}%</span></div>
              <div class="pdl20 lh25">电压: {{item.voltage}}V</div>
              <div class="pdl20 lh25">温度: {{item.temp}}°C</div>
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
    <!-- 什么是模拟弹宝？ -->
    <van-popup v-model="showWhat" :style="{width:'80%',padding:'20px'}">
      <div class="ta ft16 pdb10">模拟弹宝</div>
      <div class="ft14 lh25 pd10-x">云端软件，根据扫一扫后获得的实时充电宝信息，对获取到的充电宝电量进行校验，从大到小排序且只操作电压大于3.7V的充电宝（充电宝电压3V~4.2V），电压相同的充电宝，就按槽口进行从小到大排序。随后对设备下发弹宝指令，每一个槽口最多执行两次指令，直至操作失败为止，若第一个最大电压的两次依然弹出失败，则进行电压第二大的槽口进行弹宝，以此类推。</div>
    </van-popup>
    <!-- 弹出成功后展示框 -->
    <van-popup v-model="showNotes" :style="{width:'80%',padding:'20px'}" :close-on-click-overlay=false>
      <div class="ta ft16 pdb20">弹出成功</div>
      <div class="ft18 ta pdb30">请在{{infos.index}}号槽口取走充电宝</div>
      <div @click="$router.go(-1)" class="cfff btn-back ft14 pdl0 hei40 lh40 radius4">返回首页</div>
    </van-popup>
    <!-- 弹出失败后展示框 -->
    <van-popup v-model="showNotes1" :style="{width:'80%',padding:'20px'}" :close-on-click-overlay=false>
      <div class="ta ft16 pdb20">弹出失败</div>
      <div class="ft18 ta pdb30">{{errorNotes}}</div>
      <div @click="$router.go(-1)" class="cfff btn-back ft14 pdl0 hei40 lh40 radius4">返回首页</div>
    </van-popup>
    <van-overlay :show="showLoading"></van-overlay>
  </div>
</template>
<script>
  import { simulateUseScanQR, simulateUserHandle } from '@/http/api/test'
  export default {
    components: {
    },
    name: 'equipment-orderDetail-test',
    data() {
      return {
        show:false,
        show1:false,
        showLoading:true,
        showNotes:false,
        showNotes1:false,
        showWhat: false,
        equipmentNumber:'',
        errorNotes:'',
        notes:{},
        infos:{},
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
        const params = {
          managerId:this.userInfo.managerId,
          equipmentNumber:this.equipmentNumber,
        }
        const { data } = await simulateUseScanQR(params)
        if(data.code === 1){
          this.$nextTick(() => {
            this.notes = data.iotData;
            // this.eqList = data.iotData.batteryCheckDataList;
            this.eqList = data.iotData.batteryCheckDataList.filter(item =>item.state !== 0);

            this.show1 = true;
          })
          this.showLoading = false;
        }else{
          this.show1 = true;
          this.showLoading = false;
          this.$dialog.alert({
            title: '提示',
            message: data.msg
          }).then(() => {
            this.$router.go(-1)
          });
        }
      },
      // 弹出
      async onPopOne(type,item){
        if(type === -1) return;
        this.showLoading = true;
        const params = {
          managerId:this.userInfo.managerId,
          equipmentNumber:this.equipmentNumber,
        }
        const { data } = await simulateUserHandle(params)
        if(data.code === 1){
          this.showLoading = false;
          this.infos = data.iotData;
          this.showNotes = true;
        }else{
          this.showLoading = false;
          this.errorNotes = data.msg;
          this.showNotes1 = true;
        }
      },
		},
  }
</script>

<style scoped lang='stylus'>
.txt2
  border-bottom: 1px solid #41bfe8;
  padding-bottom: 1px;
  font-weight normal
.o-box
  width 48.5%
  margin-right 3%
for row in 2 4 6 8
  .o-box:nth-child({row})
    margin-right 0
.line-index
  border-bottom 2px solid #99d2e4
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
.btn-pop
	position absolute
	bottom 50px
	right 20px
.whattxt
	position absolute
	bottom 20px
	right 20px
.btn1
  text-align center
  color #fff
  background #41BFE8 url('~@/assets/btn13.png') no-repeat 6px
  background-size 16px
  font-weight normal
.btn-back
  text-align center
  color #fff
  background #41BFE8
  font-weight normal
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
