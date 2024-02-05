<script setup lang="ts">

import {useCartStore} from "@/src/store/cartStore";
import {storeToRefs} from "pinia";
import {computed} from "vue";
import {chooseForm} from "@/src/composables/russianItemForm";
import CartItem from "@/src/components/Cart/CartItem.vue";

const cartStore = useCartStore();
const { cartItems, totalQuantity, totalPrice, installationStatus } =
    storeToRefs(cartStore);
const cartItemsNaming = computed(() => {
  return chooseForm(totalQuantity);
});
const cleanCart = () => {
  cartStore.clearCart();
};
</script>

<template>
  <section class="cart-items">
      <cart-item
          v-for="item in cartItems"
          :key="item.id"
          :cart-item="item"
      ></cart-item>
  </section>
</template>

<style scoped lang="scss">
.cart-items {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-self: start;
  > *:not(:last-child) {
    border-bottom: solid 0.1rem $font_ghostly
  }
  margin-bottom: 2.5rem;
  &__head {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &--bold {
      font-size: 2.75rem;
      padding: 0.3125rem 0.0625rem;
    }
    &--count {
      font-size: 1.125rem;
      color: $font_ghostly;
    }
    &--button {
      font-size: 0.875rem;
      text-decoration: underline;
      color: $font_ghostly;
      justify-self: end;
      cursor: pointer;
    }
  }

}

</style>
