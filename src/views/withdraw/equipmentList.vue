<template>
  <div class="container">
    <template>
      <div class="header flex">
        <van-search
          class="search"
          v-model="equipmentNumber"
          placeholder="请输入设备编号"
          @search="onSearch"
        />
        <div class="pd10-x" @click="scanQRCode">
          <img class="scan wid50 fr" src="@/assets/scan.png" alt="">
        </div>
      </div>
      <div class="pull-box" >
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <div class="box" v-for="(item,index) in list" :key="index" >
              <!-- <div class="flex-between pd4-y">
                <div>充电宝编号</div>
                <div>{{item.batteryNumber}}</div>
              </div> -->
              <div class="flex-between pd4-y">
                <div>设备编号</div>
                <div>{{item.equipmentNumber}}</div>
              </div>
              <div class="flex-between pd4-y">
                <div>设备状态</div>
                <div>{{item.equipmentStatus === 2 ? '离线' : '在线'}}</div>
              </div>
              <div class="flex-between pd4-y">
                <div>设备类型</div>
                <div>{{item.iotProvider === 2 ? '八口设备' : '九口设备'}}</div>
              </div>
              <div class="flex-between pd4-y">
                <div>最近通信时间</div>
                <div>{{item.lastTime?item.lastTime:'-'}}</div>
              </div>
              <!-- <div class="flex-between pd4-y">
                <div>弹出时间</div>
                <div>{{item.startTime}}</div>
              </div>
              <div class="flex-between pd4-y">
                <div>归还时间</div>
                <div>{{item.endTime?item.endTime:'-'}}</div>
              </div> -->
            </div>
          </van-list>
        </van-pull-refresh>
      </div>
    </template>
  </div>
</template>
<script>
  import { listForDevice, updateForBind } from '@/http/api/withdraw'
  import initWxConfig from '@/mixins/getSign';
  export default {
    components: {
    },
    name: 'info-test-report',
    data() {
      return {
        equipmentNumber:'',
        list:[],
        newList:[],
        loading: false,
        finished: false,
        refreshing: false,
        managerId:'',
        pageNum:0,
        pageSize:10,
      }
		},
    mixins: [initWxConfig],
    mounted() {
      // 调用初始化函数地图
      this.$nextTick(() => {
        this.initWxConfig();
      })
    },
    created() {
      // this.getData();
    },
    computed: {
      userInfo () {
        return this.$store.state.user.userInfo
      }
    },
		methods:{
      onSearch(val){
        this.pageNum = 0;
        this.onLoad(1);
      },
      onLoad(type) {
        if(type && type === 1){
          this.pageNum = 0;
          this.newList = [];
          this.list = [];
        }
        console.log("onLoad")
        setTimeout(() => {
          if (this.refreshing) {
            this.list = [];
            this.refreshing = false;
          }
          this.pageNum += 1;
          // for (let i = 0; i < 10; i++) {
          //   this.list.push(this.list.length + 1);
          // }
          this.getData();
          this.loading = false;
          if (this.pageNum !== 1 && this.newList.length < this.pageSize) {
            this.finished = true;
          }
        }, 1000);
      },
      onRefresh() {
        console.log("onRefresh")
        // 清空列表数据
        this.finished = false;
        this.pageNum = 0;

        // 重新加载数据
        // 将 loading 设置为 true，表示处于加载状态
        this.loading = true;
        this.onLoad();
      },
      // 获取设备信息
      async getData(){
        const params = {
          equipmentNumber:this.equipmentNumber,
          offset:this.pageNum,
          limit:this.pageSize,
        }
        const { data } = await listForDevice(params)
        if(data.code === 1){
          console.log(data)
          this.list = this.list.concat(data.data.records);
          this.newList = data.data.records;
          console.log("notes--",data.data.records);
        }
      },
      async scanQRCode(){
        console.log("扫一扫")
        this.$wx.scanQRCode({
          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
          success: async res => {
            var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
            let equipmentNumber = result.split("?")[1].split("=")[1];
            this.bindEquipment(equipmentNumber);
          },
          error:function(error){
            console.log("scanQRCode error----",error);
          }
        });
      },
      async bindEquipment(equipmentNumber){
        const { data } = await updateForBind({equipmentNumber})
        if(data.code === 1){
          this.$toast('操作成功');
          // 刷新页面数据
          this.equipmentNumber = equipmentNumber;
          this.onRefresh()
        }
      }
		},
  }
</script>

<style scoped lang='stylus'>
/deep/ .van-panel__header-value{
  color: #41BFE8;
}
.box{
  margin: 10px 10px 0px;
  padding: 4px 10px;
  background: #fff;
  border-radius: 6px;
}
.header{
  position fixed
  width 100vw
  z-index 999
  background #fff
  padding 4px 0
}
.search{
  width 94%
}
.pull-box{
  padding-top 60px
}
</style>
