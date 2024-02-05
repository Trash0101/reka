<script setup lang="ts">
import {useCatalogueStore} from "@/src/store/catalogueStore";
import SideMaterialsEntry from "@/src/components/Catalogue/Side/SideMaterialsEntry.vue";

const catalogueStore = useCatalogueStore()

</script>

<template>
<div class="side-materials">
  <side-materials-entry v-for="material in catalogueStore.materials" :material="material" class="side-materials__entry"></side-materials-entry>
</div>
</template>

<style scoped lang="scss">

</style>
