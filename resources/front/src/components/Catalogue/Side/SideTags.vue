<script setup lang="ts">
import { useCatalogueStore } from "@/src/store/catalogueStore";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const catalogueStore = useCatalogueStore();
const tagsNumber = ref(0);

const tagsArray = ref(new Array(tagsNumber.value).fill(false));

const route = useRoute();
const router = useRouter();

const setTags = () => {
    let { "tags[]": tags, page, ...destruct } = route.query;
    catalogueStore.saveVisibilitySettings();
    const tagsArrInner: number[] = [];
    tagsArray.value.forEach((el, index) => {
        if (el) {
            tagsArrInner.push(index);
        }
    });
    router.replace({
        query: {
            page: 1,
            "tags[]": tagsArrInner,
            ...destruct,
        },
    });
};

onMounted(async () => {
    let max = 0;
    for (const count in catalogueStore.tags) {
        max = Math.max(Number(count), max);
    }
    tagsArray.value = new Array(max).fill(false);
    for (const tag in catalogueStore.tags) {
        if (route.query["tags[]"]) {
            if (typeof route.query["tags[]"] === "string") {
                if (tag === route.query["tags[]"]) {
                    tagsArray.value[Number(tag)] = true;
                }
            } else {
                route.query["tags[]"].forEach((el) => {
                    if (tag === el) {
                        tagsArray.value[Number(tag)] = true;
                    }
                });
            }
        }
    }
});
</script>

<template>
    <div class="wrapper">
        <div
            v-for="(tag, key) in catalogueStore.tags"
            :key="tag"
            class="tag-switch"
        >
            <label :for="`tag${tag}${key}`" class="check-box">
                {{ tag }}
                <input
                    @change="setTags"
                    :id="`tag${tag}${key}`"
                    v-model="tagsArray[Number(key)]"
                    type="checkbox"
                />
            </label>
        </div>
    </div>
</template>

<style scoped lang="scss">
.wrapper {
    margin-bottom: 1.25rem;
}
.tag-switch {
    color: rgb($ui_active, 0.6);
    font-size: 0.875rem;
    padding-bottom: 0.625rem;
}

.check-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 40%;
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
    border: solid 2px rgb($ui_active, 0.6);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    transform: translateY(-50%) scale(1.1);
    transition: 0.4s;
}

input:checked[type="checkbox"]::after {
    left: 50%;
}
</style>
