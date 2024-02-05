<script setup lang="ts">
import {PhCaretDown, PhCaretUp, PhShoppingCart} from "@phosphor-icons/vue";
import {computed, ref} from "vue";
import {useCartStore} from "@/src/store/cartStore";
import {chooseForm, formatNumberWithSpaces} from "@/src/composables/russianItemForm";
const caretDirection = ref(false)
const props = defineProps({
    categories: {
        required: true
    }
})
const caretUp = () => {
    console.log('hi!')
    caretDirection.value = true
}
const caretDown = () => {
    caretDirection.value = false
}
const cartStore = useCartStore()
const cartCount = computed(()=> {
  return chooseForm(cartStore.totalQuantity, true)
})
const cartPrice = computed(()=> {
  return formatNumberWithSpaces(cartStore.totalPrice)
})
</script>
<template>
    <header class="header">
        <div class="header__left">
            <div class="header__logo">Логотип</div>
            <nav class="nav">
                <div @mouseover="caretUp" @mouseleave="caretDown" class="nav__dropdown">
                    <span  class="nav__drop-text">Каталог</span>
                    <ph-caret-down v-if="!caretDirection" class="nav__caret"></ph-caret-down>
                    <ph-caret-up v-else class="nav__caret"></ph-caret-up>
                    <v-menu open-on-hover transition="slide-y-transition" activator="parent" location="bottom">
                        <router-link class="nav__drop-entry" v-for="(value, key) in props.categories" :to="`/catalogue/categories/${key}`">{{value}}</router-link>
                    </v-menu>
                </div>
                <router-link class="nav__link" to="#">Магазины</router-link>
                <router-link class="nav__link" to="#">Акции</router-link>
                <router-link class="nav__link" to="#">Розыгрыш</router-link>
            </nav>
        </div>
        <div class="header__right">
            <router-link to="/cart" class="cart">
                <PhShoppingCart class="cart__icon"></PhShoppingCart>
                <div class="wrapper">
                  <div v-if="cartStore.totalQuantity" class="cart__quantity"><span class="cart__quantity--bold">{{cartStore.totalQuantity}} </span> {{cartCount}}</div>
                  <div v-if="cartStore.totalQuantity" class="cart__price"><span class="cart__price--bold">{{cartPrice}} </span> ₽</div>
                </div>
            </router-link>
        </div>
    </header>
</template>

<style scoped lang="scss">
.header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    &__logo {
        font-size: 2.25rem;
        font-weight: 700;
        padding: 2rem 2.5rem 2rem 0;
    }
    &__left {
        display: flex;
    }
}
.nav {
    width: 20vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 500;
    font-size: 1rem;
    &__dropdown {
        padding: 1rem 1.25rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: .1rem;
    }
    &__drop-entry{
        background-color: white;
        padding: 1rem 1.25rem;
        @include hover;
    }
    &__link {
        padding: 1rem 1.25rem;
        @include hover;
    }
}
.cart{
    display: flex;
    align-items: center;
    gap: 0.125rem;
    @include hover;
    &:active {
      color: $font_main;
    }
    &__icon {
        font-size: 2.25rem;
      margin-right: 0.625rem;
    }
    &__quantity {
      color: $ui_active;
      font-size: 0.875rem;
      &--bold {
        font-size: 1rem;
        color: $font_main;
        font-weight: 700;
      }
    }
  &__price {
    color: $ui_active;
    font-size: 0.875rem;
    &--bold {
      color: $font_main;
      font-size: 1rem;
      font-weight: 700;
    }
  }
}
</style>
