import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { APIres, CartItem, CartStorageItem, Item } from "../types/types";
import axios from "axios";

export const useCartStore = defineStore("cart", () => {
    const cartItems = ref<CartItem[]>([]);
    const totalPrice = computed(() => {
        let acc = 0;
        cartItems.value.forEach((el) => {
            acc += el.price * el.quantity;
        });
        return acc;
    });
    const totalQuantity = computed(() => {
        let acc = 0;
        cartItems.value.forEach((el) => {
            acc += el.quantity;
        });
        return acc;
    });
    const totalDiscount = computed(() => {
        let acc = 0;
        cartItems.value.forEach((el) => {
            if (el.price_old) {
                acc += el.price_old * el.quantity;
            }
        });
        return acc;
    });
    const cartLocalStorage = () => {
        const cartStorage: CartStorageItem[] = [];
        cartItems.value.forEach((el) => {
            cartStorage.push({
                id: el.id,
                quantity: el.quantity,
            });
        });
        localStorage.setItem("cart", JSON.stringify(cartStorage));
    };
    const cartLocalStorageRestore = async () => {
        const storageCart = localStorage.getItem("cart");
        if (storageCart) {
            const parsed = JSON.parse(storageCart);
            for (const el of parsed) {
                try {
                    const page = Math.floor(el.id / 9);
                    const res = await axios.get<APIres>("/api/products/", {
                        params: {
                            page: page,
                        },
                    });
                    const returnedItem = res.data.data.find((innerEl) => {
                        return innerEl.id === el.id;
                    });
                    if (!returnedItem) {
                        throw new Error("Cart item not found");
                    } else {
                        addToCart(returnedItem, el.quantity);
                    }
                } catch (err) {
                    return false;
                }
            }
        }
    };
    const addToCart = (item: Item, quantity: number = 1) => {
        const index = cartItems.value.findIndex((el) => {
            return item.id === el.id;
        });
        if (index === -1) {
            const cartPush: CartItem = {
                name: item.title,
                img: "placeholder",
                id: item.id,
                price: item.price,
                price_old: item.price_old,
                quantity,
            };
            if (item.price_old) {
                cartPush.salePercentage = Math.round(
                    ((item.price_old - item.price) / item.price_old) * 100
                );
            }
            cartItems.value.push(cartPush);
        } else {
            cartItems.value[index].quantity++;
        }
        cartLocalStorage();
    };
    const removeFromCart = (id: number) => {
        const index = cartItems.value.findIndex((el) => {
            return id === el.id;
        });
        if (index === -1) {
            return false;
        } else {
            if (cartItems.value[index].quantity === 1) {
                cartItems.value.splice(index, 1);
            } else {
                cartItems.value[index].quantity--;
            }
        }
        cartLocalStorage();
    };
    const removeItemCompletely = (id: number) => {
        const index = cartItems.value.findIndex((el) => {
            return id === el.id;
        });
        if (index === -1) {
            return false;
        } else {
            cartItems.value.splice(index, 1);
        }
        cartLocalStorage();
    };
    const removeItemCompletelyByIndex = (selection: number[]) => {
        cartItems.value = cartItems.value.filter((el, index) => {
            return !selection[index];
        });
        cartLocalStorage();
    };
    const checkExistenceById = (id: number) => {
        const index = cartItems.value.findIndex((el) => {
            return el.id === id;
        });
        if (index === -1) {
            return false;
        } else {
            return index;
        }
    };
    const clearCart = () => {
        cartItems.value = [];
        localStorage.removeItem("cart");
    };
    return {
        cartItems,
        totalPrice,
        totalQuantity,
        totalDiscount,
        cartLocalStorage,
        cartLocalStorageRestore,
        addToCart,
        removeFromCart,
        removeItemCompletely,
        removeItemCompletelyByIndex,
        clearCart,
        checkExistenceById,
    };
});
