<script setup lang="ts">

import HeaderMain from "@/src/components/HeaderMain.vue";
import { ref, watch } from "vue";
import type { APIres } from "@/src/types/types";
import { useRoute } from "vue-router";
import { useCartStore } from "@/src/store/cartStore";
import { useCatalogueStore } from "@/src/store/catalogueStore";

const catalogue = ref<APIres>();
const route = useRoute();
const catalogueStore = useCatalogueStore();

const cartStore = useCartStore();
cartStore.cartLocalStorageRestore();

watch(route, () => {
    catalogueStore.initialSetup(route.query);
});
</script>

<template>
    <div class="flex">
        <header-main
            class="flex__header"
            :categories="catalogueStore.categories"
        ></header-main>
        <Suspense>
            <router-view :key="route.fullPath" class="flex__main"></router-view>
            <template class="flex__loading" #fallback> Loading... </template>
        </Suspense>
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
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
.html {
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
    overflow-x: auto;
    &__header {
        width: 80%;
        min-width: 1000px;
    }
    &__main {
        width: 80%;
        align-self: auto;
        min-width: 1000px;
    }
}
@media(max-width: 1060px) {
  .flex {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 0;
    width: 100vw;
    justify-items: flex-start;
    align-items: flex-start;
    overflow-x: auto;
    &__header {
      width: 80%;
      min-width: 1000px;
    }
    &__main {
      width: 80%;
      align-self: auto;
      min-width: 1000px;
    }
  }
}
a {
    text-decoration: none;
    color: $font_main;
}
input:focus,
select:focus,
textarea:focus,
button:focus {
    outline: none;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    display: none;
}
</style>
