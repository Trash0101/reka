<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useCatalogueStore } from "@/src/store/catalogueStore";
import { onBeforeMount } from "vue";
import { storeToRefs } from "pinia";
import { PhCaretDown, PhCaretUp } from "@phosphor-icons/vue";
import SideCategories from "@/src/components/Catalogue/Side/SideCategories.vue";
import SidePrice from "@/src/components/Catalogue/Side/SidePrice.vue";
import SideMaterials from "@/src/components/Catalogue/Side/SideMaterials.vue";
import SideTags from "@/src/components/Catalogue/Side/SideTags.vue";

const router = useRouter();
const route = useRoute();
const catalogueStore = useCatalogueStore();

const { showTypes, showPrice, showMaterial } = storeToRefs(catalogueStore);

const toggleTags = (key: string) => {};
onBeforeMount(() => {
    catalogueStore.retrieveValues();
});
const changeCategory = (key: number) => {
    let { category, page, ...destruct } = route.query;
    category = key + 1;
    catalogueStore.saveVisibilitySettings();
    if (key === -1) {
        router.replace({
            query: {
                page: 1,
                ...destruct,
            },
        });
    } else {
        router.replace({
            query: {
                page: 1,
                category,
                ...destruct,
            },
        });
    }
};
</script>

<template>
    <section class="side-container">
        <div class="dropdown" @click="catalogueStore.switchVisibility('type')">
            Тип изделия
            <ph-caret-up
                v-if="!showTypes"
                weight="bold"
                class="dropdown__caret"
            ></ph-caret-up>
            <ph-caret-down
                v-if="showTypes"
                weight="bold"
                class="dropdown__caret"
            ></ph-caret-down>
        </div>
        <transition name="dropdown">
            <div class="dropdown__wrap" v-if="showTypes">
                <div
                    class="dropdown__entry"
                    :class="{
                        'dropdown__entry--selected': !route.query.category,
                    }"
                    @click="changeCategory(-1)"
                >
                    Все категории
                </div>
                <side-categories
                    v-for="(value, key) in catalogueStore.categories"
                    :keyValue="key"
                    :valueVal="value"
                ></side-categories>
            </div>
        </transition>
        <div class="dropdown" @click="catalogueStore.switchVisibility('price')">
            Цена
            <ph-caret-up
                v-if="!showPrice"
                weight="bold"
                class="dropdown__caret"
            ></ph-caret-up>
            <ph-caret-down
                v-if="showPrice"
                weight="bold"
                class="dropdown__caret"
            ></ph-caret-down>
        </div>
        <transition name="dropdown">
            <side-price v-if="showPrice"></side-price>
        </transition>
        <div
            class="dropdown"
            @click="catalogueStore.switchVisibility('material')"
        >
            Материал
            <ph-caret-up
                v-if="!showMaterial"
                weight="bold"
                class="dropdown__caret"
            ></ph-caret-up>
            <ph-caret-down
                v-if="showMaterial"
                weight="bold"
                class="dropdown__caret"
            ></ph-caret-down>
        </div>
        <transition name="dropdown">
            <side-materials v-if="showMaterial"></side-materials>
        </transition>
        <side-tags></side-tags>
        <div class="side-container__reset">Очистить фильтр</div>
    </section>
</template>

<style scoped lang="scss">
.side-container {
    display: flex;
    flex-direction: column;
    &__reset {
        font-size: 0.875rem;
        width: 60%;
        text-align: center;
        color: rgb($ui_active, 0.6);
        text-decoration: underline;
    }
}
.dropdown {
    color: $ui_active;
    font-size: 1rem;
    overflow: hidden;
    padding: 1.875rem 2rem 0.9375rem 0;
    &__wrap {
        overflow: hidden;
    }
    &__entry {
        color: rgb($ui_active, 0.8);
        font-size: 0.875rem;
        border-radius: 0.625rem;
        padding: 0.5rem 1rem;
        cursor: pointer;
        @include hover();
        &:first-child {
            margin-top: 1rem;
        }
        &:last-child {
            margin-bottom: 1rem;
        }
        &--selected {
            background-color: $font_ghostly;
        }
    }
    &__caret {
        font-size: 0.75rem;
    }
}
.dropdown-enter-from {
    transform: translateY(-50%);
    opacity: 0;
}
.dropdown-enter-active {
    transition: all 0.3s ease-out;
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
    transition: all 0.3s ease-out;
}
.dropdown-leave-from {
    transform: translateY(0);
    opacity: 1;
}
</style>
