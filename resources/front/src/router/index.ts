import {createRouter, createWebHistory} from "vue-router";
import AuthPage from "../views/AuthPage.vue";
import CataloguePage from "../views/CataloguePage.vue";


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/auth',
            name: 'auth',
            component: AuthPage
        },
        {
            path: '/catalogue',
            name: 'catalogue',
            component: CataloguePage
        },
    ]
})
// router.beforeEach(async (to, from) => {
//     if(to.name !== 'auth') return {name: 'auth'}
// })
export default router
