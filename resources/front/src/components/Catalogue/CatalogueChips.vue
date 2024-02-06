<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import { useCatalogueStore } from "@/src/store/catalogueStore";
import { PhCaretDown, PhCaretUp, PhX } from "@phosphor-icons/vue";
const chipsArray = ref([]);

const route = useRoute();
const catalogueStore = useCatalogueStore();

for (const key in route.query) {
    switch (key) {
        case "category":
            // @ts-ignore
            chipsArray.value.push({
                name: catalogueStore.categories[Number(route.query[key]) - 1],
                queryKey: key,
                queryValue: route.query[key],
            });
            break;
        case "materials[]":
            // @ts-ignore
            let name;
            const checkerMaterial = (key) => {
                catalogueStore.materials.forEach((el) => {
                    if (`${el.id}` === key) {
                        name = el.title;
                    } else {
                        if (el.materials) {
                            el.materials.forEach((innerEl) => {
                                if (`${innerEl.id}` === key) {
                                    name = innerEl.title;
                                }
                            });
                        }
                    }
                });
            };
            if (typeof route.query[key] === "string") {
                checkerMaterial(route.query[key]);
                // @ts-ignore
                chipsArray.value.push({
                    name: name,
                    queryKey: key,
                    queryValue: route.query[key],
                });
            } else {
                // @ts-ignore
                route.query[key].forEach((queryEl) => {
                    checkerMaterial(queryEl);
                    // @ts-ignore
                    chipsArray.value.push({
                        name: name,
                        queryKey: key,
                        queryValue: queryEl,
                    });
                });
            }
            break;
        case "tags[]":
            // @ts-ignore
            let tag;
            for (const tagInner in catalogueStore.tags) {
                if (typeof route.query[key] === "string") {
                    if (tagInner === route.query[key]) {
                        tag = catalogueStore.tags[tagInner];
                        // @ts-ignore
                        chipsArray.value.push({
                            name: tag,
                            queryKey: key,
                            queryValue: route.query[key],
                        });
                    }
                } else {
                    // @ts-ignore
                    route.query[key].forEach((queryEl) => {
                        if (tagInner === queryEl) {
                            tag = catalogueStore.tags[tagInner];
                            // @ts-ignore
                            chipsArray.value.push({
                                name: tag,
                                queryKey: key,
                                queryValue: queryEl,
                            });
                        }
                    });
                }
            }
            break;
    }
}
const router = useRouter();
const deleteCategory = (index: number) => {
    const info = chipsArray.value[index];

    // @ts-ignore
    const { [`${info.queryKey}`]: extract, ...params } = route.query;

    if (typeof extract === "string") {
        router.replace({
            query: {
                ...params,
            },
        });
    } else {
        // @ts-ignore
        let extractFiltered;
        extractFiltered = extract.filter((el) => {
            return el !== info.queryValue;
        });

        router.replace({
            query: {
                [`${info.queryKey}`]: extractFiltered,
                ...params,
            },
        });
    }
};

const changeSort = (param: number) => {
    switch (param) {
        case 0: {
        }
    }
};
</script>

<template>
    <section class="chips">
        <div
            v-for="(chip, index) in chipsArray"
            @click="deleteCategory(index)"
            class="chip"
        >
            <div class="chip__name">
                {{ chip.name }}
            </div>
            <ph-x class="chip__x"></ph-x>
        </div>
        <div class="sort">
            <div class="sort__wrap">
                По умолчанию <ph-caret-down class="sort__caret"></ph-caret-down>
            </div>
            <v-menu
                open-on-hover
                transition="slide-y-transition"
                activator="parent"
                location="bottom"
            >
                <div @click="changeSort(0)" class="sort__drop-entry">
                    По умолчанию
                    <ph-caret-down class="sort__caret"></ph-caret-down>
                </div>
                <div @click="changeSort(1)" class="sort__drop-entry">
                    По умолчанию <ph-caret-up class="sort__caret"></ph-caret-up>
                </div>
                <div @click="changeSort(2)" class="sort__drop-entry">
                    По цене <ph-caret-down class="sort__caret"></ph-caret-down>
                </div>
                <div @click="changeSort(3)" class="sort__drop-entry">
                    По цене <ph-caret-up class="sort__caret"></ph-caret-up>
                </div>
            </v-menu>
        </div>
    </section>
</template>

<style scoped lang="scss">
.chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.625rem;
    align-items: center;
    margin-left: 4.375rem;
    position: relative;
}
.chip {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    border-radius: 1rem;
    background-color: $font_ghostly;
    padding: 0.25rem 0.75rem;
    height: 2rem;
    color: $ui_active;
    font-size: 0.8125rem;
    line-height: 1rem;
    @include hover();
}
.sort {
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 0.75rem;
    left: 1rem;
    font-size: 0.8125rem;
    line-height: 1.375rem;
    letter-spacing: 0.01125rem;
    color: $ui_active;
    &__caret {
        font-size: 0.8125rem;
    }
    &__drop-entry {
        font-size: 0.8125rem;
        line-height: 1.375rem;
        letter-spacing: 0.01125rem;
        color: $ui_active;
        background-color: white;
        padding: 0.5rem 1rem;
    }
}
</style>
