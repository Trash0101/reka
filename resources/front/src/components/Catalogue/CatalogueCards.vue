<script setup lang="ts">
import {useCatalogueStore} from "@/src/store/catalogueStore";
import CatalogueCard from "@/src/components/Catalogue/CatalogueCard.vue";
const catalogueStore = useCatalogueStore()

</script>

<template>
  <section class="cards">
    <catalogue-card v-for="(item, key) in catalogueStore.catalogueItems" :item="item" :arr-key="key"></catalogue-card>
  </section>
</template>

<style scoped lang="scss">
.cards {
  position: relative;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);
  grid-row-gap: 3rem;
  grid-column-gap: 1rem;
}
</style>
