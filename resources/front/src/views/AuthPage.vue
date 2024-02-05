<script setup lang="ts">



import {ref, inject} from "vue";
import axios from "axios";

import {useRouter} from "vue-router";
import {useCookies} from "vue3-cookies";

const router = useRouter();
const { cookies } = useCookies()

const phoneNumber = ref('')
const phoneError = ref(false)
const russianPhoneValid = /^(\+7|8)\s?\(\d{3}\)\s?\d{3}-\d{2}-\d{2}$/;
const phoneValidator = (el:HTMLInputElement)=> {
  phoneNumber.value.trim()
  phoneNumber.value = phoneNumber.value.replace(/\D/g, '');
  phoneNumber.value = phoneNumber.value.replace(/^(\d{1})?(\d{0,3})?(\d{0,3})?(\d{0,2})?(\d{0,2})?/, function(match, p1, p2, p3, p4, p5) {
    let formatted = '+';
    if (p1) formatted += p1;
    if (p2) formatted += ` (${p2}`;
    if (p3) formatted += p3 ? `) ${p3}` : '';
    if (p4) formatted += p4 ? `-${p4}` : '';
    if (p5) formatted += p5 ? `-${p5}` : '';
    return formatted;
  });
  if(phoneNumber.value.length > 18){
    phoneNumber.value = phoneNumber.value.slice(0,18)
  }
}
const password = ref('')
const passwordError = ref(false)
const serverError = ref(false)
const registerOrAuth = async () => {
  phoneError.value = !russianPhoneValid.test(phoneNumber.value) || phoneNumber.value.length !== 18 || phoneNumber.value[4] !== "9";
  passwordError.value = password.value.length < 6
  console.log(phoneError.value, passwordError.value)
  if(!phoneError.value && !passwordError.value) {
      const res = await axios.post('api/auth/login', {
        phone: phoneNumber.value,
        password: password.value
      }).catch(async (err)=> {
        const resReg = await axios.post('api/auth/register', {
          name: 'Placeholder',
          phone: phoneNumber.value,
          password: password.value,
          password_confirmation: password.value,
        }).catch((errReg)=> {
          serverError.value = true
        })
        cookies?.set('auth', `${resReg.data.access_token}`, '3600s')
        await router.push({
          name: 'catalogue'
        })
      })
    console.log(res)
    cookies?.set('auth', `${res.data.access_token}`, '3600s')
    await router.push({
      name: 'catalogue'
    })
  }
}
</script>

<template>
  <div class="auth">
    <div class="auth__modal">
      <span class="auth__header">Вход или регистрация</span>
      <div class="auth-input">
        <label for="modal__phone" class="auth-input__label">Телефон</label>
        <input id="modal__phone" placeholder="+ 7 (__) ___-__-__" type="tel" @input="phoneValidator" v-model="phoneNumber" class="auth-input__input">
      </div>
      <div class="auth-input">
        <label for="modal__password" class="auth-input__label"></label>
        <input id="modal__password" type="password" placeholder="Пароль" v-model="password" class="auth-input__input">
      </div>
      <div v-if="false" class="auth-input">
        <label for="modal__phone" class="auth-input__label"></label>
        <input id="modal__" type="tel" class="auth-input__input">
      </div>
      <button @click="registerOrAuth" class="auth-input__button">Войти</button>
    </div>
    <div class="auth__backdrop"></div>
  </div>
</template>

<style scoped lang="scss">
.auth {
  &__backdrop{
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgb($ui_active, .5);
    z-index: 2;
  }
  &__modal {
    display: flex;
    flex-direction: column;
    gap: 0.875rem;
    padding: 2rem;
    height: 22.5rem;
    width: 26.25rem;
    border-radius: 0.625rem;
    //background-color: magenta;
    background-color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;
  }
    &__header {
      color: $font_main;
      font-size: 1.25rem;
      font-weight: 700;
    }
}
.auth-input{
  display: flex;
  flex-direction: column;
  &__input{
    border-radius: 0.625rem;
    padding: 0.75rem 1rem;
    color: rgb($ui_active, .7);
    background-color: rgb($font_ghostly, .3);
    border: solid 1px $font_ghostly;

  }
  &__label{
    font-weight: 700;
    font-size: 1rem;
    margin-bottom: 0.375rem;
  }
  &__button{
    margin-top: 2.5rem;
    padding: 0.75rem 1rem;
    background-color: rgb($font_ghostly, .5);
    color: rgb($ui_active, .7);
    font-size: 0.875rem;
    border-radius: 0.625rem;
    @include hover()
  }
}
</style>
