<template>
  <div class="container">
    <template>
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div class="box" v-for="(item,index) in list" :key="index" >
            <div class="flex-between pd4-y">
              <div>充电宝编号</div>
              <div>{{item.batteryNumber}}</div>
            </div>
            <div class="flex-between pd4-y">
              <div>设备编号</div>
              <div>{{item.equipmentNumber}}</div>
            </div>
            <div class="flex-between pd4-y">
              <div>弹出时间</div>
              <div>{{item.startTime}}</div>
            </div>
            <div class="flex-between pd4-y">
              <div>归还时间</div>
              <div>{{item.endTime?item.endTime:'-'}}</div>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </template>
  </div>
</template>
<script>
  import { testList } from '@/http/api/test'
  export default {
    components: {
    },
    name: 'info-test-report',
    data() {
      return {
        list:[],
        newList:[],
        loading: false,
        finished: false,
        refreshing: false,
        pageNum:0,
        pageSize:10,
      }
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
      onLoad() {
        console.log("onLoad")
        setTimeout(() => {
          if (this.refreshing) {
            this.list = [];
            this.refreshing = false;
          }
          this.pageNum += 1;
        //   for (let i = 0; i < 10; i++) {
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
          managerId:this.userInfo.managerId,
          offset:this.pageNum,
          limit:this.pageSize,
        }
        const { data } = await testList(params)
        if(data.code === 1){
          this.list = this.list.concat(data.data.records);
          this.newList = data.data.records;
          console.log("notes--",data.data.records);
        }
      },
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
</style>
