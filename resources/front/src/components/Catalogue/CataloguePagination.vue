<script setup lang="ts">

import {PhCaretLeft, PhCaretRight} from "@phosphor-icons/vue";
import {useCatalogueStore} from "@/src/store/catalogueStore";
import {useRoute, useRouter} from "vue-router";
import {computed} from "vue";

const catalogueStore = useCatalogueStore()
const route = useRoute()
const router = useRouter()
const currentPage = computed(()=> {
  if(route.query.page){
    return route.query.page
  } else {
    return 1
  }
})
const prevPage = ()=> {
  if(currentPage.value === 1) {
    console.log('huh?')
    return false
  } else {
    console.log('huh?')
    let {page, ...destruct} = route.query
    catalogueStore.saveVisibilitySettings()
    router.replace({
      query: {
        page: page-1,
        ...destruct
      }
    })
  }
}
const nextPage = ()=> {
  if(currentPage.value === catalogueStore.pages) {
    console.log('huh?')
    return false
  } else {
    console.log('huh?')
    let {page, ...destruct} = route.query
    catalogueStore.saveVisibilitySettings()
    let selectedPage = 2
    if(page){
      selectedPage = Number(page)+1
    }
    console.log(page)
    router.replace({
      query: {
        page: selectedPage,
        ...destruct
      }
    })
  }
}
</script>

<template>
  <div class="buttons">
    <ph-caret-left
        @click="
        prevPage
      "
        class="buttons__direction"
    ></ph-caret-left>
    <div class="buttons__text">
      <span class="buttons__text--big">{{ currentPage }}</span
      >/{{ catalogueStore.pages }}
    </div>
    <ph-caret-right
        @click="
       nextPage
      "
        class="buttons__direction"
    ></ph-caret-right>
  </div>

</template>

<style scoped lang="scss">
.buttons {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  &__direction {
    color: white;
    padding: 0.625rem;
    width: 3.125rem;
    height: 3.125rem;
    clip-path: circle(1.25rem);
    background-color: $ui_active;
    cursor: pointer;
  }
  &__text {
    font-size: 1.125rem;
    color: $font_ghostly;
    &--big {
      color: $font_main;
      font-size: 1.5rem;
    }
  }
}
</style>
