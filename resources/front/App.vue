<script setup lang="ts">
import axios from "axios";
import HeaderMain from "@/src/components/HeaderMain.vue";
import {onMounted, ref, watch} from "vue";
import type {APIres} from "@/src/types/types";
import {useRoute} from "vue-router";
import {useCartStore} from "@/src/store/cartStore";
import {useCatalogueStore} from "@/src/store/catalogueStore";


const catalogue = ref<APIres>()
const route = useRoute()
const categoriesLoaded = ref(false)
const catalogueStore = useCatalogueStore()


const cartStore = useCartStore()
cartStore.cartLocalStorageRestore()

watch(route, ()=> {
  catalogueStore.initialSetup(route.query)
})
</script>

<template>
    <div class="flex">
        <header-main class="flex__header" :categories="catalogueStore.categories"></header-main>
        <router-view :key="route.fullPath" class="flex__main"></router-view>
    </div>
</template>
<style lang="scss">
.dev {
  padding: 1rem 2rem;
  background-color: magenta;
  position: absolute;
  top: 0;
  right: 0;
}
*{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
.html{
    font-family: Inter, sans-serif;
    font-size: 62.5% !important;
    color: $font_main;
}
.flex {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 0;
    width: 100vw;
    justify-items: flex-start;
    align-items: center;
    &__header {
        width: 80%;
    }
    &__main {
        width: 80%;
        align-self: auto;
    }
}
a{
    text-decoration: none;
    color: $font_main;
}
</style>
