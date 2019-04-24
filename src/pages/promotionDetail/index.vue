<template>
    <div class="PromotionDetial">
      <div class="gallery" :style="background_style" @click="preivew">
        <div class="pic_count">
        <icon class="icon-picture"></icon>
      {{gallery.length}}张</div>
      </div>
      <div class="promotion_info">
        <div class="promotion_name space">{{promotionData.name}}
          <div class="brief">{{promotionData.promotion_brief}}</div>
          <div class="rank">
            <icon class="icon-star orange" size="15"></icon>
            <icon class="icon-star orange" size="15"></icon>
            <icon class="icon-star orange" size="15"></icon>
            <icon class="icon-star orange" size="15"></icon>
            <icon class="icon-star gray" size="15"></icon>
            <span>4分</span>
          </div>
        </div>

        <div class="title space">商家信息</div>
        <div class="shop_info space">
          <div class="info">
            <div class="name">{{shopInfo.name}}</div>
            <div class="address">{{shopInfo.address}}</div>
          </div>
          <div class="phone" @click="makePhonecall"><icon class="icon-phone" size="20"></icon></div>
        </div>

        <div class="title space">套餐</div>
        <div class="content space">
          <div class="item" v-for="(value, key) in promotionData.content" :promotionInfo='value' :type='type' :key="key">
            <div class="name">{{value.name}}</div>
            <div class="sum">{{value.sum}}/{{value.unit}}</div>
            <div class="price">￥{{value.price}}</div>
          </div>
        </div>

        <div class="title space">购买须知</div>
        <div class="_notice space">
          <div class="item">
            <div class="notice_title">有效期：</div>
            <div>{{promotionData.start_date}}至{{promotionData.end_date}}</div>
          </div>
          <div class="item">
            <div class="notice_title">使用时段：</div>
            <div v-for="(value, key) in promotionData.allow_time">{{value.start}} - {{value.end}}</div>
          </div>
        </div>

      </div>
      <div>
      </div>
      <div class="placeholder"></div>
      <div class="pay">
        <div class="price">
          <div class="small">￥</div>
          <div class="num">{{promotionData.price}}</div>
        </div>
        <div class="buy" @click="jumpToSubmitOrder">立刻购买</div>
      </div>
    </div>
  </template>
  <style>

  .PromotionDetial .placeholder{
    width: 100%;
    height: 51px;
  }
  .PromotionDetial .pay .buy{
    padding: 5px 10px;
    margin: 0 10px;
    display: flex;
    flex-direction: row;
    align-items: baseline;
    color: white;
    border-radius: 10px;
    border: 1px solid white;
    background: #FF7F00;
  }
  .PromotionDetial .pay .price{
    margin: 0 10px;
    display: flex;
    flex-direction: row;
    align-items: baseline;
    color: #FF7F00;
  }
  .PromotionDetial .pay .price .num{
    font-size: x-large;
  }
  .PromotionDetial .pay .price .small{
    font-size: small;
  }
  .PromotionDetial .pay{
    display: flex;
    flex-direction: row;
    align-items: center;
    border-top: 1px solid #d5d5d5;
    background: white;
    width: 100%;
    height: 50px;
    position: fixed;
    bottom: 0px;
    justify-content: space-between;
  }
  .PromotionDetial .space{
    padding: 10px;
  }
  .PromotionDetial .orange{
    font-size: 15px;
    color: orange;
  }
  .PromotionDetial .gray{
    font-size: 15px;
    color: gray;
  }

  .PromotionDetial .rank{
    font-size: 15px;
  }

  .PromotionDetial .rank span{
    margin: 0 10px;
    color: orange;
  }
  .PromotionDetial ._notice {
    display: flex;
    flex-direction: column;
    font-size: small;

  }
  .PromotionDetial ._notice .notice_title {
    color: orange;
  }
  .PromotionDetial ._notice div {
    padding-top: 5px;
  }
  .PromotionDetial .promotion_info{
    background: white;
    display: flex;
    flex-direction: column;
  }
  .PromotionDetial .promotion_info .promotion_name{
    font-size: large;
    font-weight: bolder;
    border-bottom: 5px solid #d5d5d5;
  }
  .PromotionDetial .promotion_info .brief{
    color: gray;
    font-size: x-small;
    font-weight: normal;
  }
  .PromotionDetial .promotion_info .shop_info{
    font-size: 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-bottom: 5px solid #d5d5d5;
  }
  .PromotionDetial .shop_info .phone{
    width: 10%;
    color: #49cea8;
    text-align: center;
  }
  .PromotionDetial .content .item{
    font-size: x-small;
    flex-direction: row;
    display: flex;
    border-bottom: 1px solid #d5d5d5;
    padding: 10px 0;
  }
  .PromotionDetial .content{
    border-bottom: 5px solid #d5d5d5;
  }
  .PromotionDetial .content .item .name{
    width: 60%;
  }
  .PromotionDetial .content .item .sum{
    text-align: center;
    width: 30%;
  }
  .PromotionDetial .content .item .price{
    text-align: right;
    width: 10%;
  }
  .PromotionDetial .title{
    padding: 10px;
    border-bottom: 1px solid #d5d5d5;
    background: white;
    color: gray;
    font-size: small;
  }
  .PromotionDetial .shop_info .name{
    font-weight: bold;
  }
  .PromotionDetial .pic_count icon {
    font-family:"anticon" !important;
    font-size:20px;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
  }
  .PromotionDetial icon{
    font-family:"anticon" !important;
    font-size:20px;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: auto 0;
  }
  .PromotionDetial .pic_count {
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
    .PromotionDetial .gallery{
      position:relative;
      width: 100%;
      height: 200px;
      background-size:100% auto;
       background-repeat:no-repeat;
       background-position:center center;
    }
  </style>
  <script>
  import { detectLogined } from '@/utils/index'
  import promotionList from '@/components/promotionList'
  
  export default {
    data () {
      return {
        shopInfo:{
          name:'',
          address:'',
          contact:''
        },
        promotionData:[],
        gallery:[],
        motto: 'Hello World',
        userInfo: {},
        ready:false,
        promotionData:false,
        banner:"a",
        imageStyle:"none",
        background_style: ""
      }
    },
  
    components: {
      promotionList
    },
  
    methods: {
      jumpToSubmitOrder:function() {
        if (detectLogined() == true) {
          wx.navigateTo({
            url:"/pages/submitOrder/main?data="+JSON.stringify({promotion_id:this.promotionData.id,price:this.promotionData.price,promotion_name:this.promotionData.name,shop_name:this.shopInfo.name,shop_id:this.promotionData.shop_id,content:this.promotionData.content})
          })
        }
      },
      makePhonecall(){
        wx.makePhoneCall({phoneNumber:this.promotionData.contact})
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
          url:this.$store.state.ApiList.PromotionDetail,
          data:{
              id:this.$root.$mp.query.id
          },
          success:(res) => {
            this.promotionData = res.data.data
            this.promotionData.allow_time = JSON.parse(this.promotionData.allow_time)
            for (var i = this.promotionData.allow_time.length - 1; i >= 0; i--) {
              this.promotionData.allow_time[i].end = 
              new Date(this.promotionData.allow_time[i].start[1]).getHours()
              +':'+ 
              new Date(this.promotionData.allow_time[i].start[1]).getMinutes()
              this.promotionData.allow_time[i].start = 
              new Date(this.promotionData.allow_time[i].start[0]).getHours() 
              +':'+ 
              new Date(this.promotionData.allow_time[i].start[0]).getMinutes()
            }
            for (let x in this.promotionData.gallery){
              this.gallery.push(this.$store.state.picUrl+this.promotionData.gallery[x].img_url)
            }
            this.background_style = "background-image: url("+this.gallery[0]+" );"
            console.log(this.promotionData)

            wx.request({
              url:this.$store.state.ApiList.ShopDetail,
              data:{
                  id:this.promotionData.shop_id
              },
              success:(res) => {
                this.shopInfo.name = res.data.data.shop.name
                this.shopInfo.address = res.data.data.shop.address
                this.shopInfo.contact = res.data.data.shop.contact
                this.shopInfo.coordinates = res.data.data.shop.coordinates
              }
            })
          }
        })
      }
    },
    onShow () {
      this.gallery = []
      this.promotionData = []
      this.initData()
    }
  }
  </script>
  
  <style scoped>

  </style>
  