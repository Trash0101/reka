import {createRouter, createWebHistory} from "vue-router";
import AuthPage from "../views/AuthPage.vue";
import CataloguePage from "../views/CataloguePage.vue";
import {useCatalogueStore} from "../store/catalogueStore";
import CartPage from "../views/CartPage.vue";



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

export default router
