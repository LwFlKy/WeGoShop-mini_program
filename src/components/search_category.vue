<template>
    <div class="search_category">
    	
	    <div class="search_category_main">
	    	<div class="btn">
	    		<div class="item" @click="open">
	    			<span>{{now}}</span><icon class="icon-caretdown" style="color: gray;" size="15"></icon>
	    		</div>
			</div>
	    	<div v-if="showCate" class="category_main">
				<scroll-view scroll-y style="height: 200px;" class="top_cate">
					<div class="item" v-for="(value, key) in top_cate" :key="key" :class="value.id == now_cate.top ? 'highlight' : ''" @click="setChild(value)">{{value.name}}</div>
				</scroll-view>
				<scroll-view scroll-y style="height: 200px;" class="child_cate">
					<div class="item" v-for="(value, key) in child_cate" :class="(value.id == now_cate.child && value.parent_id == now_cate.top) ? 'highlight' : ''" @click="selected(value.id,key)" :key="key">{{value.name}}</div>
				</scroll-view>
			</div>
		</div>
    </div>
</template>
<style>
	.search_category .category_main .item{
		padding: 5px 10px;
		font-size:15px;
	}
	.search_category .category_main .highlight{
		color:orange;
	}
	.search_category .category_main .top_cate{
		width: 30%;
		height: 100%;
		display: flex;
		flex-direction: column;
		background: white;
	}
	.search_category .category_main .child_cate{
		width: 70%;
		height: 100%;
		display: flex;
		flex-direction: column;
		background: white;
	}
	.search_category .category_main{
		display: flex;
		flex-direction: row;
	}
	.search_category .btn{
		border-top: 1px solid #d5d5d5;
		background: white;
		font-size:15px;
		display: flex;
		flex-direction: row;
	}
	.search_category .btn .item{
		padding: 5px 10px;
		justify-content: right;
	}
	.search_category .btn icon{
      margin: 6px 0;
      font-family:"anticon" !important;
      font-size:15px;
      font-style:normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
	}
</style>
<script>
	export default{
		data(){
			return {
				now:"hah",
				now_cate:{
					top:0,
					child:0
				},
				showCate:false,
				top_cate:{},
				child_cate:[]
			}
		},
		methods:{
			selected:function(id,key) {
				this.now_cate.child = id
				let category = {	
					parent_type_id:this.now_cate.top,
					type_id:this.now_cate.child
				}
				if (id == 0) {
					this.now = this.top_cate["id"+this.now_cate.top].name
				}else{
					this.now = this.child_cate[key].name
				}
				this.$emit("selected",category)
				this.$emit("cover")
			},
			open(){
				this.$emit("cover")
			},
			show(){
				if(this.showCate){
					this.showCate = false
				}else{
					this.showCate = true
				}
			},
			setChild(item){
				this.now_cate.top = item.id
				if (item.id !== 0 ) {
					this.child_cate = [{id:0,name:"全部分类",parent_id:item.id}]
					for (var i = item.child_cate.length - 1; i >= 0; i--) {
						this.child_cate.push(item.child_cate[i])
					}
				}else{
					this.child_cate = [{id:0,name:"全部分类",parent_id:item.id}]
				}
			},
			initData(){
				wx.request({
					url:this.$store.state.ApiList.ShopCategory,
					success:(res) => {
						this.categoryData = res.data.data
						this.top_cate = {"id0":{id:0,name:"全部"}}
						for (var i = res.data.data.length - 1; i >= 0; i--) {
							if (res.data.data[i].level == 1) {
								this.top_cate["id"+res.data.data[i].id] = res.data.data[i]
								this.top_cate["id"+res.data.data[i].id].child_cate = []
							}
						}
						for (var i = res.data.data.length - 1; i >= 0; i--) {
							if (res.data.data[i].level == 2) {
								this.top_cate["id"+res.data.data[i].parent_id].child_cate.push(res.data.data[i])
							}
						}
					}
				})
			}
		},
		mounted(){
			this.initData()
		}
	}
</script>
