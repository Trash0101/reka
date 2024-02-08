import { createRouter, createWebHistory } from "vue-router";
import AuthPage from "../views/AuthPage.vue";
import CataloguePage from "../views/CataloguePage.vue";
import CartPage from "../views/CartPage.vue";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/auth",
            name: "auth",
            component: AuthPage,
        },
        {
            path: "/catalogue/:params*",
            name: "catalogue",
            component: CataloguePage,
        },
        {
            path: "/cart",
            name: "cart",
            component: CartPage,
        },
    ],
});
router.beforeEach((to, from)=> {
    if(!cookies?.isKey('auth') && to.name !== 'auth') {
        return { name: 'auth' }
    } else {
        return true
    }
})
router.beforeEach((to, from)=> {
    return !(cookies?.isKey('auth') && to.name === 'auth');
})
router.beforeEach((to, from)=> {
    if(to.name === 'catalogue') {
        const queryCheck = (function isEmpty() {
            for (const prop in to.query) {
                if (Object.hasOwn(to.query, prop)) {
                    return false;
                }
            }
            return true;
        })()
        const paramCheck = (function isEmpty() {
            for (const prop in to.params) {
                if (Object.hasOwn(to.params, prop)) {
                    return false;
                }
            }
            return true;
        })()
        console.log(queryCheck, paramCheck)
        if(queryCheck && !paramCheck) {
            const holder = {}
            to.params?.params.forEach((el:string)=> {
                const [name, number] = el.split('-')
                if(holder[name]) {
                    holder[`${name}[]`] = [holder[name],number]
                    delete holder[name]
                } else if (holder[`${name}[]`]) {
                    holder[`${name}[]`].push(number)
                } else {
                    holder[name] = number
                }
            })
            return {
                name: 'catalogue',
                query: holder
            }
        }
    }
})
export default router;
