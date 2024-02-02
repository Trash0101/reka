import { createApp } from "vue/dist/vue.esm-bundler";
import App from "@/App.vue";
import {createPinia} from "pinia";
import router from "@/src/router";
//Vuetify

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
const vuetify = createVuetify({
    components,
    directives,
    defaults: {

    }
})

const pinia = createPinia()
const app = createApp(App);
app.use(pinia).use(router).use(vuetify)
app.mount("#app");
