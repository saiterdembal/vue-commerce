<!-- eslint-disable vue/no-mutating-props -->
<template>
  <header class="bg-gray-100 border-b border-gray-300 fixed top-0 start-0 z-50 w-full">
    <div class="container mx-auto px-6 py-3">
      <div class="sm:flex sm:items-center sm:justify-between">
        <div class="text-2xl font-semibold sm:flex items-center justify-start w-6/12 h-16 inline-flex">
          <span class="text-orange-500">Waffy</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
          <span class="text-sky-800">Shop</span>
        </div>

        <div class="sm:flex items-center justify-end sm:w-6/12 inline-flex float-right sm:float-none">
          <button @click="cartPanel()"
            class="focus:outline-none mx-4 sm:mx-0 bg-gray-700 py-3 px-6 hover:bg-orange-400 text-white rounded-md transition-all flex items-center">

            <svg class="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              viewBox="0 0 24 24" stroke="currentColor">
              <path
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z">
              </path>
            </svg>
            <span class="text-sm ms-1">({{ getTotalCount }})</span>
          </button>

          <div class="flex sm:hidden">
            <button @click="isOpen = !isOpen" type="button"
              class="text-gray-600 focus:outline-none focus:text-white bg-gray-200 py-3 px-6 hover:bg-orange-400 hover:text-white transition-all rounded-md"
              aria-label="toggle menu">
              <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-linecap="round"
                stroke-linejoin="round">
                <path fill-rule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z">
                </path>
              </svg>
            </button>
          </div>
        </div>

        <cart-view></cart-view>

        <!-- <nav :class="isOpen ? '' : 'hidden'" class="sm:flex sm:justify-end sm:items-center sm:ms-10">
          <div class="flex flex-col sm:flex-row">
            <router-link class="mt-3 text-gray-700 sm:mx-1 sm:mt-0 py-2 px-4 rounded-md transition-all" to="/">
              Home
            </router-link>

            <router-link class="mt-3 text-gray-700 sm:mx-1 sm:mt-0 py-2 px-4 rounded-md transition-all" to="/about">
              About
            </router-link>

          </div>
        </nav> -->
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';
import store from '../store'
import cartView from '../components/cart/cartView'
export default {

  data() {

    return {
      isOpen: false,
    };
  },
  computed: {
    ...mapGetters({
      getCartDisplay: "cartStore/getCartDisplay",
      getTotalCount: "cartStore/getTotalCount"
    }),
  },
  methods: {
    cartPanel() {
      store.state.cartOpen = true
    }
  },
  components: {
    cartView,
  }


};
</script>

<style></style>
