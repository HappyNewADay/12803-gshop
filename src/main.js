//入口
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './routers'
import Vuex from 'vuex'
import store from './store/index.js'
import { Button } from 'mint-ui'
import './mock/mockServer'//加载mockserver即可

Vue.config.productionTip = false
Vue.component(Button.name, Button)//现在有一个全局组件可以使用<mt-button>
Vue.use(VueRouter)
new Vue({
    el: '#app',
    render: h => h(App),
    router,//使用vue-router
    store,//使用vuex
})