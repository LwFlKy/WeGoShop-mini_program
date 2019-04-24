<script>
export default {
  created () {
    // 调用API从本地缓存中获取数据
  }
}
import '@/wxss/stylesheet.wxss';
import '@/wxss/meituan.wxss';
import '@/wxss/zanui.wxss';
</script>

<style>
page{
  background-color:#f5f5f5;
}
.header{
  position: fixed;
  top:0;
  left:0;
  right:0;
  z-index:1;
}
.main{
  z-index:0;
  position:relative;
  top:86px;
}
/*.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}*/
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
