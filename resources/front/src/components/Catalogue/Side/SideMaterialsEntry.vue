<script setup lang="ts">
import type {MaterialComplex, Materials} from "@/src/types/types";
import {computed, onBeforeMount, onBeforeUpdate, onMounted, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useCatalogueStore} from "@/src/store/catalogueStore";

const props = defineProps<{
  material:Materials|MaterialComplex
}>()
const isSimpleMaterial = computed(()=> {
  return !!props.material.materials
})
const isSelected = ref(false)
const isSelectedSub = ref(new Array(props.material.materials.length ?? 1).fill(false))

const route = useRoute()
const router = useRouter()
const catalogueStore = useCatalogueStore()

const selectedMaterials = computed(()=> {
  const materials = []
  if(isSelected.value) {
    materials.push(props.material.id)
  }
  if(props.material.materials){
    isSelectedSub.value.forEach((el, index) => {
      if (el) {
        materials.push(props.material.materials[index].id)
      }
    })
  }
  return materials
})
const switchMaterial = () => {
  let {"materials[]": materials, ...destruct} = route.query
  catalogueStore.saveVisibilitySettings()
  console.log(selectedMaterials.value)
  router.replace({
    query: {
      "materials[]": selectedMaterials.value,
      ...destruct
    }
  })
}
onMounted(()=> {
  if(route.query["materials[]"]){
    const mat = route.query["materials[]"]
    if(typeof mat === 'string'){
      if(Number(mat) === props.material.id){
        isSelected.value = true
      } else {
        if(props.material.materials) {
          props.material.materials.forEach((innerEl, innerIndex) => {
            if(`${innerEl.id}` === mat) {
              isSelectedSub.value[innerIndex] = true
            }
          })
          }
        }
      } else {
      mat.forEach((el, index)=> {
        if(el === `${props.material.id}`) {
          isSelected.value = true
        }
        if(props.material.materials) {
          props.material.materials.forEach((innerEl, innerIndex) => {
            if(`${innerEl.id}` === el) {
              isSelectedSub.value[innerIndex] = true
            }
          })
        }
      })
      }
  }
})

</script>

<template>
<div class="wrapper">
  <div  v-if="!isSimpleMaterial" class="entry-single">
    <input @change="switchMaterial" v-model="isSelected" type="checkbox"> {{props.material.title}}
  </div>
  <div @click="switchMaterial" v-else class="entry-complex">
    <input @change="switchMaterial" v-model="isSelected" type="checkbox"> {{props.material.title}}
    <div  v-for="(material, key) in props.material.materials"  class="entry-complex__sub" >
      <input @change="switchMaterial" v-model="isSelectedSub[key]" type="checkbox"> {{material.title}}
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">

</style>
