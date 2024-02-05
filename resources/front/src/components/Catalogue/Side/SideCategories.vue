<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {useCatalogueStore} from "@/src/store/catalogueStore";

const props = defineProps<{
  keyValue:number,
  valueVal:string
}>()
const route = useRoute()
const router = useRouter()
const catalogueStore = useCatalogueStore()
const changeCategory = (key:number) => {
  let {category, ...destruct} = route.query
  category = key+1
  catalogueStore.saveVisibilitySettings()
  if(key === -1){
    router.replace({
      query: {
        ...destruct
      }
    })
  } else {
    router.replace({
      query: {
        category,
        ...destruct
      }
    })
  }
}
</script>

<template>
  <div class="dropdown__entry"
       :class="{'dropdown__entry--selected': route.query.category === `${props.keyValue+1}`}"
       @click="changeCategory(props.keyValue)"
  >{{valueVal}}
  </div>
</template>

<style scoped lang="scss">

</style>
