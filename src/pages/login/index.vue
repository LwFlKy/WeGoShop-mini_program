<template>
  <div class="login">
    <div class="notice">
      <p>检测到您未登录</p>
    </div>
    <div class="button-panel">
      <button type="primary" open-type="getUserInfo" @getuserinfo="login">一键登录</button>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {}
    }
  },

  methods: {
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
              this.userInfo = wx.getStorageSync("userinfo")
              wx.navigateBack()
            }
          })
        }
      })
    }
  },

  created () {

  }
}
</script>
<style>
.login .notice{
  padding:30px 10px;
  background-color:white;
  text-align:center;
  margin-bottom:20px;

}
.login .notice p{
  font-size:20px;
}
.login .button-panel{
  width:100%;
  position:absolute;
  bottom:20px;
}
.login button{
  margin: 0 20px;
}
.login .notice{
  margin:20px
}
</style>
