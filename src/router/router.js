import {createRouter, createWebHistory} from 'vue-router';
import pinia from "../stores/piniaStore.js";
import {itemMusicStore} from '../stores/ItemMusicStore.js'
const store=itemMusicStore(pinia)
const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/itemMusicStore',
        name: 'itemMusic',
        component: () => import('../views/ItemMusic.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/infouser',
        name: 'infouser',
        beforeEnter:(to,from,next)=>{
            if(store.isLogin||store.token||localStorage.getItem('token')){
                next()
            }else{
                next('/login')
            }
        },
        component: () => import('../views/InfoUser.vue')
    },
    {
        path: '/search',
        name: 'search',
        component: () => import('../views/Search.vue')
    }
]

const router = createRouter({
    routes,
    history: createWebHistory()
})
router.beforeEach((to, from) => {
    console.log(to)
    if (to.path === '/login') {
        store.isFooterMusic=false
    }else {
        store.isFooterMusic = true
    }
})
export default router
