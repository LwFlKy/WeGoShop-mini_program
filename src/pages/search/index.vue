<template>
	<div class="container">
    <div v-if="cover" class="cover" style="z-index: 5;"></div>
    <div class="header">
		  <search @getData="getShopInfo" @clear="clear" :shopInfo="shopInfo" :category="category" :type="type" ref="search"></search>
      <searchCategory @cover="open" ref="cate" @selected="selected"></searchCategory>
    </div>
    <div class="main">
      <showList v-if="shopInfo" v-for="(value, key) in shopData" :shopInfo='value' :type='type' :key="key"></showList>
      <div v-if="loading_status && shopInfo" style="text-align: center;font-size: small;color:gray;height: 50px;display: flex;flex-direction: column; justify-content: center;">
        加载中...
      </div>
      <div v-else-if="shopInfo" style="text-align: center;font-size: small;color:gray;height: 50px;display: flex;flex-direction: column; justify-content: center;">
        没有更多结果了
      </div>
    </div>
	</div>
</template>

<style>
  .container .header{
    z-index: 10;
  }
  .main{
    margin-top: 10px;
  } 
  .container .cover{
    z-index: 5;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,0.5);
  }
</style>
<script>
import search from '@/components/search'
import searchCategory from '@/components/search_category'
import showList from '@/components/list'

export default {
  data () {
    return {
      type:"ShopList",
      shopData:[],
      shopInfo: false,
      loading_status:true,
      cover:false,
      category :{  
        parent_type_id:0,
        type_id:0
      }
    }
  },
  components: {
    search,
    showList,
    searchCategory
  },

  methods: {
    selected:function(category) {
      this.category = category
      this.$refs.search.update(category)
    },
    open:function() {
      if(this.cover){
        this.cover = false
      }else{
        this.cover = true
      }
      this.$refs.cate.show()
    },
    clear:function() {
      this.loading_status = true
      this.shopData = []
    },
    getShopInfo:function(shopInfo) {
      if (shopInfo.length == 0) {
        this.loading_status = false
      }
      this.shopInfo = shopInfo
      this.shopData = this.shopData.concat(shopInfo)
    }
  },
  mounted () {
    if (this.$root.$mp.query.hasOwnProperty("category")) {
      this.$refs.search.fromIndex(JSON.parse(this.$root.$mp.query.category))
    }
  },
  onReachBottom(res) {
    if (this.loading_status) {
      this.$refs.search.getSearchResult()
    }
  }
}
</script>