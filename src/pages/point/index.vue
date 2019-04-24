<template>
    <div class="_point">
        <div class="_header">
            <div style="font-weight: bold;">你拥有</div>
            <div style="font-size:25px;font-weight: bold;"><icon class="icon-pay-circle-o1" style="color: gold;" size="30"></icon>&nbsp;{{point}}&nbsp;分</div>
            <div style="text-decoration:underline;color: orange;" @click="jump('navigate','recharge')">去充值</div>
        </div>
            <div class="item">我的充值记录</div>
            <div class="item">
                <div class="title" style="width: 30%">
                    充值金额
                </div><div class="title" style="width: 30%">
                    充值积分
                </div>
                <div style="color:#959595;align-self:flex-end;">充值时间</div>
            </div>
            <div v-for="(item, key, value) in rechargeRecord" :key="key" class="item">
                <div class="title" style="width: 30%">
                    ￥{{item.attach.fee}}
                </div><div class="title" style="width: 30%">
                    {{item.attach.point}}
                </div>
                <div style="color:#959595;align-self:flex-end;">{{item.time_end}}</div>
            </div>
            <div v-if="loading_status" class="item" style="justify-content: center; background: #f5f5f5;padding: 5px 0;">加载中...</div>
            <div v-else class="item" style="justify-content: center; background: #f5f5f5;padding: 5px 0;">没有更多记录了</div>
    </div>
</template>
<style>
    ._point icon {
      margin: 6px 0;
      font-family:"anticon" !important;
      font-size:30px;
      font-style:normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    ._point .item{
        font-size: small;
        padding: 5px 10px;
        margin-bottom:2px;
        background-color: white;
        display: flex;
        align-items: center;
    }

.icon-order::after{
    font-family: "iconfont";
    content: '\e606';
    font-size:50px;
    }


._point ._header{
    padding: 20px;
    text-align: center;
    background-color: white;
    margin-bottom: 10px;
}

._point ._header .unlogined {
    display: flex;
    flex-direction: row;
}

._point ._header .unlogined button{
    position: fixed;
    width: 90%;
    height: 70px;
    border-color: white;
}

._point ._header .unlogined .text{
    font-weight: bolder;
    display: flex;
    height: 70px;
    flex-direction: column;
    align-items: left;
    justify-content: center;
    margin-left: 20px;
}
._point ._header .avater{
    width: 70px;
    height: 70px;
    background-color: white;
    border-radius: 50%;
    box-shadow: 2px 2px 5px gray;
}
._point ._header .avater .image{
    margin: 3px;
    width: 64px;
    height: 64px;
    border: 1px solid white; 
    background-color: gray;
    border-radius: 50%;
}
</style>

<script>
    export default{
        data(){
            return {
                point:0,
                rechargeRecord:[],
                pageDetail:{},
                loading_status:true
            }
        },
        methods:{
            jump(methods,url) {
                if (methods == "redirect") {
                    wx.redirectTo({
                        url:url
                    })
                }else if (methods == "navigate") {
                    wx.navigateTo({
                        url:url
                    })
                }else if (methods == "switch") {
                    wx.switchTab({
                        url:url
                    })
                }
                
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
                      wx.setStorageSync("token",res.data.data.token)
                      wx.setStorageSync("userinfo",res.data.data.userInfo)
                      this.userInfo = wx.getStorageSync("userinfo")
                      this.token = wx.getStorageSync("token")
                      this.logined = true
                    }
                  })
                }
              })
            },
            getRecord(page = 1){
                wx.request({
                    url:this.$store.state.ApiList.RechargeRecord,
                    data:{page:page},
                    header:{
                        'x-nideshop-token':wx.getStorageSync("token")
                    },
                    success:res =>{
                        console.log(res)
                        for (var i = res.data.data.data.length - 1; i >= 0; i--) {
                            res.data.data.data[i].attach = JSON.parse(res.data.data.data[i].attach)
                        }
                        for (var i = res.data.data.data.length - 1; i >= 0; i--) {
                            this.rechargeRecord.push(res.data.data.data[0])
                        }
                        delete res.data.data.data
                        this.pageDetail = res.data.data
                        if (this.pageDetail.currentPage == this.pageDetail.totalPages) {
                            this.loading_status = false
                        }
                    }
                })
            }
        },
        onShow:function(){
            this.rechargeRecord = []
            this.getRecord()
            wx.request({
                url:this.$store.state.ApiList.UserPoint,
                header:{
                    'x-nideshop-token':wx.getStorageSync("token")
                },
                success:res =>{
                    this.point = res.data.data[0]
                }
            })
        },
        onReachBottom(res) {
          if (this.loading_status) {
            this.getRecord(this.pageDetail.currentPage+1)
          }
        }
    }
</script>