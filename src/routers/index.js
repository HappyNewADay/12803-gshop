// 路由器对象模块

import Vue from 'Vue'
import Msite from '../pages/Msite/Msite.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Search from '../pages/Search/Search.vue'
import Login from '../pages/Login/Login.vue'
import VueRouter from 'vue-router'
import Shop from '../pages/Shop/Shop.vue'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods.vue'
import ShopRating from '../pages/Shop/ShopRating/ShopRating.vue'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo.vue'

export default new VueRouter({
    //所有路由
    routes: [
        // 多个路由使用数组,每个路由都是一个对象
        {
            path: '/msite',
            component: Msite,
            meta: {
                showFooter: true
            }
        },
        {
            path: '/search',
            component: Search,
            meta: {
                showFooter: true
            }
        },
        {
            path: '/order',
            component: Order,
            meta: {
                showFooter: true
            }
        },
        {
            path: '/profile',
            component: Profile,
            meta: {
                showFooter: true
            }
        }, {
            path: '/',
            redirect: '/msite'
        }, {
            path: '/login',
            component: Login
        }, {
            path: '/shop',
            component: Shop,
            children: [
                {
                    path: '/shop/goods',
                    component: ShopGoods,
                },
                {
                    path: '/shop/rating',
                    component: ShopRating,
                },
                {
                    path: '/shop/info',
                    component: ShopInfo,
                },
                {
                    path: '',
                    redirect: '/shop/goods'
                }
            ]
        }
    ]
})