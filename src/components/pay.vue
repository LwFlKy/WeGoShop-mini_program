<template>
	<div class="_pay" :class="'_pay_'+status">
		<div class="cover"></div>
		<div v-if="!loading" class="_pay_content">
			<div class="_pay_title">
				<div style="width: 10%"><icon @click="status='disabled'" class="icon-close" size="15"></icon></div>
				<div class="text">积分支付</div>
				<div style="width: 10%" class="_placeholder"></div>
			</div>
			<div class="_pay_name _pay_space">{{orderData.pay_name}}</div>
			<div class="cost _pay_space">{{orderData.actual_price * 100}}分</div>
			<div class="_pay_point _pay_space">
				<div style="width: 10%"><icon class="icon-_pay-circle-o1" style="color: gold;" size="15"></icon></div>
				<div class="text">剩余积分: {{point}}</div>
				<div style="width: 10%; text-align: right;color:#959595;"><icon class="icon-right" size="15"></icon></div>
			</div>
			<div v-if="enough" @click="pay" class="_pay_button _pay_space">确认支付</div>
			<div v-else @click="recharge" class="_pay_button _pay_space">积分不足，请前往充值</div>
		</div>
	</div>
</template>
<style>
	._pay ._pay_content ._pay_button {
		border-radius: 5px;
		padding: 10px;
		text-align: center;
		color: white;
		background: orange;
		margin-top: 10px;
		margin-right: 10px;
	}
	._pay ._pay_content ._pay_space {
		margin-right: 20px;
		margin-left: 20px;
	}
	._pay ._pay_content ._pay_point {
		display: flex;
		flex-direction: row;
		align-content: center;
		align-items:center;
		border-bottom: 1px solid #d5d5d5;
		padding-top: 5px;
		padding-bottom: 5px;
	}
	._pay ._pay_content ._pay_point .text {
		flex-grow: 1;
		color:#959595;
		padding: 0 5px;
		font-size: small;
	}
	._pay ._pay_content ._pay_name {
		margin-top: 10px;
		font-size: small;
		text-align: center;
	}
	._pay ._pay_content .cost {
		margin-top: 5px;
		font-size: x-large;
		font-weight: bolder;
		text-align: center;
		padding-bottom: 10px;
		border-bottom: 1px solid #d5d5d5;
	}
	._pay_disabled{
		display: none;
	}
	._pay .cover{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(0,0,0,0.5);
	}
	._pay ._pay_title {
		display: flex;
		flex-direction: row;
		align-content: center;
		border-bottom: 1px solid #d5d5d5;
		padding: 10px 10px;
	}
	._pay ._pay_loading{
		border-radius: 5px;
		box-shadow: 0px 0px 5px #888888 inset;
		width: 250px;
		height: 225px;
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: white;
		margin: auto;
	}
	._pay ._pay_content{
		border-radius: 5px;
		box-shadow: 0px 0px 5px #888888 inset;
		width: 250px;
		height: 225px;
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: white;
		margin: auto;
	}
	._pay ._pay_content ._pay_title .text{
		flex-grow: 1;
		text-align: center;
		font-weight: bold;
	}
</style>
<script>
	export default{
		props:["orderData"],
		data(){
			return {
				status:"disabled",
				loading:false,
				point:0,
				enough:false
			}
		},
		watch:{
			loading:function(loading) {
				if(!loading){
					wx.hideLoading()
				}
			},
			status:function(status) {
				if (status == "disabled") {
					console.log(this.__file)
					this.$emit("cancel",this.orderData.id)
					wx.hideLoading()
				}
			}
		},
		methods:{
			recharge:function() {
				this.status = "disabled"
				wx.redirectTo({
					url:"/pages/recharge/main"
				})
			},
			show:function() {
				this.loading = true;
				wx.showLoading({
					title:"加载中"})
				this.status = ""
				this.initData()
			},
			makePhonecall(){
			},
			pay(){
				this.loading = true;
				wx.showLoading({
					title:"支付中"})
				wx.request({
					url:this.$store.state.ApiList.OrderPay,
					header:{
						'x-nideshop-token':wx.getStorageSync("token")
					},
					data:{
						orderId:this.orderData.id
					},
					success:res =>{
						console.log(res)
						wx.showLoading
						this.loading = false;
						if (res.data.errno !== 1000) {
							this.$emit("success",this.orderData.id)
							wx.hideLoading()
							wx.showToast({
								title:"支付成功"
							})
						}else{
							wx.hideLoading()
							wx.showToast({
								title:"支付失败！"
							})
						}
					}
				})
			},
			initData:function() {
				wx.request({
					url:this.$store.state.ApiList.UserPoint,
					header:{
						'x-nideshop-token':wx.getStorageSync("token")
					},
					success:res =>{
						this.point = res.data.data[0]
						if (this.point >= this.orderData.actual_price*100){
							this.enough = true
						}else{
							this.enough = false
						}
						this.loading = false;
					}
				})
			}
		},
		mounted:function() {
		}
	}
</script>