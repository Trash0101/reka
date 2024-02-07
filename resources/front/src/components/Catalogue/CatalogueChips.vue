<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import {computed, ref} from "vue";
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
          const {"sortBy[]": sort,"orderBy[]": ord, ...parmas} = route.query
          router.replace({
            ["orderBy[]"]: "desc",
            ...parmas
          })
          break
        }
      case 1: {
        const {"sortBy[]": sort,"orderBy[]": ord, ...parmas} = route.query
        router.replace({
          ["orderBy[]"]: "asc",
          ...parmas
        })
        break
      }
      case 2: {
        const {"sortBy[]": sort,"orderBy[]": ord, ...parmas} = route.query
        router.replace({
          ["sortBy[]"]: "price",
          ["orderBy[]"]: "desc",
          ...parmas
        })
        break
      }
      case 3: {
        const {"sortBy[]": sort,"orderBy[]": ord, ...parmas} = route.query
        router.replace({
          ["sortBy[]"]: "price",
          ["orderBy[]"]: "asc",
          ...parmas
        })
        break
      }
    }
};
const selectedSort = computed(()=> {
  const {"sortBy[]": sort,"orderBy[]": ord, ...parmas} = route.query
  if(sort && ord === 'desc') {
    return [true, true]
  } else if(sort && ord === 'asc') {
    return [true, false]
  }else if(!!sort && ord === 'asc') {
    return [false, true]
  }else if(!!sort && ord === 'asc') {
    return [false, false]
  } else {
    return [false, true]
  }

})
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
                {{selectedSort[0]? 'По цене' : 'По умолчанию'}} <ph-caret-down v-if="selectedSort[1]" class="sort__caret"></ph-caret-down><ph-caret-up v-else class="sort__caret"></ph-caret-up>
            </div>
            <v-menu
                open-on-hover
                open-on-click
                transition="slide-y-transition"
                activator="parent"
                location="bottom"
                class="sort__menu"
            >
                <div @click="changeSort(0)" class="sort__drop-entry sort__drop-entry--first">
                    <span class="sort__drop-text">По умолчанию</span>
                    <ph-caret-down class="sort__caret"></ph-caret-down>
                </div>
                <div @click="changeSort(1)" class="sort__drop-entry">
                  <span class="sort__drop-text">По умолчанию</span>
                  <ph-caret-up class="sort__caret"></ph-caret-up>
                </div>
                <div @click="changeSort(2)" class="sort__drop-entry">
                  <span class="sort__drop-text">По цене</span>
                  <ph-caret-down class="sort__caret"></ph-caret-down>
                </div>
                <div @click="changeSort(3)" class="sort__drop-entry">
                  <span class="sort__drop-text">По цене</span>
                  <ph-caret-up class="sort__caret"></ph-caret-up>
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
    &__wrap {

    }
    &__menu {

    }
    &__caret {
        font-size: 0.8125rem;
    }
    &__drop-entry {
        font-size: 0.8125rem;
        line-height: 1.375rem;
        letter-spacing: 0.01125rem;
        color: $ui_active;
        background-color: white;
        padding: 1rem 2rem 1rem 0;
        cursor: pointer;
        transform: translateX(-1rem);
        border-radius: 0.625rem;
        display: flex;
        align-items: center;
        gap: 0.625rem;
        &:hover {
          color: white;
          background: $ui_active;
        }
        &--first {
          margin-top: .5rem;
        }
    }
    &__drop-text {
      padding-left: 1rem;
    }
}
</style>
