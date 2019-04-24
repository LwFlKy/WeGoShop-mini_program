<template>
    <div class="usercenter">
        <div class="uc_header">
            <div v-if="logined" class="unlogined logined">
                <div class="avater">
                        <image :src='userInfo.avatar' class="image"></image>
                </div>
                <div class="text" style=""><div style="height: 5px;">&nbsp;</div>{{userInfo.nickname}}<div><icon class="icon-pay-circle-o1" style="color: gold;" size="15"></icon><span style="font-size: 12px;margin-left:5px;color: gray;">{{point}}</span></div></div>

            </div>
            <div v-else class="unlogined">
                <div class="avater">
                    <div class="image">
                    </div>
                </div>
                <div class="text">您未登录，请点此登录</div>
                <button plain="true" open-type="getUserInfo" @getuserinfo="login" class="login"></button>
            </div>
        </div>
            <div v-for="(item, key, value) in menuData" :key="key" class="item" @click="jump(item.methods,item.url)">
                <icon :class="item.icon_class" :style="'color: '+item.color+';margin-right: 10px;'" size="15"></icon>
                <div class="title" style="flex-grow:1">
                    {{item.name}}
                </div>
                <div style="color:#959595;align-self:flex-end;"><icon class="icon-right" size="15"></icon></div>
            </div>
    </div>
</template>
<style>
    .usercenter icon {
      margin: 6px 0;
      font-family:"anticon" !important;
      font-size:15px;
      font-style:normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    .usercenter .item{
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


.usercenter .uc_header{
    padding: 20px;
    text-align: center;
    background-color: white;
    margin-bottom: 10px;
}

.usercenter .uc_header .unlogined {
    display: flex;
    flex-direction: row;
}

.usercenter .uc_header .unlogined button{
    position: fixed;
    width: 90%;
    height: 70px;
    border-color: white;
}

.usercenter .uc_header .unlogined .text{
    font-weight: bolder;
    display: flex;
    height: 70px;
    flex-direction: column;
    align-items: left;
    justify-content: center;
    margin-left: 20px;
}
.usercenter .uc_header .avater{
    width: 70px;
    height: 70px;
    background-color: white;
    border-radius: 50%;
    box-shadow: 2px 2px 5px gray;
}
.usercenter .uc_header .avater .image{
    margin: 3px;
    width: 64px;
    height: 64px;
    border: 1px solid white; 
    background-color: gray;
    border-radius: 50%;
}
</style>

<script>
    import { detectLogined } from '@/utils/index'
    export default{
        data(){
            return {
                menuData:[
                    {name:"订单",icon_class:"icon-filetext1",methods:"switch",url:"order",color:"#00d3be"},
                    {name:"签到",icon_class:"icon-book",methods:"none",url:"none",color:"#4dc6ee"},
                    {name:"优惠券",icon_class:"icon-tagso",methods:"none",url:"none",color:"#8a90fa"},
                    {name:"积分",icon_class:"icon-pay-circle-o1",methods:"navigate",url:"point",color:"#fed030"},
                    {name:"充值",icon_class:"icon-wallet",methods:"navigate",url:"recharge",color:"#fd9d21"}
                ],
                logined:false,
                userInfo:{},
                point:0
            }
        },
        methods:{
            jump(methods,url) {

                if (detectLogined() == true) {
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
                        console.log(res)
                      wx.setStorageSync("token",res.data.data.token)
                      wx.setStorageSync("userinfo",res.data.data.userInfo)
                      this.userInfo = wx.getStorageSync("userinfo")
                      this.token = wx.getStorageSync("token")
                      this.logined = true
                    }
                  })
                }
              })
            }
        },
        onShow:function(){
            wx.getStorage({
                key:"userinfo",
                success:(res) =>{
                    this.userInfo = res.data
                    wx.request({
                        url:this.$store.state.ApiList.UserPoint,
                        header:{
                            'x-nideshop-token':wx.getStorageSync("token")
                        },
                        success:res =>{
                            this.point = res.data.data[0]
                        }
                    })
                    this.logined = true
                },
                fail:() =>{
                    console.log("aa")
                }})
            this.AuthLoginByWeixin = this.$store.state.ApiList.AuthLoginByWeixin
        }
    }
</script>