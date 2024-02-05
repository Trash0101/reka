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
  let {"materials[]": materials, page, ...destruct} = route.query
  catalogueStore.saveVisibilitySettings()
  console.log(selectedMaterials.value)
  router.replace({
    query: {
      page: 1,
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
          console.log('IT WORKED BLYAT')
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
  <label :for="`sinMat${props.material.id}`"  v-if="!isSimpleMaterial" class="entry-single">
    <input :id="`sinMat${props.material.id}`" @change="switchMaterial" v-model="isSelected" type="checkbox"> {{props.material.title}}
  </label>
  <div v-else class="entry-complex">
    <label :for="`compMat${props.material.id}`" class="entry-complex__top">
      <input class="entry-complex__checkbox" :id="`compMat${props.material.id}`" @change="switchMaterial" v-model="isSelected" type="checkbox"> {{props.material.title}}
    </label>
    <transition name="dropdown">
      <div class="entry-complex__wrapper">
        <label :for="material.id"  v-for="(material, key) in props.material.materials" :key="material.id"  class="entry-complex__sub" >
          <input class="entry-complex__checkbox" :id="material.id" @change="switchMaterial" v-model="isSelectedSub[key]" type="checkbox"> {{material.title}}
        </label>
      </div>
    </transition>
  </div>
</div>
</template>

<style scoped lang="scss">


.dropdown-enter-from {
  transform: translateY(-50%);
  opacity: 0;
}
.dropdown-enter-active {
  transition: all .3s ease-out;
}
.dropdown-enter-to {
  transform: translateY(0);
  opacity: 1;
}
.dropdown-leave-to {
  transform: translateY(-50%);
  opacity: 0;
}
.dropdown-leave-active {
  transition: all .3s ease-out;
}
.dropdown-leave-from {
  transform: translateY(0);
  opacity: 1;
}
</style>
