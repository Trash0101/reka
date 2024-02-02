import {defineStore} from "pinia";
import {computed, ref} from "vue";
import type {CartItem, CartStorageItem, Item} from "../types/types";

export const useCartStore = defineStore('cart', ()=> {
        const cartItems = ref<CartItem[]>([])
        const totalPrice = computed(()=>{
            let acc = 0;
            cartItems.value.forEach((el)=>{
                acc += el.price * el.quantity
            })
            return acc
        })
        const cartLocalStorage = ()=> {
            const cartStorage:CartStorageItem[] = []
            cartItems.value.forEach((el)=> {
                cartStorage.push({
                    id: el.id,
                    quantity: el.quantity,
                })
            })
            localStorage.setItem('cart', JSON.stringify(cartStorage))
        }
        const addToCart = (item:Item) => {
            const index = cartItems.value.findIndex((el)=> {
                return item.id === el.id
            })
            if(index === -1) {
                const cartPush:CartItem = {
                    id: item.id,
                    price: item.price,
                    priceOld: item.priceOld,
                    quantity: 1,
                }
                if(item.priceOld) {
                    cartPush.salePercentage = ((item.priceOld - item.price) / item.priceOld) * 100
                }
                cartItems.value.push(cartPush)
            } else {
                cartItems.value[index].quantity++
            }
        }
        const clearCart = () => {

        }
})
