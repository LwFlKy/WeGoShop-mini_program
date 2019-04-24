<template>
    <div class="map">
        <map :show-location="true" :latitude="x" :longitude="y" :markers="markers" @tap="handleTap" @updated="handleUpdated"></map>
        <div class="display">
            x:{{x}} , y:{{y}}
        </div>
        <button @click="selectPoint">选点</button>
        <button @click="initData">当前位置</button>
    </div>
</template>
<style>
.map .display{
  text-align: center;
  padding: 10px;
  font-weight: bolder;
}
.map map{
    width:100%;
    height: 400px;
}
</style>
<script>
  
    export default {
      data () {
        return {
          motto: 'Hello World',
          userInfo: {},
          ready:false,
          shopData:false,
          banner:"a",
          markers:[],
          x:0,
          y:0
        }
      },
    
      components: {
      },
    
      methods: {
        handleTap(event){
            //this.x = event.x
            //this.y = event.y
            console.log(event)
        },
        getIndexShop:function() {
        },
        handleUpdated(event){
           
        },
        selectPoint(){ 
          wx.chooseLocation({
            success:(res) =>{
              this.y = res.longitude
              this.x = res.latitude
              this.markers = []
              this.markers.push({latitude:this.x,longitude:this.y})
            }
          })
        },
        initData(){
            wx.getLocation({
              type:"gcj02",
              success:(res) => {
                console.log(res)
                this.y = res.longitude
                this.x = res.latitude
                this.markers = []
                this.markers.push({latitude:this.x,longitude:this.y})
              }
            })
        }
      },
    
      created () {
        //this.initData()
      }
    }
    </script>