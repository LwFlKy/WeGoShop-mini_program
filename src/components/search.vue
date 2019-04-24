<template>
  <div class="search">
    <div class="search_box">
      <icon type="search" size="15" />
        <input type="text" @confirm="handleConfirm" :disabled=disabled name="aaa" placeholder="请输入商家名或品类">
    </div>
  </div>
</template>
<script>
export default {
  props: ['disabled','type',"category"],
  data(){
    return {
      page:1
    }
  },
  methods:{
  	handleConfirm:function(event) {
      this.loc = wx.getStorageSync("loc")
      this.$emit("clear")
      this.page = 1
      this.option = {
        loc:this.loc,
        keyword:event.target.value
      }
      this.option = Object.assign(this.option,this.category)
      this.getSearchResult()
  	},
    update(category){
      if (this.option) {
        this.loc = wx.getStorageSync("loc")
        this.$emit("clear")
        this.page = 1
        this.option = Object.assign(this.option,category)
        this.getSearchResult()
        category
      }
    },
    fromIndex(category){
      this.loc = wx.getStorageSync("loc")
      this.$emit("clear")
      this.page = 1
      this.option = {
        loc:this.loc
      }
      this.option = Object.assign(this.option,category)
      this.getSearchResult()
    },
  	getSearchResult:function() {
      this.option.page = this.page
  		wx.request({
  			url:this.$store.state.ApiList[this.type],
  			data:this.option,
  			success:(res) => {
          this.$emit("getData", res.data.data)
          this.page = this.page + 1
  			}
  		})
  	}
  },
  mounted:function() {
  }
}
</script>

<style>
.search{
  padding: 12px 20px 12px 20px;
  background-color:white;
}
.search_box {
	display: flex;
	border-radius: 50px;
	background-color: #eee;
  padding: 0px 15px;
  align-items: center;
}
.search_box icon {
	height: 15px;
	margin-right: 10px;
}
.search_box input {
  margin: 3px 0;
	width: 100%;
	font-size: 15px;
	height: 15px;
}
</style>