<script setup lang="ts">
import {useCatalogueStore} from "@/src/store/catalogueStore";
import {storeToRefs} from "pinia";
import {chooseForm} from "@/src/composables/russianItemForm";
import {PhEye, PhEyeClosed} from "@phosphor-icons/vue";
import {computed} from "vue";
const catalogueStore = useCatalogueStore()
const {totalItems , showFilters} = storeToRefs(catalogueStore)
const converted = computed(()=> {
  return chooseForm(totalItems.value)
})
console.log(totalItems.value)

</script>

<template>
  <section class="head-catalogue">
    <div class="head-catalogue__text">Все изделия <span class="head-catalogue__text--small">{{converted}}</span></div>
    <div class="head-catalogue__filter">
      <div v-if="showFilters" class="head-catalogue__wrapper">
        <ph-eye class="head-catalogue__eye" ></ph-eye>
        <span class="head-catalogue__text--filter">Спрятать фильтры</span>
      </div>
      <div v-else class="head-catalogue__wrapper">
        <ph-eye-closed class="head-catalogue__eye"></ph-eye-closed>
        <span class="head-catalogue__text--filter">Показать фильтры</span>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
  .head-catalogue{
    display: flex;
    flex-direction: column;
    justify-content: center;
    &__text {
      font-size: 1.75rem;
      color: $ui_active;
      font-weight: 600;
      margin-bottom: 1rem;
      &--small {
        font-weight: 400;
        font-size: 0.875rem;
        color: rgb($ui_active, 0.6);
      }
      &--filter {
        font-size: 0.875rem;
        color: rgb($ui_active, 0.6);
        text-decoration: underline;
      }
    }
    &__eye {
      font-size: 1.5rem;
      color: rgb($ui_active, 0.6);
      margin-right: .5rem;
    }
    &__wrapper {
      display: flex;
      align-items: center;
    }
  }
</style>
