// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'
import ApiList from '@/config/api.js'


Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0,
    ApiList: ApiList,
    picUrl: "http://qiniu.funnything.net/"
  },
  mutations: {
    increment: (state) => {
      const obj = state
      obj.count += 1
    },
    decrement: (state) => {
      const obj = state
      obj.count -= 1
    }
  }
})

export default store
