<template>
    <div class="ShopDetail">
      <div class="gallery" :style="background_style" @click="preivew">
        <div class="pic_count">
        <icon class="icon-picture"></icon>
      {{gallery.length}}张</div>
      </div>
      <div class="shop_info">
        <div class="shop_name space">{{shopData.name}}
          <div class="rank">
            <icon class="icon-star orange" size="15"></icon>
            <icon class="icon-star orange" size="15"></icon>
            <icon class="icon-star orange" size="15"></icon>
            <icon class="icon-star orange" size="15"></icon>
            <icon class="icon-star gray" size="15"></icon>
            <span>4分</span>
          </div>
        </div>
        <div class="contact space">
          <div class="address">{{shopData.address}}</div>
          <div class="phone" @click="makePhonecall"><icon class="icon-phone" size="20"></icon></div>
        </div>
      </div>
      <div>
        <promotionList v-for="(value, key) in promotionData" :promotionInfo='value' :type='type' :key="key">
        </promotionList>
      </div>
    </div>
  </template>
  <style>
  .ShopDetail .space{
    padding: 10px;
  }
  .ShopDetail .orange{
    font-size: 15px;
    color: orange;
  }
  .ShopDetail .gray{
    font-size: 15px;
    color: gray;
  }

  .ShopDetail .rank{
    font-size: 15px;
  }

  .ShopDetail .rank span{
    margin: 0 10px;
    color: orange;
  }

  .ShopDetail .shop_info{
    background: white;
    display: flex;
    flex-direction: column;
  }
  .ShopDetail .shop_info .shop_name{
    font-size: large;
    font-weight: bolder;
    border-bottom: 1px solid #d5d5d5;
  }
  .ShopDetail .shop_info .contact{
    font-size: 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .ShopDetail .shop_info .phone{
    width: 10%;
    color: #49cea8;
    text-align: center;
  }
  .ShopDetail .pic_count icon {
    font-family:"anticon" !important;
    font-size:20px;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
  }
  .ShopDetail icon{
    font-family:"anticon" !important;
    font-size:20px;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: auto 0;
  }
  .ShopDetail .pic_count {
    border-radius: 50%;
    width: 60px;
    height: 60px;
    right: 20px;
    bottom: 20px;
    background-color: rgba(128,128,128,0.7);
    position: absolute;
    display: flex;
    flex-direction: column;
    font-size:15px;
    text-align: center;
    color: white;
  }
    .ShopDetail .gallery{
      position:relative;
      width: 100%;
      height: 200px;
      background-size:100% auto;
       background-repeat:no-repeat;
       background-position:center center;
    }
  </style>
  <script>
  import promotionList from '@/components/promotionList'
  
  export default {
    data () {
      return {
        promotionData:[],
        gallery:[],
        motto: 'Hello World',
        userInfo: {},
        ready:false,
        shopData:false,
        banner:"a",
        imageStyle:"none",
        background_style: ""
      }
    },
  
    components: {
      promotionList
    },
  
    methods: {
      makePhonecall(){
        wx.makePhoneCall({phoneNumber:this.shopData.contact})
      },
      preivew(){
        let urls = []
        console.log(urls)
        wx.previewImage({
          current: '', // 当前显示图片的http链接
          urls: this.gallery // 需要预览的图片http链接列表
        })
      },
      initData(){
        wx.request({
          url:this.$store.state.ApiList.ShopDetail,
          data:{
              id:this.$root.$mp.query.id
          },
          success:(res) => {
            this.shopData = res.data.data.shop
            if (this.shopData.logo_url !== "") {
              this.gallery.push(this.$store.state.picUrl+ this.shopData.logo_url)
            }
            for (let x in this.shopData.gallery){
              this.gallery.push(this.$store.state.picUrl+this.shopData.gallery[x].img_url)
            }
            this.background_style = "background-image: url("+this.gallery[0]+" );" 
          }
        })
        wx.request({
          url:this.$store.state.ApiList.PromotionList,
          data:{shop_id:this.$root.$mp.query.id},
          success:(res) =>{
            this.promotionData = res.data.data.data
            console.log(this.promotionData)
          }
        })
      }
    },
  
    onShow () {
      this.shopData = {}
      this.gallery = []
      this.initData()
    }
  }
  </script>
  
  <style scoped>

  </style>
  