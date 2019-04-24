<template>
	<div class="order-detail">
		<div v-if="display">
			<div class="order_promotion space content border">
				<div class="info">
					<image :src="picUrl + shopInfo.logo_url" class="image"></image>
					<div class="promotion_info">
						<div class="promotion_name">
							{{orderPromotion.name}}
						</div>
						<div class="order_price">
							￥{{orderPromotion.price}}
						</div>
					</div>
				</div>
				<div v-if="handleOption.pay" @click="showPay" class="pay">
					付款
				</div>
				<div v-if="handleOption.return" @click="returnFee" class="pay">
					退款
				</div>
			</div>
			<div v-if="handleOption.consume" class="order_voucher space border">
				<div class="title">消费券</div>
				<div class="content">
					<div v-for="(value, key) in voucherInfo" :key="key" class="item">
						<div class="code">{{value.code}}</div>
						<div v-if="value.status == 0" class="status">待消费</div>
						<div v-else class="status">已消费</div>
						<div v-if="value.status == 0" @click="displayVoucherQR(value.code)" class="displayQR">显示二维码</div>
						<div v-else @click="displayVoucherQR(value.code)" class="displayQR"></div>
					</div>
				</div>
				<div class="item" style="justify-content: center;">有效期至：{{orderPromotion.end_date}}</div>
			</div>
			<div class="order_shopinfo space border">
				<div class="title">商家信息</div>
				<div class="content">
			        <div class="shop_info space">
			          <div class="info">
			            <div class="name">{{shopInfo.name}}</div>
			          </div>
			          <div class="phone" @click="makePhonecall"><icon class="icon-phone" size="20"></icon></div>
			        </div>
			    </div>
			</div>
			<div class="order_content space border">
				<div class="title space">套餐</div>
				<div class="content space">
					<div class="item" v-for="(value, key) in orderInfo.content" :promotionInfo='value' :type='type' :key="key">
						<div class="name">{{value.name}}</div>
						<div class="sum">{{value.sum}}/{{value.unit}}</div>
						<div class="price">￥{{value.price}}</div>
					</div>
				</div>
			</div>
			<div class="order_info space border">
				<div class="title space">订单信息</div>
				<div class="content space">
					<div class="item">
						<div class="name">订单号</div>
						<div class="text">{{orderInfo.order_sn}}</div>
					</div>
					<div class="item">
						<div class="name">下单时间</div>
						<div class="text">{{orderInfo.add_time}}</div>
					</div>
					<div class="item">
						<div class="name">数量</div>
						<div class="text">{{orderInfo.num}}</div>
					</div>
					<div class="item">
						<div class="name">总价</div>
						<div class="text">{{orderInfo.actual_price}}元</div>
					</div>
				</div>
			</div>
		</div>
	<pay v-if="pay" @success="paySuccess" :orderData="orderInfo" page="detail" ref="pay"></pay>
	</div>

</template>
<style>
	.order-detail .order_info .item{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items:center;
		padding: 0 50px;
		font-size: small;
		color: gray;
	}
	.order-detail .order_info .item .name{

	}
	.order-detail .order_info .item .text{
		flex-grow:0;
		text-align: right;
	}
	.order-detail .border{
		margin-bottom: 5px;
	}
	.order-detail .space{
		background: white;
	}
	.order-detail .title{
		padding-top: 10px;
		text-align: center;
		font-weight: bold;
	}
	.order-detail .content{
		padding: 10px;
	}
	.order-detail .order_voucher image{
		width: 150px;
		height: 150px;
	}
	.order-detail .order_voucher{
		display: flex;
		flex-direction: column;
	}
	.order-detail .order_voucher .item{
		display: flex;
		flex-direction: row;
		color: gray;
		font-size: small;
		align-content: space-between;
		padding: 5px 0;
	}

	.order-detail .order_voucher .item .code{
		width: 60%;
	}
	.order-detail .order_voucher .item .status{
		width: 15%;
	}
	.order-detail .order_voucher .item .displayQR{
		color: #63b8e7;
		text-align: right;
		width: 25%;
	}
	.order-detail .order_voucher .item .displayQR:hover{
		color: gray;
	}
	.order-detail .promotion_info{
		display: flex;
		flex-direction: column;
		padding-left: 10px;
	}
	.order-detail .order_promotion .info{
		display: flex;
		flex-direction: row;
	}
	.order-detail .order_promotion .pay{
		margin-top: 10px;
		background: orange;
		color: white;
		border-radius: 5px;
		text-align: center;
		padding:10px;
	}
	.order-detail .order_promotion .pay:hover{
		background: gray;
	}
	.order-detail .order_price{
		color: orange;
	}
	.order-detail .image{
		width: 70px;
		height: 50px;
		background: gray;
	}
	.order-detail icon{
		font-family:"anticon" !important;
		font-size:20px;
		font-style:normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		margin: auto 0;
	}
	.order-detail .shop_info{
		font-size: 15px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
	.order-detail .shop_info .phone{
		width: 10%;
		color: #49cea8;
		text-align: center;
	}
	.order-detail .order_content .item{
		font-size: small;
		flex-direction: row;
		display: flex;
		border-bottom: 1px solid #d5d5d5;
		padding: 10px 0;
	}
	.order-detail .order_content .item .name{
		width: 60%;
	}
	.order-detail .order_content .item .sum{
		text-align: center;
		width: 30%;
	}
	.order-detail .order_content .item .price{
		text-align: right;
		width: 10%;
	}
</style>
<script>
	import pay from '@/components/pay'
	import QR from '@/utils/qrcode.js';
	export default{
		components:{
			QR,
			pay
		},
		data(){
			return {
				pay:false,
				handleOption:{
					buy:false,
					cancel:false,
					comment:false,
					confirm:false,
					delete:false,
					delivery:false,
					pay:false,
					return:false
				},
				shopInfo:{},
				orderPromotion:{},
				orderInfo:{},
				voucherInfo:{},
				display:false,
				picUrl:"",
				qrcode:""
			}
		},
		methods:{
			returnFee(){
				wx.showModal({
					title:"是否退款",
					content:"仅能退未消费的券，是否退款？",
					success:(res)=>{
						if (res.confirm) {
							wx.request({
								url:this.$store.state.ApiList.OrderReturn,
								data:{orderId:this.orderId},
								header:{
									'x-nideshop-token':wx.getStorageSync("token")
								},
								success:(res)=>{
									wx.showModal({
										title:"退款成功",
										content:"已退还积分"+res.data.data+"分",
										showCancel:false,
										success:(res)=>{
											this.initData()
										}
									})
								}
							})
						}
					}
				})
			},
			paySuccess(){
				this.pay = false
				this.initData()
			},
			displayVoucherQR:function(code) {
				wx.showLoading({
					title:"加载中"
				})
				wx.previewImage({
				  urls: [QR.createQrCodeImg(code)],
				  success:function() {
				  	wx.hideLoading()
				  } // 需要预览的图片http链接列表
				})
			},
			makePhonecall(){
				wx.makePhoneCall({phoneNumber:this.shopInfo.contact})
			},
			showPay(){
				this.$refs.pay.show()
			},
			initData:function() {
				wx.request({
					url:this.$store.state.ApiList.OrderDetail,
					data:{orderId:this.orderId},
					header:{
						'x-nideshop-token':wx.getStorageSync("token")
					},
					success:(res) => {
						console.log(res)
						this.handleOption = res.data.data.handleOption
						this.orderInfo = res.data.data.orderInfo
						this.orderPromotion = res.data.data.orderPromotion
						this.orderInfo.content = JSON.parse(this.orderInfo.content)
						this.shopInfo = res.data.data.shopInfo
						this.voucherInfo = res.data.data.voucherInfo
						this.display = true
					}
				})
			}
		},
		onShow:function() {
			this.pay=true
      		this.picUrl = this.$store.state.picUrl
			this.orderId = this.$root.$mp.query.orderId
			this.initData()
		}
	}
</script>