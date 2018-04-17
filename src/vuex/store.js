import Vuex from 'vuex'
import userInfo from './modules/userInfo'
import creatives from './modules/creatives'
import Vue from 'vue'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    userInfo,
    creatives
  }
})