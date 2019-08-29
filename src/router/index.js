import Vue from 'vue'
import Router from 'vue-router'

// TODO：路由
import Home from '@/views/Home.vue'
import routerModules from './modules/routerModules'

Vue.use(Router)

// 通用路由表
const constantRoutes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    routerModules
]

const createRouter = () => new Router({
    mode: 'history',
    base: process.env.VUE_BASE_URL,
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

export default router
