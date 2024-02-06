<script setup lang="ts">
import { useCatalogueStore } from "@/src/store/catalogueStore";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";

const catalogueStore = useCatalogueStore();
const { priceRange } = storeToRefs(catalogueStore);
const slider = ref<number[]>([0, 1000000]);
const route = useRoute();
const router = useRouter();
let init = true;
const updatePrice = (pricesArr: number[]) => {
    let { "prices[]": prices, page, ...destruct } = route.query;
    catalogueStore.saveVisibilitySettings();
    router.replace({
        query: {
            "prices[]": pricesArr,
            page: 1,
            ...destruct,
        },
    });
};
onMounted(() => {
    if (route.query["prices[]"]) {
        slider.value[0] = route.query["prices[]"][0];
        slider.value[1] = route.query["prices[]"][1];
        init = false;
    }
});
</script>

<template>
    <div class="side-price">
        <div class="input-field">
            <label for="input1" class="input-field__text">от</label>
            <input
                class="input-field__input"
                @focusout="updatePrice(catalogueStore.priceRange)"
                @submit.prevent="updatePrice"
                name="input1"
                :max="catalogueStore.priceRangeStatic[0]"
                v-model="catalogueStore.priceRange[0]"
                type="text"
            />
        </div>
        <div class="input-field">
            <label for="input2" class="input-field__text">до</label>
            <input
                class="input-field__input"
                @focusout="updatePrice(catalogueStore.priceRange)"
                @submit.prevent="updatePrice"
                name="input2"
                :max="catalogueStore.priceRangeStatic[1]"
                v-model="catalogueStore.priceRange[1]"
                type="text"
            />
        </div>
        <v-range-slider
            color="#667080"
            track-size="1px"
            density="compact"
            @end="updatePrice"
            v-model="slider"
            step="1"
            :min="catalogueStore.priceRangeStatic[0]"
            :max="catalogueStore.priceRangeStatic[1]"
            strict
        ></v-range-slider>
    </div>
</template>

<style scoped lang="scss">
.side-price {
    width: 60%;
    color: $ui_active;
    display: flex;
    flex-direction: column;
    gap: 0.3125rem;
}
.input-field {
    display: flex;
    height: 2.5rem;
    align-items: center;
    padding: 0.3125rem;
    border: 1px solid rgb($ui_active, 0.3);
    border-radius: 0.625rem;
    gap: 0.4375rem;
    &__text {
        font-size: 0.9375rem;
        color: rgb($ui_active, 0.5);
    }
    &__input {
        font-size: 0.9375rem;
        color: rgb($ui_active, 0.8);
        &:after {
            display: none;
        }
    }
}
</style>
