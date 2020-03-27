<template>
  <div class="container" v-if="show1">
    <template>
      <van-sticky>
        <div class="header w_100 hei80 pd10-x flex-between">
          <span class="ft22 bold">设备详情</span>
          <img class="wid80" src="@/assets/bg@2x.png" alt="">
        </div>
        <div class="pd10-x bgg">
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
              <div class="rebind" @click="onBindSn">
                <img class="wid40 rebind-img" src="@/assets/scan.png" alt="">
                <p class="p2 mg0 ft15 text-center">重新绑定</p>
              </div>
            </main>
            <div class="mg4-y ft16 lh40 pd10-x flex-between">
              <span>槽口</span>
              <div class="flex">
                <div @click="onPopAll" class="cfff btn-all ft14 pdl30 pdr14 hei24 lh24 radius4 mg10">一键弹起</div>
                <div @click="onRefresh" class="cfff btn-refresh ft14 pdl30 pdr14 hei24 lh24 radius4">刷新</div>
              </div>
            </div>
        </div>
      </van-sticky>
      <div class="pd10-x mgb30" v-if="show1">
        <main>
          <div
            v-for="(item,index) in eqList"
            :key="index"
            class="o-box flex-between bfff radius-8 mgb10 pd10-y">
            <div class="dlc-primary wid40 ta">{{item.index}}</div>
            <div class="wid300 pdl10 line-index">
              <div v-if="item.state === 0" class="hei40">
                <div class="cfff btn2 ft14 pd14-x hei20 lh20 radius20 mg6-x mg10-y fr">空仓</div>
              </div>
              <div v-if="item.state !== 0">
                <div class="cfff btn1 dlc-bg-main ft14 pd14-x hei20 lh20 radius20 mg6-x mg10-y fr" @click="onPop(item)">弹出</div>
              </div>
              <div v-if="item.state !== 0">
                <div class="flex">
                  <div class="wid100 hei20">SN: {{item.batterySn}}</div>
                  <div class="mgl20 hei20">电量: <span :class="{'dlc-danger':item.electric<40}">{{item.electric}}%</span></div>
                </div>
                <!-- <div class="cfff btn1 dlc-bg-main btn4 ft14 pd14-x hei20 lh20 radius20 wid60 mg4" @click="onPopOne(1,item)">开启输出</div> -->
              </div>
              <div v-if="item.state !== 0">
                <div class="flex">
                  <div class="wid100 hei20">电压: {{item.voltage}}V</div>
                  <div class="mgl20 hei20">温度: {{item.temp}}°C</div>
                </div>
                <!-- <div class="cfff btn1 dlc-bg-warning btn3 ft14 pd14-x hei20 lh20 radius20 wid60 mg4" @click="onPopOne(0,item)">锁定输出</div> -->
              </div>
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
    <van-action-sheet v-model="show2" description="请选择是否开启输出" :actions="actions" @select="onSelect" />
  </div>
</template>
<script>
  import { scanQR, popOne, popAll, rebootDevice,bindSn } from '@/http/api/test'
  export default {
    components: {
    },
    name: 'equipment-orderDetail',
    data() {
      return {
        show:false,
        show1:true,
        show2: false,
        showLoading:true,
        equipmentNumber:'',
        notes:{},
        eqList:[],
        currentRow:{},
        actions: [
          { name: '是', type: 1, },
          { name: '否', type: 0, },
        ],
        // notes:{
        //   "checkNum": "E5",  // 校验位
        //   "data": [],
        //   "deviceName": "865192044327749",   //设备iot名称
        //   "hardVersion": 1,   //机柜硬件版本
        //   "messageLength": 131,   // 消息长度
        //   "messageType": 144,  // 消息类型
        //   "requestHead": 169,  // 请求头
        //   "signal": 24,   //  4G信号强度
        //   "softVersion": 2, //机柜软件版本
        //   "temp": 100,  //  机柜内温度
        //   "undefined0": 0,  //
        //   "undefined2": 0  //
        // },
        // eqList:[
        //     {
        //         "batterySn": 0,   // 充电宝SN序列号
        //         "electric": 0,   //  充电宝剩余电量（电量百分比，十进制 0-100）
        //         "electricCurrent": 0,   // 输出电流（暂时不用）
        //         "hardVersion": 0,   // 充电宝硬件版本
        //         "index": 1,   // 充电宝孔位索引
        //         "softVersion": 0,   // 充电宝软件版本
        //         "state": 0,   // 孔位状态    0.空仓  1.正常
        //         "temp": 0,   // 电池温度（-15 ~ 50）
        //         "undefined0": 0,   //
        //         "undefined1": 0,   //
        //         "undefined2": 0,   //
        //         "voltage": 20   // 电池电压（例：38，实际上是实际电压的10倍，取值范围为（30~42），其他值表示电池异常）
        //     },
        //     {
        //         "batterySn": 0,
        //         "electric": 0,
        //         "electricCurrent": 0,
        //         "hardVersion": 0,
        //         "index": 2,
        //         "softVersion": 0,
        //         "state": 1,
        //         "temp": 0,
        //         "undefined0": 0,
        //         "undefined1": 0,
        //         "undefined2": 0,
        //         "voltage": 20
        //     },
        // ],
      }
		},
    created() {
      // todo--eq:
      // this.equipmentNumber = 'JSD0000002';
      this.equipmentNumber = this.$route.params.equipmentNumber;
      this.getDetail();
    },
    computed: {
      userInfo () {
        return this.$store.state.user.userInfo
      }
    },
		methods:{
      onPop(row){
        this.show2 = true;
        this.currentRow = row;
      },
      onSelect(item) {
        this.show2 = false;
        this.onPopOne(item.type)
      },
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
            this.eqList = data.iotData.batteryCheckDataList;
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
      async onPopOne(type){
        this.showLoading = true;
        const params = {
          type,
          equipmentNumber:this.equipmentNumber,
          param:this.currentRow.index,
        }
        const { data } = await popOne(params)
        if(data.code === 1){
          this.showLoading = false;
          if(data.iotData.status === 0){
            this.$toast('弹出失败！')
          }else{
            this.$toast('弹出成功！')
            this.$nextTick(()=>{
              let ind = this.currentRow.index-1
              this.$set(this.eqList[ind],'state',0);
            })
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
          this.showLoading = false;
          if(data.data.fail){
            // let num = data.data.fail.join(',').replace(/,$/gi,"")
            this.$toast(`以下仓位弹出失败:${data.data.fail}`)
          }
          if(data.data.success){
            let arr = data.data.success.split(',');
            // let num = data.data.success.join(',').replace(/,$/gi,"")
            // this.$toast(`成功弹出仓位:${num}`)
            arr.map((item)=>{
              let ind = item - 1
              this.$set(this.eqList[ind],'state',0);
            });
          }
        }else{
          this.showLoading = false;
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
      // 重新绑定
      async onBindSn(){
        this.$wx.scanQRCode({
          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
          success: async res => {
            var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
            let equipmentNumber = result.split("?")[1].split("=")[1];
            const { data } = await bindSn({
              deviceName:this.notes.deviceName,
              deviceSn:equipmentNumber,
            })
            if(data.code === 1){
              this.$toast('重新绑定成功！')
              this.equipmentNumber = equipmentNumber;
              console.log(data.data)
            }
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
.line-index
  border-left 2px solid #99d2e4
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
  font-weight normal
.btn2
  width 60px
  text-align center
  color #fff
  background #999
  font-weight normal
.btn-all
  text-align center
  color #fff
  background #41BFE8 url('~@/assets/btn12.png') no-repeat 6px
  background-size 20px
  font-weight normal
.btn-refresh
  text-align center
  color #fff
  background #41BFE8 url('~@/assets/btn11.png') no-repeat 6px
  background-size 16px
  font-weight normal
.dlc-btn-primary
  width 140px
.btn-link
  width 250px
.dlc-gray
  max-width 200px
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
	right 80px
.rebind
	position absolute
	bottom 30px
	right 10px
.rebind-img
  position relative
  left 10px
.p2
  color #1597db
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
