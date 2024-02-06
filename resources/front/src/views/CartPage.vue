<script setup lang="ts">
import { useCartStore } from "@/src/store/cartStore";
import CartItems from "@/src/components/Cart/CartItems.vue";
import CartSummary from "@/src/components/Cart/CartSummary.vue";
import { storeToRefs } from "pinia";
import { PhArrowLeft } from "@phosphor-icons/vue";

const cartStore = useCartStore();
const { cartItems, totalQuantity, totalPrice } = storeToRefs(cartStore);
</script>

<template>
    <div class="cart-grid">
        <div class="link">
            <div class="link__wrapper">
                <ph-arrow-left class="link__arrow"></ph-arrow-left>
                <router-link class="link__main" to="/catalogue"
                    >Вернутся к покупкам</router-link
                >
            </div>
        </div>
        <cart-items
            class="cart-grid__items"
            v-if="cartStore.cartItems.length"
        ></cart-items>
        <cart-summary
            class="cart-grid__summary"
            v-if="cartStore.cartItems.length"
        ></cart-summary>
        <div class="cart__empty" v-if="!cartStore.cartItems.length">
            Ваша корзина пуста
        </div>
    </div>
</template>

<style scoped lang="scss">
.cart-grid {
    display: grid;
    grid-template-rows: 3.125rem 1fr;
    grid-template-columns: 2.5fr 1fr;
    justify-items: center;
    align-items: center;
    column-gap: 1.5625rem;
    row-gap: 1.5625rem;
    &__items {
        grid-row: 2;
        grid-column: 1;
    }
    &__summary {
        grid-row: 2;
        grid-column: 2;
    }
}
.link {
    font-size: 0.875rem;
    padding: 0.9375rem 1.25rem;
    grid-column: 1;
    grid-row: 1;
    justify-self: start;
    display: flex;
    gap: 0.3125rem;
    &__main {
        text-decoration: none;
        &:hover {
            color: $ui_active;
        }
        &:active {
            color: $ui_active;
        }
        &:visited {
            color: $ui_active;
        }
    }
}
.cart {
    grid-row: 1;
    grid-column: -2;
    align-self: center;
    justify-self: end;
    display: flex;
    align-items: center;
    &__icon {
        margin-right: 1rem;
        color: $ui_active;
        height: 32rem;
        width: 32rem;
    }
    &__info {
        display: flex;
        flex-direction: column;
        &--highlight {
            padding: 0.0625rem 0.125rem;
            font-size: 0.875rem;
        }
        &--quantity {
            padding: 0.0625rem 0.125rem;
            font-size: 0.75rem;
            color: $font_ghostly;
        }
        &--price {
            padding: 0.0625rem 0.125rem;
            font-size: 0.75rem;
        }
    }
    &__empty {
        grid-row: 3/5;
        grid-column: 1/5;
        text-align: center;
        align-self: center;
        justify-self: center;
        font-size: 2.25rem;
        color: $ui_active;
    }
}
</style>
