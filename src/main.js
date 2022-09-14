//入口
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './routers'
import Vuex from 'vuex'
import store from './store/index.js'

Vue.config.productionTip = false
Vue.use(VueRouter)
new Vue({
    el: '#app',
    render: h => h(App),
    router,//使用vue-router
    store,//使用vuex
})