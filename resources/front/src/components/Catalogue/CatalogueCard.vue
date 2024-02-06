<script setup lang="ts">
import { PhMinusSquare, PhPlusSquare } from "@phosphor-icons/vue";
import type { Item } from "@/src/types/types";
import { computed, defineProps } from "vue";
import { useCartStore } from "@/src/store/cartStore";
import CataloguePagination from "@/src/components/Catalogue/CataloguePagination.vue";
import { useCatalogueStore } from "@/src/store/catalogueStore";
const props = defineProps<{
    item: Item;
    arrKey: number;
}>();

const catalogueStore = useCatalogueStore();
const cartStore = useCartStore();
const cartExistence = computed(() => {
    const check = cartStore.checkExistenceById(props.item.id);
    return check === false;
});
const addToCart = () => {
    cartStore.addToCart(props.item);
};
const removeFromCart = () => {
    cartStore.removeFromCart(props.item.id);
};
const currentQuantity = computed(() => {
    const cartItem = cartStore.cartItems.find((el: Item) => {
        return el.id === props.item.id;
    });
    return cartItem.quantity;
});
const showPagination = computed(() => {
    const numOfRows = Math.ceil(catalogueStore.catalogueItems.length / 3);
    return 3 * (numOfRows - 1) === props.arrKey;
});
</script>

<template>
    <div class="card">
        <span v-if="item.price_old" class="card__sale-chip">SALE</span>
        <div class="card__image">
            <img class="card__image-content" src="" alt="product_image" />
        </div>
        <div class="card__text-block">
            <div class="card__price">
                {{ item.price }} ₽
                <span v-if="item.price_old" class="card__price--old"
                    >{{ item.price_old }} ₽</span
                >
            </div>
            <div class="card__description">{{ item.title }}</div>
            <button
                v-if="cartExistence"
                @click="addToCart"
                class="card__button"
            >
                Добавить в корзину
            </button>
            <div v-else class="active-button">
                <ph-minus-square
                    @click="removeFromCart"
                    weight="thin"
                    class="active-button__minus"
                ></ph-minus-square>
                <div class="active-button__count">{{ currentQuantity }}</div>
                <ph-plus-square
                    @click="addToCart"
                    weight="thin"
                    class="active-button__plus"
                ></ph-plus-square>
            </div>
        </div>
        <catalogue-pagination
            v-if="showPagination"
            class="card__pagination"
        ></catalogue-pagination>
    </div>
</template>

<style scoped lang="scss">
.card {
    position: relative;
    width: 100%;
    height: 30rem;
    display: flex;
    flex-direction: column;
    &__image {
        background-color: #f1f5f8;
        border-radius: 0.625rem;
        width: 100%;
        height: 70%;
    }
    &__image-content {
        max-width: 100%;
        object-fit: cover;
    }
    &__text-block {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 0.875rem;
    }
    &__price {
        font-size: 1rem;
        color: $ui_active;
        font-weight: 500;
        &--old {
            margin-left: 0.625rem;
            color: rgb($ui_active, 0.3);
            text-decoration: line-through;
        }
    }
    &__description {
        font-size: 0.875rem;
    }
    &__button {
        color: white;
        width: 100%;
        text-align: center;
        font-size: 0.875rem;
        padding: 0.875rem 0;
        border-radius: 0.625rem;
        background-color: rgb($ui_active, 0.85);
        @include hover();
    }
    &__pagination {
        position: absolute;
        bottom: 0;
        left: 0.875rem;
        transform: translateY(125%);
    }
    &__sale-chip {
        position: absolute;
        top: 0.625rem;
        right: 0.625rem;
        border-radius: 0.25rem;
        color: rgb($ui_active, 0.8);
        background-color: white;
        font-size: 0.875rem;
    }
}
.active-button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.5rem;
    height: 50%;
    background-color: rgb($ui_active, 0.4);
    border-radius: 0.625rem;
    &__plus {
        color: white;
        font-size: 3rem;
        border-radius: 0.625rem;
        background-color: rgb($ui_active, 0.6);
        @include hover();
        &:hover {
            background-color: $ui_active;
            cursor: pointer;
        }
        &:active {
            background-color: $font_main;
            color: white;
            cursor: pointer;
            transform: translateY(0);
        }
    }
    &__minus {
        color: white;
        font-size: 3rem;
        border-radius: 0.625rem;
        background-color: rgb($ui_active, 0.6);
        @include hover();
        &:hover {
            background-color: $ui_active;
            cursor: pointer;
        }
        &:active {
            color: white;
            background-color: $font_main;
            cursor: pointer;
            transform: translateY(0);
        }
    }
    &__count {
        color: $font_main;
        font-size: 1.5rem;
    }
}
</style>
