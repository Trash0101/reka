<script setup lang="ts">
import { useCartStore } from "@/src/store/cartStore";
import { storeToRefs } from "pinia";
import { computed, ref, watch } from "vue";
import { chooseForm } from "@/src/composables/russianItemForm";
import CartItem from "@/src/components/Cart/CartItem.vue";

const cartStore = await useCartStore();
const { cartItems, totalQuantity, totalPrice, installationStatus } =
    storeToRefs(cartStore);
const cartItemsNaming = computed(() => {
    return chooseForm(totalQuantity);
});
const cleanCart = () => {
    cartStore.clearCart();
};
const selectedAll = ref(false);
const selectionArray = ref(new Array(cartStore.cartItems.length).fill(false));

const selecter = () => {
    if (selectedAll.value) {
        selectionArray.value.forEach((el, index) => {
            selectionArray.value[index] = true;
        });
    } else {
        selectionArray.value.forEach((el, index) => {
            selectionArray.value[index] = false;
        });
    }
};
watch(
    selectionArray,
    () => {
        const checker = selectionArray.value.reduce((acc, el) => {
            return acc && el;
        });
        selectedAll.value = !!checker;
    },
    {
        deep: true,
    }
);
const switchSelection = (index: number) => {
    selectionArray.value[index] = selectionArray.value[index];
};
const executeDeletion = () => {
    cartStore.removeItemCompletelyByIndex(selectionArray.value);
    selectionArray.value = selectionArray.value.filter((el) => el === false);
};
</script>

<template>
    <section class="cart-items">
        <div class="cart-items__header">
            <div class="form-group">
                <input
                    class="form-group__input"
                    @change="selecter"
                    v-model="selectedAll"
                    type="checkbox"
                    id="all"
                />
                <label class="form-group__label" for="all">Выбрать все</label>
            </div>
            <button @click="executeDeletion" class="cart-items__button">
                Удалить выбранные
            </button>
        </div>
        <cart-item
            v-for="(item, index) in cartItems"
            :key="item.id"
            :cart-item="item"
        >
            <div class="item__checkbox">
                <input
                    class="item__checkbox"
                    @click="switchSelection(index)"
                    v-model="selectionArray[index]"
                    type="checkbox"
                    id="all"
                />
                <label class="item__label" for="all"></label>
            </div>
        </cart-item>
    </section>
</template>

<style scoped lang="scss">
.cart-items {
    min-width: 500px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-self: start;
    > *:not(:last-child) {
        border-bottom: solid 0.1rem $font_ghostly;
    }
    margin-bottom: 2.5rem;
    &__header {
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
    }
    &__button {
        text-decoration: underline;
        color: rgb($ui_active, 0.7);
        font-size: 0.75rem;
        line-height: 1.25rem;
        justify-self: end;
        cursor: pointer;
    }
}
.form-group {
    display: flex;
    align-items: center;
    &__label {
        color: rgb($font_main, 0.6);
        font-size: 0.625rem;
        font-weight: 500;
        line-height: 1.0625rem;
        letter-spacing: 1.2px;
        text-align: left;
        text-transform: uppercase;
    }
}

.form-group label:before {
    content: "";
    -webkit-appearance: none;
    background-color: $font_ghostly;
    border: $ui_active;
    border-radius: 2px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
        inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05);
    padding: 10px;
    display: inline-block;
    position: relative;
    vertical-align: middle;
    cursor: pointer;
    margin-right: 5px;
}

.form-group input:checked + label:after {
    content: "";
    display: block;
    position: absolute;
    top: 2px;
    left: 9px;
    width: 6px;
    height: 14px;
    border: solid rgb($ui_active, 0.7);
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
}

.form-group input {
    padding: 0;
    height: initial;
    width: initial;
    margin-bottom: 0;
    display: none;
    cursor: pointer;
}
.form-group label {
    position: relative;
    cursor: pointer;
}
</style>
