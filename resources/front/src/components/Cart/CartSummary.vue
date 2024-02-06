<script setup lang="ts">
import { useCartStore } from "@/src/store/cartStore";
import { computed, ref } from "vue";
import type { CartItem } from "@/src/types/types";
import axios from "axios";
import {
    chooseForm,
    formatNumberWithSpaces,
} from "@/src/composables/russianItemForm";
import { PhCheck, PhX } from "@phosphor-icons/vue";
import { useRouter } from "vue-router";

const router = useRouter();
const cartStore = useCartStore();
const discount = computed(() => {
    return formatNumberWithSpaces(cartStore.totalDiscount);
});
const price = computed(() => {
    return formatNumberWithSpaces(cartStore.totalPrice);
});
const quantity = computed(() => {
    return chooseForm(cartStore.totalQuantity);
});
const priceWithoutDiscount = computed(() => {
    return formatNumberWithSpaces(
        cartStore.totalPrice + cartStore.totalDiscount
    );
});

const sendingForm = ref(false);
const sendRequest = async () => {
    sendingForm.value = !sendingForm.value;
};

const promo = ref("");

const phoneNumber = ref("");
const phoneError = ref(false);
const russianPhoneValid = /^(\+7|8)\s?\(\d{3}\)\s?\d{3}-\d{2}-\d{2}$/;
const phoneValidator = (el: HTMLInputElement) => {
    phoneNumber.value.trim();
    phoneNumber.value = phoneNumber.value.replace(/\D/g, "");
    phoneNumber.value = phoneNumber.value.replace(
        /^(\d{1})?(\d{0,3})?(\d{0,3})?(\d{0,2})?(\d{0,2})?/,
        function (match, p1, p2, p3, p4, p5) {
            let formatted = "+";
            if (p1) formatted += p1;
            if (p2) formatted += ` (${p2}`;
            if (p3) formatted += p3 ? `) ${p3}` : "";
            if (p4) formatted += p4 ? `-${p4}` : "";
            if (p5) formatted += p5 ? `-${p5}` : "";
            return formatted;
        }
    );
    if (phoneNumber.value.length > 18) {
        phoneNumber.value = phoneNumber.value.slice(0, 18);
    }
};
const name = ref("");
const nameValid = /^[А-ЯЁа-яёA-Za-z\s]+$/;
const nameError = ref(false);
const nameValidator = (el: HTMLInputElement) => {
    name.value = name.value.replace(/[^А-ЯЁа-яёA-Za-z\s]/g, "");
};
const email = ref("");
const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const emailError = ref(false);
const emailValidator = (el: HTMLInputElement) => {};
const formComplete = ref(false);
const otherPerson = ref(false);
const submitForm = async () => {
    phoneError.value =
        !russianPhoneValid.test(phoneNumber.value) ||
        phoneNumber.value.length !== 18;
    nameError.value = !nameValid.test(name.value) || name.value === "";
    emailError.value = !emailValid.test(email.value);

    if (!phoneError.value && !nameError.value && !emailError.value) {
        formComplete.value = true;
        const apiBodyItems = cartStore.cartItems.map((el: CartItem) => {
            return {
                id: el.id,
                quantity: el.quantity,
            };
        });
        axios
            .post(
                "example.com/api",
                {
                    items: apiBodyItems,
                    email: email.value,
                    name: name.value,
                    phone: phoneNumber.value,
                    other: otherPerson.value,
                },
                {
                    withCredentials: true,
                }
            )
            .catch((err) => {
                //Выводим ошибку сервера пробуем еще раз и тд
                console.log(err);
            });
        setTimeout(() => {
            cartStore.clearCart();
            router.push("/catalogue");
        }, 3000);
    }
};
</script>

<template>
    <div class="wrapper">
        <section class="summary" :class="{ 'flip--back': sendingForm }">
            <div class="summary__block summary__big">
                <span class="summary__big--left">К оплате</span>
                <span class="summary__big--right">{{ price }} ₽</span>
            </div>
            <div class="summary__block">
                <div class="summary__block--left">{{ quantity }} на сумму</div>
                <div class="summary__block--dots"></div>
                <div class="summary__block--right">
                    {{ priceWithoutDiscount }} ₽
                </div>
            </div>
            <div class="summary__block">
                <div class="summary__block--left">Скидка</div>
                <div class="summary__block--dots"></div>
                <div class="summary__block--right">{{ discount }} ₽</div>
            </div>
            <div class="summary__block">
                <div class="summary__block--left">Доставка</div>
                <div class="summary__block--dots"></div>
                <div class="summary__block--right">0 ₽</div>
            </div>
            <div class="summary__input-wrapper summary__input-wrapper--promo">
                <input
                    class="summary__input summary__input--promo"
                    type="text"
                    placeholder="Ввести промокод"
                    v-model="promo"
                />
            </div>
            <button class="summary__button" @click="sendRequest">
                Оформить заказ
            </button>
        </section>
        <section class="summary--backside" :class="{ flip: sendingForm }">
            <ph-x @click="sendingForm = false" class="summary__x"></ph-x>
            <div class="summary__input-wrapper">
                <label class="summary__label" for="summary--form--number"
                    >Телефон</label
                >
                <input
                    id="summary--form--number"
                    class="summary__input"
                    :class="{ 'summary__input--error': phoneError }"
                    type="tel"
                    placeholder="  +7 (999) 888-77-66"
                    @input="phoneValidator"
                    v-model="phoneNumber"
                />
                <label
                    class="summary__label summary__label--error"
                    v-if="phoneError"
                    for="summary--form--number"
                    >Неправильный номер</label
                >
            </div>
            <div class="summary__input-wrapper">
                <label class="summary__label" for="summary--form--name"
                    >Имя</label
                >
                <input
                    id="summary--form--name"
                    class="summary__input"
                    :class="{ 'summary__input--error': nameError }"
                    type="text"
                    placeholder="  Ваше имя"
                    @input="nameValidator"
                    v-model="name"
                />
                <label
                    class="summary__label summary__label--error"
                    v-if="nameError"
                    for="summary--form--name"
                    >Введите имя</label
                >
            </div>
            <div class="summary__input-wrapper summary__input-wrapper--bottom">
                <label class="summary__label" for="summary--form--email"
                    >E-mail</label
                >
                <input
                    id="summary--form--email"
                    class="summary__input"
                    :class="{ 'summary__input--error': emailError }"
                    type="email"
                    placeholder="  E-mail"
                    @input="emailValidator"
                    v-model="email"
                />
                <label
                    class="summary__label summary__label--error"
                    v-if="emailError"
                    for="summary--form--email"
                    >Введите e-mail</label
                >
            </div>
            <div
                class="summary__input-wrapper summary__input-wrapper--checkbox"
            >
                <input
                    id="summary--form--checkbox"
                    class="summary__input--checkbox"
                    v-model="otherPerson"
                    type="checkbox"
                />
                <label
                    class="summary__label summary__label"
                    for="summary--form--checkbox"
                    >Заказ получит другой человек</label
                >
            </div>
            <button class="summary__button" @click="submitForm">
                Подтвердить заказ
            </button>
        </section>
        <section
            class="summary--backside summary--complete"
            v-if="formComplete"
            :class="{ flip: sendingForm }"
        >
            <div class="thank-you">Спасибо за заказ!</div>
            <ph-check class="thank-you__icon"></ph-check>
        </section>
    </div>
</template>

<style scoped lang="scss">
.wrapper {
    position: relative;
    height: 18.75rem;
    width: 100%;
    perspective: 1000px;
    min-width: 300px;
}
.thank-you {
    font-size: 1.5rem;
    &--icon {
        font-size: 1.5rem;
    }
}

.summary {
    align-self: start;
    padding: 1.5rem 2rem;
    height: 21.875rem;
    width: 100%;
    background-color: rgb($cart_background, 0.5);
    color: rgb($ui_active, 0.8);
    display: flex;
    flex-direction: column;
    border-radius: 0.5rem;
    justify-content: center;
    backface-visibility: hidden;
    transition: all 0.3s ease-out;
    transform-style: preserve-3d;
    perspective: 1000px;
    &--backside {
        perspective: 1000px;
        align-self: start;
        padding: 1.5rem 2rem;
        height: 31.25rem;
        width: 100%;
        left: 0;
        top: 0;
        background-color: rgb($font_main, 0.8);
        color: rgb($ui_active, 0.8);
        display: flex;
        gap: 0.625rem;
        flex-direction: column;
        align-items: center;
        border-radius: 0.5rem;
        justify-content: center;
        backface-visibility: hidden;
        transform-style: preserve-3d;
        overflow: hidden;
        position: absolute;
        transition: all 0.3s ease-out;
        transform: rotateY(180deg);
    }
    &--complete {
        background-color: $font_main;
        z-index: 10;
    }
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
        letter-spacing: 0.0625rem;
        &--line {
            border-bottom: solid 1px $font_ghostly;
        }
        &--dots {
            justify-self: stretch;
            flex-grow: 1;
            border-bottom: dashed 1px rgb($font_main, 0.2);
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
        border-radius: 0.625rem;
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
    &__input {
        width: 100%;
        border-radius: 0.625rem;
        color: $font_ghostly;
        background-color: rgb($font_ghostly, 0.3);
        padding: 1rem 2rem;
        &--checkbox {
            height: 1.25rem;
            border-radius: 0.1875rem;
            border-color: $ui_active;
            margin-right: 0.25rem;
            &:checked {
                color: $font_main;
                background-color: $font_main;
            }
        }
        &--promo {
            align-self: center;
            width: 100%;
            padding: 0.625rem;
            color: rgb($ui_active, 0.3);
            border: solid 2px rgb($ui_active, 0.4);
        }
        &--error {
            border: 1px solid $font_error;
        }
    }
    &__label {
        color: white;
        &--error {
            position: absolute;
            bottom: -1.25rem;
            right: 0;
            color: $font_error;
            font-size: 0.875rem;
            font-weight: 400;
        }
    }
    &__input-wrapper {
        width: 90%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.3125rem;
        position: relative;
        &--checkbox {
            width: 90%;
            flex-direction: row;
            align-items: center;
            justify-items: flex-end;
            margin-bottom: 0.5rem;
        }
        &--promo {
            width: 100%;
            margin-bottom: 1rem;
        }
        &--bottom {
            margin-bottom: 1rem;
        }
    }
    &__x {
        font-size: 1.5rem;
        color: white;
        position: absolute;
        right: 1rem;
        top: 1rem;
        cursor: pointer;
    }
}
.padding--large {
    padding-bottom: 4rem;
}
.flip {
    transform: rotateY(0);
    &--back {
        transform: rotateY(-180deg);
    }
}
</style>
