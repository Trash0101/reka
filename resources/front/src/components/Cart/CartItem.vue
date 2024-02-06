<script setup lang="ts">
import { useCartStore } from "@/src/store/cartStore";
import type { CartItem } from "@/src/types/types";
import { computed } from "vue";
import { formatNumberWithSpaces } from "@/src/composables/russianItemForm";
import { PhX } from "@phosphor-icons/vue";

const cartStore = useCartStore();
const props = defineProps<{
    cartItem: CartItem;
}>();

const priceString = computed(() => {
    return formatNumberWithSpaces(props.cartItem.price);
});
const priceStringTotal = computed(() => {
    return formatNumberWithSpaces(
        props.cartItem.price * props.cartItem.quantity
    );
});
const priceOldString = computed(() => {
    return formatNumberWithSpaces(
        props.cartItem.price_old * props.cartItem.quantity
    );
});
const decrease = () => {
    cartStore.removeFromCart(props.cartItem.id);
};
const increase = () => {
    cartStore.addToCart(props.cartItem);
};
const deleteItem = () => {
    cartStore.removeItemCompletely(props.cartItem.id);
};
</script>

<template>
    <div class="item">
        <slot class="item__slot"> </slot>
        <div class="item__image_container">
            <span v-if="props.cartItem.price_old" class="item__sale_chip"
                >-{{ props.cartItem.salePercentage }}%</span
            >
            <img class="item__img" src="" alt="item_photo" />
        </div>
        <div class="item__description">
            <span class="item__description--name">{{
                props.cartItem.name
            }}</span>
            <span class="item__description--id"
                >Артикул: {{ props.cartItem.id }}</span
            >
        </div>
        <div class="item__buttons">
            <button class="item__buttons--plus" @click="increase">+</button>
            <button class="item__buttons--quantity">
                {{ props.cartItem.quantity }}
            </button>
            <button class="item__buttons--minus" @click="decrease">-</button>
            <div class="item__buttons--ppu" v-if="props.cartItem.quantity > 1">
                {{ priceString }} ₽/шт
            </div>
        </div>
        <div class="item__price-block">
            <div class="item__price">{{ priceStringTotal }} ₽</div>
            <div v-if="props.cartItem.price_old" class="item__price--old">
                {{ priceOldString }} ₽
            </div>
        </div>
        <ph-x class="item__delete" weight="thin" @click="deleteItem"></ph-x>
    </div>
</template>

<style scoped lang="scss">
.item {
    padding: 0.9375rem 1.25rem;
    height: 8.4375rem;
    position: relative;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 0.25fr 1fr 1fr 2fr 2fr;
    align-items: center;
    justify-items: center;
    &__img {
        max-width: 6.25rem;
        object-fit: cover;
    }
    &__image_container {
        height: 6.25rem;
        width: 6.25rem;
        position: relative;
    }
    &__sale_chip {
        color: white;
        position: absolute;
        top: 0;
        left: 0;
        background-color: #949ba6;
        font-size: 0.625rem;
        line-height: 22px;
        padding: 0.15625rem 0.3125rem;
        border-radius: 0.3125rem;
    }
    &__description {
        display: flex;
        flex-direction: column;
        gap: 0.625rem;
        &--name {
            color: $ui_active;
            font-weight: 500;
            font-size: 0.875rem;
        }
        &--id {
            color: rgb($ui_active, 0.5);
            font-size: 0.75rem;
            font-weight: 400;
        }
    }
    &__buttons {
        display: flex;
        flex-wrap: wrap;
        position: relative;
        justify-content: center;
        color: $cart_symbols;
        justify-self: end;
        & > * {
            padding: 0.3125rem 0.625rem;
            font-size: 0.875rem;
            margin: 0.125rem;
            border: none;
        }
        &--minus {
            &:hover {
                cursor: pointer;
            }
        }
        &--plus {
            &:hover {
                cursor: pointer;
            }
        }
        &--ppu {
            font-size: 0.75rem;
            background-color: transparent;
            position: absolute;
            bottom: -1.5625rem;
        }
        &--quantity {
            font-size: 0.9375rem;
            font-weight: 500;
            line-height: 1.25rem;
            color: $ui_active;
        }
    }
    &__price {
        font-size: 1.125rem;
        font-weight: 500;
        color: $font_main;
        &--old {
            color: rgb($font_main, 0.3);
            font-size: 1.125rem;
            font-weight: 400;
            line-height: 1.25rem;
            text-decoration: line-through;
        }
    }
    &__delete {
        font-size: 2rem;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        &:hover {
            cursor: pointer;
        }
    }
}
</style>
