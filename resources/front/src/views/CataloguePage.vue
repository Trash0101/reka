<script setup>
import {useRoute, useRouter} from "vue-router";
import {useCatalogueStore} from "@/src/store/catalogueStore";
import SideCategories from "@/src/components/Catalogue/Side/SideCategories.vue";
import {watch} from "vue";
import CatalogueTop from "@/src/components/Catalogue/CatalogueTop.vue";
import CatalogueCards from "@/src/components/Catalogue/CatalogueCards.vue";
import {useCartStore} from "@/src/store/cartStore";
import SideMain from "@/src/components/Catalogue/Side/SideMain.vue";
import {storeToRefs} from "pinia";
import CataloguePagination from "@/src/components/Catalogue/CataloguePagination.vue";
import {PhArrowsClockwise} from "@phosphor-icons/vue";

const route = useRoute()
const catalogueStore = useCatalogueStore()
const cartStore = useCartStore()
const {showFilters} = storeToRefs(catalogueStore)
let APICall = await catalogueStore.initialSetup(route.query);
watch(route, ()=> {
  APICall = catalogueStore.initialSetup(route.query);
})

</script>

<template>

    <div v-if="APICall" class="catalogue" :class="{'catalogue--no-filters': !showFilters}">
      <catalogue-top class="catalogue__top"></catalogue-top>
      <side-main v-if="showFilters" class="catalogue__side"></side-main>
      <catalogue-cards :class="{'catalogue__cards--no-filters': !showFilters}" class="catalogue__cards"></catalogue-cards>
    </div>
    <div v-else class="server-error">
        Извините возникли неполадки на сервере.
        <div class="server-error__wrapper">
          <ph-arrows-clockwise></ph-arrows-clockwise>
          <button class="server-error__button">Перезагрузить</button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.server-error{
  color: $font_main;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 6rem 0;
  font-size: 2.625rem;
  text-align: center;
  &__button {
    margin-left: 1rem;
    text-decoration: underline;
  }
  &__wrapper {
    color: rgb($ui_active, 0.6);
    margin-top: 3rem;
    display: flex;
    align-items: center;
  }
}
.catalogue {
    display: grid;
    grid-template-columns: repeat(4, 1fr) ;
    grid-template-rows: .5fr 2fr 2fr 2fr 1fr;
  &--no-filters{
    grid-template-columns: repeat(3, 1fr) ;
  }
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
    &--no-filters {
      grid-column: 1/-1;
    }
  }
  &__pagination {

  }
}
</style>
