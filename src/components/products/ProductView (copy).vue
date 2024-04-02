<template>

  <!-- PRODUCT CARDS -->
  <div class="xl:col-span-10 col-span-12 border border-gray-300 rounded-md p-3">
    <!-- SEARCH -->
    <div
      class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 pb-3 border-b border-dashed  border-gray-300 mb-3">

      <div class="relative">
        <span class="absolute inset-y-0 left-0 pl-3 flex items-center">
          <svg class="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </span>

        <input v-model="searchText"
          class="w-full border border-gray-400 rounded-md pl-10 pr-4 py-2 focus:border-blue-500 focus:outline-none focus:shadow-outline"
          type="text" placeholder="Arama yapabilmek için en az 2 karakter giriniz" value="" />
      </div>

      <div class="text-right mt-5 sm:mt-0">
        <div class="relative inline-block text-left">
          <div>
            <button type="button" @click="this.$store.state.dropOpen = !this.$store.state.dropOpen"
              class="group inline-flex justify-center text-md font-bold text-gray-700 hover:text-gray-900 border  bg-gray-100 rounded-md py-2 px-5"
              id="menu-button" aria-expanded="false" aria-haspopup="true">
              Sırala
              <svg class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" viewBox="0 0 20 20"
                fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clip-rule="evenodd" />
              </svg>
            </button>
          </div>

          <div :class="this.$store.state.dropOpen ? '' : 'hidden'"
            class="absolute px-2 right-0 z-10 mt-2 w-52 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div class="py-1">
              <!--
            Active: "bg-gray-100", Not Active: ""
    
            Selected: "font-medium text-gray-900", Not Selected: "text-gray-500"
          -->
              <a @click="sortType = 'asc'"
                class="text-gray-700 block px-4 py-3 text-md border-b border-gray-300 cursor-pointer">Fiyata
                Göre(Artan)</a>

              <a @click="sortType = 'desc'" class="text-gray-700 block px-4 py-3 text-md cursor-pointer">Fiyata
                Göre(Azalan)</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <section
      class="p-5 md:p-0 gap-10 items-start grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
      <!-- ITEM -->
      <div v-for="(product, index) in items" :key="index"
        class="p-5 py-10 bg-gray-200 text-center transform duration-500 hover:-translate-y-2  rounded-md">
        <img :src="require(`@/assets/${product.url}`)" :alt="product.name" class="mx-auto" />
        <h1 class="text-xl my-5 font-bold">{{ product.name }}</h1>
        <p class="mb-5 min-h-16">{{ product.shortdesc }}</p>
        <h2 class="font-semibold mb-5">{{ $filters.toCurrency(product.price) }}
        </h2>
        <button class="p-2 px-6 bg-gray-800 text-white rounded-md hover:bg-orange-500 transition-all"
          @click="sendToCart(product)">
          Sepete Ekle
        </button>
      </div>
    </section>

    <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 pb-6 pt-12 sm:px-6">
      <div class="flex flex-1 justify-between sm:hidden">
        <a href="#"
          class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</a>
        <a href="#"
          class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a>
      </div>
      <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-gray-700">

            <span class="font-medium">1</span>
            -
            <span class="font-medium">10</span>
            arası
            <span class="font-medium">97</span>
            sonuç gösteriliyor
          </p>
        </div>
        <div>
          <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <a href="#"
              class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
              <span class="sr-only">Previous</span>
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd"
                  d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                  clip-rule="evenodd" />
              </svg>
            </a>
            <!-- Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" -->
            <a href="#" aria-current="page"
              class="relative z-10 inline-flex items-center bg-gray-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">1</a>
            <a href="#"
              class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">2</a>
            <a href="#"
              class="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">3</a>
            <span
              class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">...</span>
            <a href="#"
              class="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">8</a>
            <a href="#"
              class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">9</a>
            <a href="#"
              class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">10</a>
            <a href="#"
              class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
              <span class="sr-only">Next</span>
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clip-rule="evenodd" />
              </svg>
            </a>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      searchText: "",
      sortType: "",
    }
  },
  components: {},

  methods: {
    sendToCart(product) {
      this.$store.commit("cartStore/addToCart", product);
      this.$store.commit("cartStore/updateTotalCount");
      this.$store.commit("cartStore/updateTotalPrice")
    },
    // sorting(type) {
    //   this.sortType = type;
    // }



  },
  computed: {
    ...mapGetters({
      getProductsByCategory: "productStore/getProductsByCategory",
    }),


    filteredProducts: function () {
      let tvFilters = this.$store.state["productStore/tvFilters"];
      let phoneFilters = this.$store.state["productStore/phoneFilters"];
      let consoleFilters = this.$store.state["productStore/consoleFilters"];
      let laptopFilters = this.$store.state["productStore/laptopFilters"];


      if (tvFilters) {
        return this.getProductsByCategory.filter(item => {
          return (tvFilters.hertz.length === 0 || tvFilters.hertz.includes(item.hertz)) &&
            (tvFilters.brand.length === 0 || tvFilters.brand.includes(item.brand))
        })
      } else if (phoneFilters) {
        return this.getProductsByCategory.filter(item => {
          return (phoneFilters.phoneBrand.length === 0 || phoneFilters.phoneBrand.includes(item.brand)) &&
            (phoneFilters.ram.length === 0 || phoneFilters.ram.includes(item.ram))
        })
      } else if (consoleFilters) {
        return this.getProductsByCategory.filter(item => {
          return (consoleFilters.model.length === 0 || consoleFilters.model.includes(item.model)) &&
            (consoleFilters.disc.length === 0 || consoleFilters.disc.includes(item.disc))
        })
      } else if (laptopFilters) {
        return this.getProductsByCategory.filter(item => {
          return (laptopFilters.brand.length === 0 || laptopFilters.brand.includes(item.brand)) &&
            (laptopFilters.cpu.length === 0 || laptopFilters.cpu.includes(item.cpu))
        })
      } else {
        return this.getProductsByCategory
      }
    },


    items: function () {
      if (this.sortType) {
        if (this.sortType == 'desc') {
          return this.filteredProducts.slice().sort((a, b) => { return a.price - b.price })
        } else if (this.sortType == 'asc') {
          return this.filteredProducts.slice().sort((a, b) => { return b.price - a.price })
        }
      }
      let searchText = this.searchText ? this.searchText.toLocaleLowerCase() : null;
      return searchText && searchText.length >= 2 ? this.filteredProducts.filter(p => p.name.toLocaleLowerCase().indexOf(searchText) !== -1) : this.filteredProducts

    }

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped></style>
