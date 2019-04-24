<template>
	<div class="promotionList">
		<div class="detail" @click="jumpToShop">
			<image :src="picUrl+promotionInfo.img_url" mode="aspectFill"></image>
			<div class="info">
				<div class="name">{{promotionInfo.name}}</div>
				<div class="date">周一到周日</div>
				<div class="price">￥{{promotionInfo.price}}</div>
			</div>
		</div>
	</div>
</template>
<style>
	.promotionList{
		margin: 3px 0;
		padding: 10px;
		background-color: white;
		display: flex;
		flex-direction: column;
	}
	.promotionList .detail{
		display: flex;
		flex-direction: row;
	}
	.promotionList .detail .info{
		display: flex;
		flex-direction: column;
		justify-content:space-around;
	}
	.promotionList .detail .info .name{
		font-size: small;
		font-weight: bolder;
	}
	.promotionList .detail .info .price{
		font-weight: bolder;
		color: orange;
	}
	.promotionList .detail .info .date{
		font-size: xx-small;
		font-weight: bolder;
		color: gray;
	}
	.promotionList .detail image{
		margin-right:10px; 
		width: 80px;
		height: 80px;
	}
</style>
<script>
export default {
  props:['promotionInfo'],
  data () {
    return {
    	picUrl:this.$store.state.picUrl,
    	src:"https://baidu.com",
    	//background_style: "background-image: url("+this.promotionInfo.img_url+ ");"
    }
  },
  components: {
  },

  methods: {
  	jumpToShop:function() {
  		wx.navigateTo({
  			url:"/pages/promotionDetail/main?id="+this.promotionInfo.id
  		})
  	}
  },
  created () {
  	console.log(this.promotionInfo)
  }
}
</script>