// 
/**
 * vuex最核心的管理对象store
 */
import Vue from 'vue'
import Vuex from 'vuex'
import {
    reqAddress,
    reqFoodCategorys,
    reqShops,
    reqUserInfo,
    reqLogout,
    reqShopRatings,
    reqShopGoods,
    reqShopInfo,
    reqSearchShop,
    reqPwdLogin
} from '../api'
import {
    ADDRESS,
    CATEGORYS,
    SHOPS,
    USERINFO,
} from './Typeschange'
Vue.use(Vuex)
const actions = {
    async getAddress(context, value) {
        // 发送异步ajax请求
        const geohash = context.state.latitude + ',' + context.state.longitude
        const result = await reqAddress(geohash)
        // 提交一个mutation
        if (result.code === 0) {
            const address = result.data
            context.commit('ADDRESS', { address })
        }
    },
    async getCategorys({ commit, state }) {
        //发送异步ajax请求
        const result = await reqFoodCategorys()
        //提交一个mutation
        if (result.code === 0) {
            const categorys = result.data
            commit('CATEGORYS', { categorys })
        }
    },
    async getShops({ commit, state }) {
        //发送异步ajax请求
        const { longitude, latitude } = state
        const result = await reqShops(longitude, latitude)
        //提交一个mutation
        if (result.code === 0) {
            const shops = result.data
            commit('SHOPS', { shops })
        }
    },
    //同步记录用户信息
    recordUsers(context, userinfo) {
        context.commit('USERINFO', { userinfo })
    },
}
const mutations = {
    ADDRESS(state, { address }) {
        state.address = address
    },
    CATEGORYS(state, { categorys }) {
        state.categorys = categorys
    },
    SHOPS(state, { shops }) {
        state.shops = shops
    },
    USERINFO(state, { userinfo }) {
        state.userInfo = userinfo
    },
}
const state = {
    latitude: 40.10038,//维度
    longitude: 116.36867,//经度
    address: {},//包含地址信息
    categorys: [],//食品分类数组
    shops: [],//商家数组
    userInfo: {},//用户信息
    testUser: {
        name: 'abc',
        pwd: '123',
        phone: 15879140501,
    }//测试用户暂时存储地
}
const getters = {

}
export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters
}) 