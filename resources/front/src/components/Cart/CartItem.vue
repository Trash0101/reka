<script setup lang="ts">
import {useCartStore} from "@/src/store/cartStore";
import type {CartItem} from "@/src/types/types";
import {computed} from "vue";
import {formatNumberWithSpaces} from "@/src/composables/russianItemForm";
import {PhX} from "@phosphor-icons/vue";

const cartStore = useCartStore();
const props = defineProps<{
  cartItem: CartItem;
}>();
const additionalInfoString = computed(() => {
  if (props.cartItem.additionalInfo) {
    return props.cartItem.additionalInfo.join(" / ");
  }
});
const priceString = computed(() => {
  return formatNumberWithSpaces(props.cartItem.price)
});
const priceStringTotal = computed(() => {
  return formatNumberWithSpaces(props.cartItem.price * props.cartItem.quantity)
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
    <img class="item_img" src="" alt="item_photo" />
    <div class="item__description">
      <span class="item__description--name">{{ props.cartItem.name }}</span>
      <span class="item__description--additional">{{
          additionalInfoString
        }}</span>
      <span class="item__description--id"
      >Артикул: {{ props.cartItem.id }}</span
      >
    </div>
    <div class="item__buttons">
      <button class="item__buttons--minus" @click="decrease">-</button>
      <button class="item__buttons--quantity">
        {{ props.cartItem.quantity }}
      </button>
      <button class="item__buttons--plus" @click="increase">+</button>
      <div class="item__buttons--ppu" v-if="props.cartItem.quantity > 1">
        {{ priceString }} ₽/шт
      </div>
    </div>
    <div class="item__price">{{ priceStringTotal }} ₽</div>
    <ph-x class="item__delete" weight="thin" @click="deleteItem"></ph-x>
  </div>
</template>

<style scoped lang="scss">
.item {
  padding: 0.9375rem 1.25rem;
  height: 10.625rem;
  position: relative;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 2fr 1fr 1fr;
  align-items: center;
  justify-items: center;
  &__img {
    max-width: 6.25rem;
  }
  &__description {
    display: flex;
    flex-direction: column;
    &--name {
      font-weight: 600;
      font-size: 1rem;
      margin-bottom: 0.625rem;
    }
    &--additional {
      font-weight: 400;
      font-size: 0.75rem;
      margin-bottom: 0.625rem;
    }
    &--id {
      color: $font_ghostly;
      font-size: 0.875rem;
    }
  }
  &__buttons {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    justify-content: center;
    & > * {
      padding: 0.3125rem 0.625rem;
      font-size: 0.875rem;
      margin: 0.125rem;
      background: $ui_active;
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
  }
  &__price {
    font-size: 1.125rem;
    font-weight: 500;
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
