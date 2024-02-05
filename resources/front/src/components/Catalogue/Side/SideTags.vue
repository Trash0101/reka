<script setup lang="ts">

import {PhCaretDown, PhCaretUp} from "@phosphor-icons/vue";
import {useCatalogueStore} from "@/src/store/catalogueStore";
import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";
const catalogueStore = useCatalogueStore()
const tagsArray = ref([])
const route = useRoute()
const router = useRouter()
for(const tag in catalogueStore.tags) {
  if(typeof(route.query["tags[]"]) === "string"){

  }
}

</script>

<template>
  <div class="wrapper">
    <div v-for="(tag, key) in catalogueStore.tags" class="tag-switch">
      <div class="check-box">
        {{tag}}
        <input v-model="tagsArray[key]" type="checkbox">
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.check-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 30%;
}

input[type="checkbox"] {
  position: relative;
  appearance: none;
  width: 1.5rem;
  height: 0.5rem;
  background: #ccc;
  border-radius: 50px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: 0.3s;
}

input:checked[type="checkbox"] {
  background: $font_main;
}

input[type="checkbox"]::after {
  position: absolute;
  content: "";
  width: 1rem;
  height: 1rem;
  top: 50%;
  left: 0;
  background: #fff;
  border-radius: 50%;
  border: solid 2px rgb($ui_active, .6);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  transform: translateY(-50%) scale(1.1);
  transition: 0.4s;
}

input:checked[type="checkbox"]::after {
  left: 50%;
}


</style>
