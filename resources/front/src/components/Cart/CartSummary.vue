<script setup lang="ts">

import {useCartStore} from "@/src/store/cartStore";
import {computed} from "vue";
import type {ItemAPI} from "@/src/types/types";
import axios from "axios";
import {chooseForm, formatNumberWithSpaces} from "@/src/composables/russianItemForm";

const cartStore = useCartStore();
const discount = computed(()=> {
  return formatNumberWithSpaces(cartStore.totalDiscount)
})
const price = computed(()=> {
  return formatNumberWithSpaces(cartStore.totalPrice)
})
const quantity = computed(()=> {
  return chooseForm(cartStore.totalQuantity)
})
const priceWithoutDiscount = computed(()=> {
  return formatNumberWithSpaces(cartStore.totalPrice+cartStore.totalDiscount)
})
const sendRequest = async () => {
  try {
    const cartAPI:ItemAPI[] = [];
    cartStore.cartItems.forEach((el) => {
      cartAPI.push({
        id: el.id,
        quantity: el.quantity,
      });
    });
    const res = await axios.post("example.com/api", {
      body: {
        userId: "example",
        cartAPI,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
</script>

<template>
  <div @click="console.log(cartStore.totalDiscount, cartStore.totalPrice)" class="button">LOG</div>
  <section class="summary">
    <div class="summary__block summary__big">
      <span class="summary__big--left">К оплате</span>
      <span class="summary__big--right">{{ price }} ₽</span>
    </div>
    <div class="summary__block">
      <div class="summary__block--left">{{quantity}} на сумму</div>
      <div class="summary__block--right">{{ priceWithoutDiscount }} ₽</div>
    </div>
    <div class="summary__block">
      <div class="summary__block--left">Скидка</div>
      <div class="summary__block--right">{{ discount }} ₽</div>
    </div>
    <button class="summary__button" @click="sendRequest">Оформить заказ</button>
    <button class="summary__button summary__button--hollow">
      Купить в 1 клик
    </button>
  </section>
</template>

<style scoped lang="scss">
.summary {
  align-self: start;
  padding: 1.5rem 2rem;
  height: 18.75rem;
  width: 100%;
  background-color: $cart_background;
  color: rgb($ui_active, .8);
  display: flex;
  flex-direction: column;
  border-radius: .5rem;
  justify-content: center;
  &__head {
    padding: 1.25rem 0.625rem;
    font-size: 1.5rem;
    font-weight: 600;
  }
  &__block {
    padding: 0.3125rem 0.625rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 0.75rem;
    margin-bottom: 0.625rem;
    text-transform: uppercase;
    font-weight: 500;
    &--line {
      border-bottom: solid 1px $font_ghostly;
    }
  }
  &__big {
    color: $font_main;
    align-items: flex-end;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
    &--left {
      font-weight: 500;
      font-size: 1.25rem;
      text-transform: none;
    }
    &--right {
      padding: 0;
      font-weight: 400;
      font-size: 1.5rem;
      text-transform: uppercase;
    }
  }
  &__button {
    font-size: 1.125rem;
    padding: 0.875rem 2.5rem;
    color: white;
    background-color: $ui_active;
    border: none;
    border-radius: 0.25rem;
    margin-bottom: 0.625rem;
    font-weight: 500;

    &:hover {
      cursor: pointer;
    }
    &--hollow {
      color: $ui_active;
      background-color: white;
      border: solid 1px $ui_active;
    }
  }
}
.padding--large{
  padding-bottom: 4rem;
}
</style>
