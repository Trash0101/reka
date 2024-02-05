import {createRouter, createWebHistory} from "vue-router";
import AuthPage from "../views/AuthPage.vue";
import CataloguePage from "../views/CataloguePage.vue";
import {useCatalogueStore} from "../store/catalogueStore";
import CartPage from "../views/CartPage.vue";
import {inject} from "vue";
import {useCookies} from "vue3-cookies";
const { cookies } = useCookies()


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/auth',
            name: 'auth',
            component: AuthPage
        },
        {
            path: '/catalogue/:params*',
            name: 'catalogue',
            component: CataloguePage
        },
        {
            path: '/cart',
            name: 'cart',
            component: CartPage
        },
    ]
})
router.beforeEach((to, from)=> {
    console.log(cookies.isKey('auth'), 'cookie exists?')
    if(!cookies?.isKey('auth') && to.name !== 'auth') {
        return { name: 'auth' }
    } else {
        return true
    }
})
export default router
