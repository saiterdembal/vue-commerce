<!-- eslint-disable vue/no-mutating-props -->

<template>
    <!-- CART SECTION -->
    <div :class="$store.state.cartOpen
        ? 'translate-x-0 ease-out'
        : 'translate-x-full ease-in'
        "
        class="fixed z-30 bg-white right-0 top-0 max-w-md w-full h-full px-6 py-4 transition duration-300 transform overflow-y-auto border-l-2 border-gray-300 overflow-x-hidden">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div class="fixed inset-0 overflow-hidden">
            <div class="absolute inset-0 overflow-hidden">
                <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
                    <div class="pointer-events-auto w-screen max-w-md">
                        <div class="flex h-full flex-col overflow-y-auto bg-gray-50 shadow-xl">
                            <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                <div class="flex items-start justify-between">
                                    <h2 class="text-lg font-medium text-gray-900" id="slide-over-title">
                                        Sepetinizdeki Ürünler
                                    </h2>
                                    <div class="ml-3 flex h-7 items-center">
                                        <button type="button"
                                            class="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                            @click="$store.state.cartOpen = false">
                                            <span class="absolute -inset-0.5"></span>
                                            <span class="sr-only">Close panel</span>
                                            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                                stroke="currentColor" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <div class="mt-8">
                                    <div class="flow-root">
                                        <ul role="list" class="-my-6 divide-y divide-gray-200">
                                            <li class="flex py-6" v-for="(item, index) in getCartItems" :key="index">
                                                <div
                                                    class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                    <img :src="require('@/assets/' + item.product.url)"
                                                        alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                                                        class="h-full w-full object-cover object-center" />
                                                </div>

                                                <div class="ml-4 flex  justify-between flex-1 flex-col">
                                                    <div>
                                                        <div
                                                            class="flex flex-1 justify-between text-base text-gray-900">
                                                            <h3 class="flex items-center font-bold text-sm">
                                                                {{ item.product.name }}
                                                            </h3>
                                                            <p class="ml-4 font-sm text-sm">
                                                                {{ $filters.toCurrency(item.product.price) }}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div class="flex items-end justify-between text-sm">
                                                        <div class="flex justify-center">
                                                            <button @click="quantityMinus(item)"
                                                                class="rounded-sm text-white text-lg bg-gray-600 hover:bg-gray-700  py-0 px-2">-</button>
                                                            <input maxlength="2" type="text" name="quantity"
                                                                v-model="item.quantity"
                                                                class="border w-10 text-center rounded-sm mx-2 border-gray-400 bg-transparent py-1  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm">
                                                            <button @click="quantityPlus(item)" class=" rounded-sm text-white text-lg
                                                             bg-gray-600 hover:bg-gray-700 py-0
                                                            px-2">+</button>
                                                        </div>


                                                        <div class="flex">
                                                            <button @click="removeToCart(item.product)" type="button"
                                                                class="font-medium text-orange-400 hover:text-orange-600">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                    viewBox="0 0 24 24" stroke-width="1.5"
                                                                    stroke="currentColor" class="w-6 h-6">
                                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>

                                            <!-- More products... -->
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div class="border-t border-gray-200 px-4 py-6  sm:px-6">
                                <div class="text-right text-base font-medium text-gray-900 text-md"
                                    :class="getCartItems.length == 0 ? 'opacity-50' : ''">
                                    <div class="flex justify-between border-b border-gray-300 my-1 p-2">
                                        Toplam :
                                        <span>
                                            {{ $filters.toCurrency(getTotalPrice) }}
                                        </span>
                                    </div>
                                    <div class="flex justify-between border-b border-gray-300 my-1 p-2">
                                        Kdv (%18) : <span>{{ $filters.toCurrency(getTotalPrice * 0.18) }}</span>
                                    </div>
                                    <div class="flex justify-between border-b border-gray-300 my-1 p-2">
                                        <span class="text-red-600">İndirim (%18) :</span>
                                        <span class="text-red-600">- {{ $filters.toCurrency(getTotalPrice * 0.18) }}
                                            ₺</span>
                                    </div>
                                    <hr>
                                    <div class="flex justify-between  my-1 p-2">
                                        GENEL TOPLAM :
                                        <span>{{ $filters.toCurrency(getTotalPrice + getTotalPrice *
        0.18 - getTotalPrice * 0.18) }} ₺</span>
                                    </div>
                                </div>
                                <div class="mt-6">
                                    <button :disabled="getCartItems.length == 0"
                                        :class="getCartItems.length == 0 ? 'opacity-50' : ''"
                                        class="w-full rounded-md border border-transparent bg-gray-700 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800">Satın
                                        Al</button>
                                </div>
                                <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
                                    <p>
                                        veya
                                        <button @click="$store.state.cartOpen = false" type="button"
                                            class="font-medium text-sky-800 hover:text-orange-600">
                                            Alışverişe Devam Et
                                            <span aria-hidden="true"> &rarr;</span>
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- CART SECTION FINISH -->
</template>

<script>
import { mapGetters } from "vuex";

export default {
    data() {
        return {
            isOpen: false,
        };
    },
    methods: {
        quantityPlus(item) {
            this.$store.dispatch("cartStore/cartItemQuantityPlus", item)
        },
        quantityMinus(item) {
            this.$store.dispatch("cartStore/cartItemQuantityMinus", item)
        },
        removeToCart(product) {
            this.$store.commit("cartStore/removeCartItem", product);
            this.$store.commit("cartStore/updateTotalCount", product);
            this.$store.commit("cartStore/updateTotalPrice", product);
        },
    },
    computed: {
        ...mapGetters({
            getCartItems: "cartStore/getCartItems",
            getTotalPrice: "cartStore/getTotalPrice",
        }),
    },
};
</script>

<style></style>
