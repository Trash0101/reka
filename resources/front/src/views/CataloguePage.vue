<script setup>
import {useRoute, useRouter} from "vue-router";
import {useCatalogueStore} from "@/src/store/catalogueStore";
import SideCategories from "@/src/components/Catalogue/Side/SideCategories.vue";
import {watch} from "vue";
import CatalogueTop from "@/src/components/Catalogue/CatalogueTop.vue";
import CatalogueCards from "@/src/components/Catalogue/CatalogueCards.vue";
import {useCartStore} from "@/src/store/cartStore";
import SideMain from "@/src/components/Catalogue/Side/SideMain.vue";

const route = useRoute()
const catalogueStore = useCatalogueStore()
const cartStore = useCartStore()
let APICall = catalogueStore.initialSetup(route.query);
watch(route, ()=> {
  APICall = catalogueStore.initialSetup(route.query);
})

</script>

<template>
<div v-if="APICall" class="catalogue">
  <catalogue-top class="catalogue__top"></catalogue-top>
  <side-main class="catalogue__side"></side-main>
  <catalogue-cards class="catalogue__cards"></catalogue-cards>
</div>
</template>

<style scoped lang="scss">
.catalogue {
    display: grid;
    grid-template-columns: repeat(4, 25%) ;
    grid-template-rows: .5fr 2fr 2fr 2fr 1fr;
  &__top {
    grid-row: 1;
    grid-column: 1;
  }
  &__side {
    grid-row: 2/-1;
    grid-column: 1;
  }
  &__cards {
    grid-row: 2/5;
    grid-column: 2/5;
  }
}
</style>
