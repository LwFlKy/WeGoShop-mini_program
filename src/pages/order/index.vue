<template>
  <div class="order">
    <div v-if="detectLogined" class="order_list">
      <div v-if="pageDetail.count == 0" style="text-align: center;font-size: small;">
        -暂无订单，快去下单吧-
      </div>
      <div v-else>
        <div v-for="(item,key,index) in list" :key="key" @click="jumpToDetail(item.id)" class="order_item">
          <image :src="picUrl + item.list_pic_url" class="order_image">
            
          </image>
          <div class="order_detail">
            <div class="order_name">{{item.pay_name}}</div>
            <div class="order_price">总价: ￥{{item.actual_price}}</div>
            <div class="order_sum">数量: {{item.num}}</div>
          </div>
          <div class="order_status">
            {{item.order_status_text}}
          </div>
        </div>

            <div v-if="loading_status" class="item" style="justify-content: center; padding: 5px 0;font-size: small;padding: 5px 10px;margin-bottom:2px;display: flex;align-items: center;">加载中...</div>
            <div v-else class="item" style="justify-content: center; padding: 5px 0;font-size: small;padding: 5px 10px;margin-bottom:2px;display: flex;align-items: center;">加载完啦！</div>
      </div>
      <div>
        
      </div>
    </div>
    <div v-else class="login">
      <button @getuserinfo="login" open-type="getUserInfo">未登录，点此登录</button>
    </div>
  </div>
  </div>
</template>

<style>
.order{
  margin: 20px 20px 0 20px;
}
.order_image{
  width: 20%;
  margin: 7px;
}
.order_name{
  padding: 0;
}
.order_detail{
  padding: 0 10px;
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.order_price,.order_sum{
  color:#8b8b8b;
  font-size: 13px;
}
.order_status{
  padding-top: 3px;
  font-size: 13px;
  text-align: right;
  width: 20%;
}

.order_item{
  background-color: white;
  padding: 10px;
  display: flex;
  flex-direction: row;
  border-bottom: 5px solid gray;
  margin-bottom: 10px;
  border-radius: 5px;
}

.order_image{
  width: 50px;
  height: 50px;
  background-color: gray;
}

.order_name{
  font-size: 15px;
}
</style>

<script>
  import { detectLogined } from '@/utils/index'
export default {
  data(){
    return {
      list:[],
      pageDetail:{},
      picUrl:null,
      detectLogined:false,
      loading_status:true
    }
  },
  computed: {
  },
  methods: {
    jumpToDetail(orderId){
      wx.navigateTo({
        url:"/pages/order_detail/main?orderId="+orderId
      })
    },
    login(UserInfo){
      wx.login({
        success: (loginInfo) => {
          wx.request({
            url:this.$store.state.ApiList.AuthLoginByWeixin,
            method:"POST",
            data:{
              code : loginInfo.code,
              userInfo : UserInfo.mp.detail
            },
            success: (res) => {
              console.log(res)
              wx.setStorageSync("token",res.data.data.token)
              wx.setStorageSync("userinfo",res.data.data.userInfo)
              this.userInfo = wx.getStorageSync("userinfo")
              this.userInfo = wx.getStorageSync("userinfo")
              this.initData()
            }
          })
        }
      })
    },
    initData(page = 1) {
      this.picUrl = this.$store.state.picUrl
      if (detectLogined(false) == true) {
        this.detectLogined = true
        wx.request({
          url:this.$store.state.ApiList.OrderList,
          data:{page:page},
          header:{
            'x-nideshop-token':wx.getStorageSync("token")
          },
          success:(res) => {
            for (var i = res.data.data.data.length - 1; i >= 0; i--) {
              this.list.push(res.data.data.data[i])
            }
            delete res.data.data.data
            this.pageDetail = res.data.data
            console.log(this.pageDetail)
            if (this.pageDetail.currentPage == this.pageDetail.totalPages) {
                this.loading_status = false
            }
          }
        })
      }
    }
  },
  onShow:function() {
    this.initData()
  },
  onReachBottom(res) {
    if (this.loading_status) {
      this.initData(this.pageDetail.currentPage+1)
    }
  }
}
</script>

