<script setup lang="ts">

import {PhMinusSquare, PhPlusSquare} from "@phosphor-icons/vue";
import type {Item} from "@/src/types/types";
import {computed, defineProps} from 'vue'
import {useCartStore} from "@/src/store/cartStore";
const props = defineProps<{
  item:Item
}>()
const cartStore = useCartStore()
const cartExistence = computed(()=> {
  const check = ((cartStore.checkExistenceById(props.item.id)))
  return check === false;
})
const addToCart = ()=> {
  cartStore.addToCart(props.item)
}
const removeFromCart = () => {
  cartStore.removeFromCart(props.item.id)
}
const currentQuantity = computed(()=> {
  const cartItem = cartStore.cartItems.find((el:Item) => {
    return el.id === props.item.id
  })
  return cartItem.quantity
})
</script>

<template>
  <div class="card">
    <div class="card__image">
      <img class="card__image-content" src="" alt="product_image">
    </div>
    <div class="card__text-block">
      <div class="card__price">{{ item.price }} ₽
        <span v-if="item.price_old"
              class="card__price--old">{{item.price_old}} ₽</span></div>
      <div class="card__description">{{item.title}}</div>
      <button v-if="cartExistence" @click="addToCart" class="card__button">Добавить в корзину</button>
      <div v-else class="active-button">
        <ph-minus-square @click="removeFromCart" weight="thin" class="active-button__minus"></ph-minus-square>
        <div class="active-button__count">{{currentQuantity}}</div>
        <ph-plus-square @click="addToCart" weight="thin" class="active-button__plus"></ph-plus-square>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  width: 100%;
  height: 30rem;
  display: flex;
  flex-direction: column;
  &__image {
    width: 100%;
    height: 70%;
  }
  &__image-content{
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
    &--old{
      margin-left: 0.625rem;
      color: rgb($ui_active, .3);
      text-decoration: line-through;
    }
  }
  &__description{
    font-size: 0.875rem;
  }
  &__button {
    color: white;
    width: 100%;
    text-align: center;
    font-size: 0.875rem;
    padding: 0.875rem 0;
    border-radius: 0.625rem;
    background-color: rgb($ui_active, .85);
    @include hover();
  }
}
.active-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.5rem;
  height: 50%;
  &__plus {
    color: white;
    font-size: 3rem;
    border-radius: 0.625rem;
    background-color: rgb($ui_active, .6);
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
    background-color: rgb($ui_active, .6);
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
  &__count{
    color: $font_main;
    font-size: 1.5rem;
  }
}
</style>
