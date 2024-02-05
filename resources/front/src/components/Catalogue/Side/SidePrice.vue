<script setup lang="ts">

import {useCatalogueStore} from "@/src/store/catalogueStore";
import {onMounted, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import {storeToRefs} from "pinia";

const catalogueStore = useCatalogueStore();
const {priceRange} = storeToRefs(catalogueStore)
const slider = ref<number[]>([0,1000000])
const route = useRoute()
const router = useRouter()
let init = true
const updatePrice = (pricesArr:number[]) => {
  let {"prices[]": prices, ...destruct} = route.query
  console.log('updating price')
  catalogueStore.saveVisibilitySettings()
    router.replace({
      query: {
        "prices[]": pricesArr,
        ...destruct
      }
    })

}
onMounted(() => {
  if(route.query["prices[]"]){
    slider.value[0] = route.query["prices[]"][0]
    slider.value[1] = route.query["prices[]"][1]
    init = false
  }
})
</script>

<template>
<div class="side-price">
  <div class="input-field">
    <label for="input1" class="input-field__text">от</label>
    <input @focusout="updatePrice(catalogueStore.priceRange)" @submit.prevent="updatePrice" name="input1" :max="catalogueStore.priceRangeStatic[0]" v-model="catalogueStore.priceRange[0]" type="number">
  </div>
  <div class="input-field">
    <label for="input2" class="input-field__text">от</label>
    <input @focusout="updatePrice(catalogueStore.priceRange)" @submit.prevent="updatePrice" name="input2" :max="catalogueStore.priceRangeStatic[1]" v-model="catalogueStore.priceRange[1]" type="number">
  </div>
  <v-range-slider @end="updatePrice" v-model="slider" step="1" :min="catalogueStore.priceRangeStatic[0]" :max="catalogueStore.priceRangeStatic[1]" strict></v-range-slider>
</div>
</template>

<style scoped lang="scss">

</style>
