<template>
	<div class="ruzhu">	
		<div v-if="!isOwned">
			<div class="panel">
				<div class="title">商家入驻</div>
				<div class="content">想入驻商圈？留下您的信息<br>一切准备就绪时，我们会联系您。</div>
			</div>
			<field title="店铺名称" @handleZanFieldBlur="handleZanFieldBlur" name="shop_name" placeholder="在此输入店铺名称"></field>
			<field title="您的姓名" @handleZanFieldBlur="handleZanFieldBlur" name="owner_name" placeholder="在此输入您的姓名"></field>
		    <button v-if="detectLogined" style="background: #FF7F00;color: white;" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" form-type="submit">提交信息</button>
		    <button v-else style="background: #FF7F00;color: white;" @getuserinfo="login" open-type="getUserInfo">未登录，点此登录</button>
		</div>
		<div v-else>
			<div class="panel">
				<div class="title">您已注册商圈</div>
				<div class="content">
					请扫描二维码，关注服务号。<br>
					<div class="block">如您未完成服务号绑定:<br>关注后会自动完成绑定注册并发放后台账号密码</div>
					<div class="block">如您已完成服务号绑定:<br>可以扫码关注，接收相关信息。</div>
					<div class="block strong">*点击图片，长按保存图片后，退出小程序，打开扫一扫，点击右上角"相册"，从相册导入二维码。</div>
				</div>
			</div>
			<div class="image">
				<image @click="previewImage" mode="aspectFit" src="https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=gQH38DwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAyal83MDhsSmhmOGwxMDAwMDAwN2gAAgTbJVdbAwQAAAAA"></image>
			</div>
		</div>
	</div>
</template>
<style>
	.ruzhu button{
		width: 100%;
		position: absolute;
		bottom: 20px;
		border-radius: 0;
	}
	.ruzhu .panel{
		padding: 10px;
	}

	.ruzhu .panel .title{
		font-weight: bolder;
		font-size: large;
		padding: 20px;
	}
	.ruzhu .panel .block{
		margin-top: 10px;
	}

	.ruzhu .panel .content{
		padding: 0 20px;
		font-size: small;
		padding-bottom: 20px; 
	}
	.ruzhu .panel .strong{
		font-weight: bolder;
	}
	.ruzhu .image image{
		width: 100%;
	}
</style>
<script>
	import field from 'mpvue-zanui/src/components/zan/field'
  	import { detectLogined } from '@/utils/index'
	export default{
		data(){
			return {
				postData:{
					shop_name:"",
					owner_name:"",
					phoneNum:""
				},
				detectLogined:false,
				isOwned:false
			}
		},
		components:{
			field
		},
		methods:{
			getPhoneNumber(e){
				wx.request({
					method:"POST",
		            url:this.$store.state.ApiList.PhoneNumber,
					header:{
						'x-nideshop-token':wx.getStorageSync("token")
					},
					data:{
						iv:e.mp.detail.iv,
						encryptedData:e.mp.detail.encryptedData
					},
					success: (res) => {
						this.postData.phoneNum = "+"+res.data.data.countryCode+"-"+res.data.data.purePhoneNumber
						this.postData.userId = wx.getStorageSync("userinfo").id
						let isEmpty = false;
						for (let key in this.postData) {
							if(this.postData[key] == ""){
								isEmpty = true
								break
							}
						}
						if (isEmpty) {
							wx.showToast({
								title:"有信息未填",
								icon:"none"
							})
						}else{
							wx.request({
								method:"POST",
								url:this.$store.state.ApiList.EnteringApply,
								data:this.postData,
								success:(_res) => {
									this.initData()
									console.log(_res)
								}
							})
						}
					}
				})
			},
			handleZanFieldBlur(e,name){
				this.postData[name] = e.mp.detail.value
			},
			previewImage(){
				wx.previewImage({
				  urls: ["https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=gQH38DwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAyal83MDhsSmhmOGwxMDAwMDAwN2gAAgTbJVdbAwQAAAAA"] // 需要预览的图片http链接列表
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
		    ownShop(){
		          wx.request({
		            url:this.$store.state.ApiList.UserShopOwnState,
			        header:{
			          'x-nideshop-token':wx.getStorageSync("token")
			        },
		            success: (res) => {
		            	console.log(res.data.data)
		              this.isOwned = res.data.data
		            }
		          })
		    },
			initData(){
				if (detectLogined(false)) {
					wx.getStorageSync("token")
					this.detectLogined = true
					this.ownShop()
				}
			}
		},
		onShow(){
			this.initData()
		}
	}
</script>