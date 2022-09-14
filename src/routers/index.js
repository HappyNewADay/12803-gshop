// 路由器对象模块

import Vue from 'Vue'
import Msite from '../pages/Msite/Msite.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Search from '../pages/Search/Search.vue'
import Login from '../pages/Login/Login.vue'
import LoginTel from '../pages/Loginway/LoginTel.vue'
import LoginPwd from '../pages/Loginway/LoginPwd.vue'
import VueRouter from 'vue-router'

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
            component: Login,
            children: [
                {
                    path: 'logintel',
                    component: LoginTel
                },
                {
                    path: 'loginpwd',
                    component: LoginPwd
                }, {
                    path: '/',
                    redirect: 'logintel'
                }
            ]
        }]
})