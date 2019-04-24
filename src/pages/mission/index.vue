<template>
	<div class="mission">
		<div class="item">
			<div class="image">
				<icon class="icon-book"></icon>
			</div>
			<div class="name">每日签到</div>
			<div class="go">去完成</div>
		</div>
	</div>
</template>
<style>
.mission{
	padding: 10px;
}
.mission .item{
	display: flex;
	flex-direction: row;
	align-items: center;
	background: white;
	padding: 10px;
}
.mission .item .image{
	text-align: center;
  	width: 20%;
}
.mission .item icon {
	font-family:"anticon" !important;
	font-size:50px;
	font-style:normal;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color:gray;
}
.mission .item .name {
	font-weight: bold;
	padding: 0 10px;
	width: 60%;
}
.mission .item .go {
	margin-right: 10px;
	text-align: center;
	border-radius: 50px;
	padding: 3px;
	color: gray;
	font-size: x-small;
	border: 1px solid gray;
	width: 20%;
}
</style>
<script>
	export default{
		data(){
			return {
				postData:{}
			}
		},
		components:{
		}
	}
</script>