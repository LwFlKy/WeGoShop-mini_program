<template>
	<div class="recharge">
		<div class="recharge_header">请选择你要充值的金额：</div>
		<div class="content">
			<div v-for="(item, key, value) in rechargeInfo" :key="key" @click="pay(item)" class="item">
				<icon class="icon-pay-circle-o1" style="color: gold;margin-right: 10px;" size="15"></icon>
				<div class="point" style="flex-grow:1">
					{{item.point}}
				</div>
				<div class="fee" style="text-align: right;padding-right: 10px;">
					￥{{item.fee}}
				</div>
				<div style="color:#959595;align-self:flex-end;"><icon class="icon-right" size="15"></icon></div>
			</div>
		</div>
	</div>
</template>
<style>
	.recharge .content .item icon {
	  margin: 6px 0;
	  font-family:"anticon" !important;
	  font-size:15px;
	  font-style:normal;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	}
	.recharge .recharge_header{
		background-color: white;
		height: 50px;
		padding: 10px;
		display: flex;
		font-size: x-large;
		font-weight: bold;
		flex-direction: column;
		justify-content: center;
		margin-bottom: 10px;
	}
	.recharge .content .item{
		padding: 5px 10px;
		margin-bottom:2px;
		background-color: white;
		display: flex;
		align-items: center;
	}
</style>
<script>
	export default {
		data(){
			return {
				rechargeInfo:[
					{point:0,fee:0}
				]
			}
		},
		methods:{
			pay(rechargeInfo){
				let rechargeStr = JSON.stringify(rechargeInfo)
				wx.request({
					method:'POST',
					url:this.$store.state.ApiList.PayPrepayId,
					data:{
						id: rechargeInfo.id
					},
					header:{
						'x-nideshop-token':wx.getStorageSync("token")
					},
					success:(res_prepay)=>{
						let prepayInfo = res_prepay.data.data
						console.log("recharge_success?data="+rechargeStr)
						prepayInfo.success = (res) => {
							wx.redirectTo({
								url:"/pages/recharge_success/main?data="+rechargeStr
							})
						}
						wx.requestPayment(prepayInfo)
					}
				})
			}
		},
		onShow:function() {
			wx.request({
				method:"GET",
				url:this.$store.state.ApiList.RechargeList,
				success:(res) =>{
						this.rechargeInfo = res.data.data
				}
			})
		}
	}
</script>