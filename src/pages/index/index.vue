<template>
  <div class="container">
    <div @click="searchBarClick()">
      <search :disabled='true'></search>
    </div>
    <div v-if='ready && shopData'>
      <div class="swiper_box">
        <swiper :indicator-dots="true"
          :autoplay="false" :style="imageStyle">
          <block v-for="(bannerItem, key, index ) in banner" :key="key">
            <swiper-item>
              <image :src="bannerItem.image_url" :style="imageStyle"></image>
            </swiper-item>
          </block>
        </swiper>
      </div>
      <div class="category_box">
        <div class="category_row">
          <div v-for="(seconditem, secondkey, secondindex) in categoryInfo" @click="jumpToCategory(seconditem.id)" class="category_item">
            <div class="image" :style="'background-color:'+seconditem.color+';'" size="16">
              <icon :class="'mticonfont '+seconditem.icon"></icon>
            </div>
            <div class="text">{{seconditem.text}}</div>
          </div>
        </div>
      </div>
      <div class="shop_box">
        <div class="title">- 瞧瞧你附近都有啥 -</div>
        <div class="list">
          <showList v-for="(value, key) in shopData" :shopInfo='value' :type='type' :key="key"></showList>
        </div>
      </div>
      <div v-if="loading_status" style="text-align: center;font-size: small;color:gray;height: 50px;display: flex;flex-direction: column; justify-content: center;">
        加载中...
      </div>
      <div v-else style="text-align: center;font-size: small;color:gray;height: 50px;display: flex;flex-direction: column; justify-content: center;">
        加载完啦！
      </div>
    </div>
      <div v-else style="text-align: center;font-size: small;color:gray;height: 50px;display: flex;flex-direction: column; justify-content: center;">
        加载中...
      </div>
  </div>
</template>

<script>
import card from '@/components/card'
import search from '@/components/search'
import showList from '@/components/list'

export default {
  data () {
    return {
      categoryInfo:[
        {text:"美食",icon:"meishi",color:"#fd9d21",id:{parent_type_id:15,type_id:0}},
        {text:"休闲娱乐",icon:"xiuxianyule",color:"#4dc6ee",id:{parent_type_id:21,type_id:0}},
        {text:"KTV",icon:"ktv",color:"#8a90fa",id:{parent_type_id:21,type_id:24}},
        {text:"丽人",icon:"liren",color:"#ff80c2",id:{parent_type_id:27,type_id:0}},
        {text:"更多分类",icon:"quanbu",color:"#00d3be"},
      ],
      motto: 'Hello World',
      userInfo: {},
      ready:false,
      shopData:false,
      banner:"a",
      imageStyle:"none",
      page:0,
      loading_status:true
    }
  },

  components: {
    card,
    search,
    showList
  },

  methods: {
    jumpToCategory:function(cate_id) {
      wx.navigateTo({
        url:"../search/main?category="+JSON.stringify(cate_id)
      })
    },
    imageLoad(event) {
    },
    bindViewTap () {
      const url = './logs'
      wx.navigateTo({ url })
    },
    getUserInfo (res) {
    },
    searchBarClick () {
      wx.navigateTo({url:"../search/main"})
    },
    getIndexShop:function(callback = ()=>{}) {
      this.page = this.page + 1
      let loc = wx.getStorageSync("loc")
      const option = {
        page:this.page,
        loc:loc
      }
      wx.request({
        url:this.$store.state.ApiList.ShopList,
        data:option,
        success:(res) => {
          let result = res.data.data
          if (result.length == 0) {
            this.loading_status = false
          }
          for (var i = 0; i <= result.length - 1; i++) {
            this.shopData.push(result[i])
          }
          callback()
        }
      })
    },
    initData(callback = ()=>{}){
      this.shopData = []
      wx.request({
        url:this.$store.state.ApiList.IndexUrl,
        success:(res) => {
          this.banner = res.data.data.banner
          this.ready = true
        }
      })
      this.getIndexShop(callback)
    }
  },

  created () {
    wx.getSystemInfo({
      success:(res) => {
        this.imageStyle = "height:"+((res.windowWidth-40)*0.5)+"px;"
      }
    })
    wx.getLocation({
      success:(res) => {
        wx.setStorageSync("loc",{latitude:res.latitude,longitude:res.longitude})
        this.page = 0
        this.initData()
      }
    })
    this.initData()
  },
  onPullDownRefresh(res){
    this.page = 0
    this.initData(function() {
      wx.stopPullDownRefresh()
    })

    
  },
  onReachBottom(res) {
    if (this.loading_status) {
      this.getIndexShop()
    }
  }
}
</script>

<style scoped>
.category_box{
  background-color:white;
  display:inline-block;
  width:100%;
  padding: 10px 0;
}

.category_box .category_row{
  padding:0 20px;
}

.category_box .category_row .category_item{
  width:18%;
  height:70px;
  margin:1%;
  display:inline-block;
}

.category_box .category_row .category_item .image{
  text-align: center;
  width:50px;
  height:50px;
  background-color:gray;
  margin:0 auto;
  border-radius: 50%;
}

.category_box .category_row .category_item .image icon{
  color: white;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size:30px;
}

.category_box .category_row .category_item .text{
  font-size:11.9px;
  width:50px;
  height:20px;
  text-align:center;
  margin:5px auto;
  color: #666;
}

.shop_box{
  padding:10px;
  background-color:white;
  color:gray;
}

.shop_box .title{
  font-size:15px;
  text-align:center;
}

swiper-item image{
  width:100%;
}
.swiper_box{
  width:90%;
  padding:0 5%;
  background-color:white;
}
.swiper_box .notice{
  text-align:center;
  padding-top:50px;
  height:100%;
  width:100%;
  background-color:gray;
}
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

.counter {
  display: inline-block;
  margin: 10px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
