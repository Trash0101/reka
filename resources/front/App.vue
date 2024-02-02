<script setup lang="ts">
import axios from "axios";
import HeaderMain from "@/src/components/HeaderMain.vue";
import {onMounted, ref} from "vue";
const catalogue = ref()
const categoriesLoaded = ref(false)
const init = async ()=> {
    catalogue.value = await axios.get('/api/products/')
    console.log(catalogue.value);
    categoriesLoaded.value = true
}
init()
</script>

<template>
    <div class="flex">
        <header-main class="flex__header" v-if="categoriesLoaded" :categories="catalogue.data.categories"></header-main>
        <router-view class="flex__main"></router-view>
    </div>
</template>
<style lang="scss">
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
    width: 100vw;

    justify-items: flex-start;
    align-items: center;
    &__header {
        width: 80%;
    }
    &__main {
        width: 80%;
    }
}
a{
    text-decoration: none;
    color: $font_main;
}
</style>
