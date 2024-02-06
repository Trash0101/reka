import { defineStore } from "pinia";
import { ref } from "vue";
import type {
    APIres,
    Item,
    MaterialComplex,
    Materials,
    QueryParams,
} from "../types/types";
import axios from "axios";

export const useCatalogueStore = defineStore("catalogue", () => {
    const catalogueItems = ref<Item[]>([]);
    const pages = ref(0);
    const itemsPerPage = ref(9);

    const categories = ref<string[]>([]);

    const materials = ref<Materials[] | MaterialComplex[]>([]);

    const priceRange = ref<number[]>([]);
    const priceRangeStatic = ref<number[]>([]);

    const tags = ref<{ [key: string]: string }>();

    const totalItems = ref<number>(0);
    const initialSetup = async (params: QueryParams) => {
        try {
            const { data: res } = await axios.get<APIres>("api/products", {
                params: {
                    ...params,
                    limit: itemsPerPage.value,
                },
            });
            catalogueItems.value = res.data;
            pages.value = res.meta.last_page;
            itemsPerPage.value = res.meta.per_page;
            totalItems.value = res.meta.total;

            priceRange.value = res.filters.prices;
            priceRangeStatic.value = res.base_filters.prices;

            materials.value = res.filters.materials;
            tags.value = res.filters.tags;

            for (let property in res.categories) {
                // @ts-ignore
                categories.value[property - 1] = res.categories[property];
            }
            return true;
        } catch (err) {
            return false;
        }
    };

    const showFilters = ref(true);
    const switchFilterVisibility = () => {
        showFilters.value = !showFilters.value;
    };

    const showTypes = ref(false);
    const showPrice = ref(false);
    const showMaterial = ref(false);

    const saveVisibilitySettings = () => {
        localStorage.setItem(
            "visibility",
            JSON.stringify({
                types: showTypes.value,
                price: showPrice.value,
                material: showMaterial.value,
                main: showFilters.value,
            })
        );
    };

    const switchVisibility = (mod: string) => {
        switch (mod) {
            case "type":
                showTypes.value = !showTypes.value;
                break;
            case "price":
                showPrice.value = !showPrice.value;
                break;
            case "material":
                showMaterial.value = !showMaterial.value;
                break;
        }
    };
    const retrieveValues = () => {
        const restored = localStorage.getItem("visibility");
        if (restored) {
            const decoded = JSON.parse(restored);
            showTypes.value = decoded.types;
            showPrice.value = decoded.price;
            showMaterial.value = decoded.material;
            showFilters.value = decoded.main;
            console.log(showTypes.value);
        } else {
            return !!restored;
        }
    };
    retrieveValues();
    return {
        catalogueItems,
        showFilters,
        switchFilterVisibility,
        pages,
        itemsPerPage,
        totalItems,
        categories,
        materials,
        priceRange,
        priceRangeStatic,
        tags,
        initialSetup,
        showTypes,
        showPrice,
        showMaterial,
        switchVisibility,
        retrieveValues,
        saveVisibilitySettings,
    };
});
