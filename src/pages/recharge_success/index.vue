<template>
	<div class="recharge_success">
		<div class="content">
			<div class="item">
				<icon class="icon-checkcircle" style="color: gold;font-family:'anticon'!important;font-style:normal;margin-top: 50px;font-size: 100px;" size="100"></icon>
				<div class="point" style="flex-grow:1;margin-top: 30px;font-weight: bold;font-size: x-large;">
					您已成功充值{{rechargeInfo.point}}分！
				</div>
			</div>
		</div>
	</div>
</template>
<style>
.recharge_success .item{
	display: flex;
	flex-direction: column;
	align-items: center;
}
</style>
<script>
	export default {
		data(){
			return {
				rechargeInfo:{point:0,fee:0}
			}
		},
		methods:{
			pay(rechage_id){
			}
		},
		onShow:function() {
			this.rechargeInfo = JSON.parse(this.$root.$mp.query.data)
		}
	}
</script>