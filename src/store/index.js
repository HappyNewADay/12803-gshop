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
    USEROUT,
    GOODS,
    RATING,
    INFO,
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
        console.log(5)
        context.commit('USERINFO', { userinfo })
        console.log(state.userInfo)
    },
    //异步获取用户信息
    async getUserInfo(context) {
        // const result = await reqUserInfo()
        // const result = await session[0]
        if (window.localStorage.userInfo) {
            const user = window.localStorage.userInfo
            context.commit('USERINFO', { user })
        }
    },
    //异步登出
    async logout({ commit }) {
        // const result = await reqLogout()
        if (state.userInfo) {
            commit('USEROUT')
        }
    },
    //异步获取商家信息
    async getShopInfo({ commit }) {
        const result = await reqShopInfo()
        if (result.code === 0) {
            const info = result.data
            info.score = 3.5
            commit('INFO', { info })
        }
    },
    //异步获取商家商品列表
    async getShopGoods({ commit }) {
        const result = await reqShopGoods()
        if (result.code === 0) {
            const goods = result.data
            commit('GOODS', { goods })
        }
    },
    async getShopRating({ commit }) {
        const result = await reqShopRatings()
        if (result.code === 0) {
            const rating = result.data
            commit('RATING', { rating })
        }
    }
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
    USEROUT(state) {
        state.userInfo = {}
    },
    INFO(state, { info }) {
        state.info = info
    },
    RATING(state, { rating }) {
        state.rating = rating
    },
    GOODS(state, { goods }) {
        state.goods = goods
    }
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
    },//测试用户暂时存储地
    goods: [],
    rating: [],
    info: {},

}
const getters = {

}
export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters
}) 