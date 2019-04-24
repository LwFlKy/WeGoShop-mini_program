<template>
	<div class="showList">
		<div class="detail" @click="jumpToShop">
			<image :src="picUrl+shopInfo.logo_url" mode="aspectFill"></image>
			<div class="info">{{shopInfo.name}}</div>
			<div class="etc"><div>{{distance}}km</div></div>
		</div>
	</div>
</template>
<style>
	.showList{
		margin: 3px 0;
		padding: 10px;
		background-color: white;
		display: flex;
		flex-direction: column;
	}
	.showList .detail{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.showList .detail .info{
		width: 60%;
		text-align: left;
		color: black;
		font-weight: bolder;
		font-size: medium;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;

	}
	.showList .detail .etc{
		font-size: small;
		text-align: right;
	}
	.detail image{
		border-radius: 5px;
		margin-right:10px; 
		width: 80px;
		height: 80px;
	}
</style>
<script>
export default {
  props:['shopInfo'],
  data () {
    return {
    	picUrl:this.$store.state.picUrl,
    	src:"https://baidu.com",
    	background_style: "background-image: url("+this.shopInfo.logo_url+ ");",
    	distance:0
    }
  },
  components: {
  },

  methods: {
	  distanceCount:function(la1, lo1, la2, lo2) {
	    var La1 = la1 * Math.PI / 180.0;
	    var La2 = la2 * Math.PI / 180.0;
	    var La3 = La1 - La2;
	    var Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;
	    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));
	    s = s * 6378.137;//地球半径
	    s = Math.round(s * 10) / 10;
	    return s
	  },
  	jumpToShop:function() {
  		wx.navigateTo({
  			url:"../shopDetail/main?id="+this.shopInfo._id
  		})
  	}
  },
  mounted () {
  	console.log(this.shopInfo)
    const coordinates = wx.getStorageSync("loc")
    this.distance = this.distanceCount(this.shopInfo.coordinates.latitude,this.shopInfo.coordinates.longitude,coordinates.latitude,coordinates.longitude)
  }
}
</script>