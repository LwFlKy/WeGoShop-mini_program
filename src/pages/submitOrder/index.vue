<template>
	<div class="submitOrder">
		<div class="shop_name space border">{{orderData.shop_name}}</div>
		<div class="item_detail space border"><div class="name">{{orderData.promotion_name}}</div><div class="price">{{orderData.price}}元</div></div>
		<div class="num space border"><div>数量</div>
			<div class="control">
				<div class="minus" v-if="num == 1"><icon class="icon-minus" size="10"></icon></div>
				<div class="minus" v-else @click="minus"><icon class="icon-minus" size="10"></icon></div>
				<div style="padding: 0 5px;flex-grow:1;text-align: center;">{{num}}</div>
				<div class="plus" @click="plus"><icon class="icon-plus" size="10"></icon></div>
			</div>
		</div>
		<div class="total space" style="border-bottom: 5px solid #d5d5d5;">
			<div class="name">小计</div>
			<div class="price" style="color: orange;">￥{{total}}</div>
		</div>
		<div class="quan space">
			<div class="name">优惠券</div>
			<div style="color: #959595;">暂无优惠券<icon class="icon-right" size="10"></icon></div>
		</div>
		<div class="placeholder"></div>
		<div class="pay">
			<div class="price">
				<div class="small">实付金额</div>
				<div class="num">￥{{total}}</div>
			</div>
			<div class="buy" @click="submit">提交订单</div>
		</div>
		<pay v-if="pay" @success="paySuccess" @cancel="payCancel" :orderData="orderInfo" ref="pay"></pay>
	</div>
</template>
<style>
	.submitOrder .placeholder{
		width: 100%;
		height: 51px;
	}
	.submitOrder .pay .buy{
		padding: 0 20px;
		height: 100%;
		display: flex;
		flex-direction: row;
		color: white;
		background: #FF7F00;
		font-size: medium;
		align-items: center;
	}
	.submitOrder .pay .price{
		margin: 0 10px;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.submitOrder .pay .price .num{
		font-size: medium;
		color: #FF7F00;
	}
	.submitOrder .pay .price .small{
		font-size: small;
		color: #959595;
	}
	.submitOrder .pay{
		display: flex;
		flex-direction: row;
		align-items: center;
		background: white;
		width: 100%;
		height: 50px;
		position: fixed;
		bottom: 0px;
		justify-content: space-between;
	}
	.submitOrder icon{
		font-family:"anticon" !important;
		font-size:small;
		font-style:normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		margin: 0 auto;
		font-weight: bold;
	}
	.submitOrder{
		font-size: small;
	}
	.submitOrder .border{
		border-bottom: 1px solid #e6e6e6;
		border-radius: 2px;
	}
	.submitOrder .space{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		background: white;
		padding: 10px;
	}
	.submitOrder .item_detail .price{
		text-align: right;
	}
	
	.submitOrder .num .control{
		width: 100px;
		display: flex;
		flex-direction: row;
		border: 1px solid #d5d5d5;
	}
	.submitOrder .num .control .minus{
		border-right: 1px solid #d5d5d5;
		margin-left: 5px;
		padding-right: 5px;
	}
	.submitOrder .num .control .plus{
		border-left: 1px solid #d5d5d5;
		margin-right: 5px;
		padding-left: 5px;
	}
</style>
<script>
	import pay from '@/components/pay'
	export default{
		data(){
			return {
				orderData:{
				},
				num:1,
				total:0,
				pay:false,
				orderInfo:{}
			}
		},
		components:{
			pay
		},
		methods:{
			paySuccess(orderId){
				wx.redirectTo({
					url:"/pages/order_detail/main?orderId="+orderId
				})
			},
			payCancel(orderId){
				wx.redirectTo({
					url:"/pages/order_detail/main?orderId="+orderId
				})
			},
			plus(){
				this.num = this.num + 1
				this.total = this.orderData.price * this.num
			},
			minus(){
				if (this.num > 1) {
					this.num = this.num - 1
					this.total = this.orderData.price * this.num
				}
			},
			showPay(){
				this.$refs.pay.show()
			},
			submit(){
				this.orderData.order_price = this.orderData.price * this.num
				this.orderData.goods_price = this.orderData.price
				this.orderData.num = this.num

		        wx.request({
		          method:"POST",
		          url:this.$store.state.ApiList.OrderSubmit,
		          data:this.orderData,
		          header:{
		          	'x-nideshop-token':wx.getStorageSync("token")
		          },
		          success:(res) =>{
                      console.log(res)
		          	this.orderInfo = res.data.data.orderInfo
		          	console.log(this.orderInfo)
		          	this.showPay()
		          }
		        })
			}
		},
		onShow(){
		    this.pay = true
			this.orderData = JSON.parse(this.$root.$mp.query.data)
			console.log(this.orderData)
			this.total = this.orderData.price * this.num
		}
	}
</script>