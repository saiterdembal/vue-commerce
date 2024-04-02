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

        <div class="flex rounded-lg shadow-sm">
          <input v-model.lazy="searchText" @keypress.enter="sortType = 'search'" type="text"
            id="hs-trailing-button-add-on-with-icon" name="hs-trailing-button-add-on-with-icon"
            class="py-3 px-10 block w-full border-gray-200 shadow-sm rounded-s-lg text-md focus:outline-none focus:ring-0 h-[3rem]"
            placeholder="Ürün arama...">
          <button type="button" @click="sortType = 'search'"
            class="w-[2.875rem] h-[3rem] flex-shrink-0 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-e-md border border-transparent bg-gray-600 text-white hover:bg-gray-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
            <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </button>
        </div>

      </div>

      <div class="text-right mt-5 sm:mt-0">
        <div class="relative inline-block text-left">
          <div>
            <button type="button"
              @click="this.$store.state.dropOpen = !this.$store.state.dropOpen, this.searchText = ''"
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
              <a @click="sortType = 'asc', this.$store.state.dropOpen = false"
                class="text-gray-700 block px-4 py-3 text-md border-b border-gray-300 cursor-pointer">Fiyata
                Göre(Artan)</a>

              <a @click="sortType = 'desc', this.$store.state.dropOpen = false"
                class="text-gray-700 block px-4 py-3 text-md cursor-pointer">Fiyata
                Göre(Azalan)</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template v-if="this.items.length == 0">
      <div class="bg-gray-100 p-2 w-full">Ürün bulunamadı</div>
    </template>
    <template v-else>
      <section
        class="p-5 md:p-0 gap-10 items-start grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        <!-- ITEM -->
        <div v-for="(product, id) in items" :key="id"
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
    </template>




    <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 pb-6 pt-12 sm:px-6">
      <div class="example-five w-full">
        <vue-awesome-paginate :total-items="getProductsByCategory.length" v-model="currentPage"
          :items-per-page="perPage" :max-pages-shown="5" :show-breakpoint-buttons="true" :show-jump-buttons="true" />
      </div>

      <!-- <div class="flex flex-1 justify-between sm:hidden">
        <a href="#"
          class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</a>
        <a href="#"
          class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a>
      </div>
      <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-gray-700">

            <span class="font-medium">0</span>
            -
            <span class="font-medium">0</span>
            arası
            <span class="font-medium">0</span>
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
      </div> -->
    </div>


  </div>
</template>

<script>
import { ref } from "vue";
import { mapGetters } from "vuex";
export default {

  data() {
    const currentPage = ref(1);
    return {
      searchText: "",
      sortType: "",
      arrFilters: [],
      currentPage,
      perPage: 6
    }
  },
  components: {},

  methods: {
    sendToCart(product) {
      this.$store.commit("cartStore/addToCart", product);
      this.$store.commit("cartStore/updateTotalCount");
      this.$store.commit("cartStore/updateTotalPrice")
    },

    // getFilterKeys() {
    //   for (let [key, index] of Object.entries(this.filters.select)) {
    //     console.log(key[index])
    //   }
    // }
    // sorting(type) {
    //   this.sortType = type;
    // }



  },
  computed: {
    ...mapGetters({
      getProductsByCategory: "productStore/getProductsByCategory",
      getSelectedFilters: "categoryStore/getSelectedFilters",
      filters: "categoryStore/getFilters",
    }),



    filteredProducts: function () {
      let keyArr = []

      if (this.getSelectedFilters != null) {
        for (let [key] of Object.entries(this.getSelectedFilters)) {
          keyArr.push(key)
        }
        return this.getProductsByCategory.filter(item => {
          return (this.getSelectedFilters[keyArr[0]].length === 0 || this.getSelectedFilters[keyArr[0]].includes(item[keyArr[0]])) &&
            (this.getSelectedFilters[keyArr[1]].length === 0 || this.getSelectedFilters[keyArr[1]].includes(item[keyArr[1]]))
        })
      } else {
        return this.getProductsByCategory
      }
    },

    pagination: function () {
      const startIndex = this.perPage * (this.currentPage - 1);
      const endIndex = startIndex + this.perPage;
      return this.getProductsByCategory.slice(startIndex, endIndex);
    },


    items: function () {
      if (this.sortType == 'desc') {
        return this.filteredProducts.slice().sort((a, b) => { return a.price - b.price })
      } else if (this.sortType == 'asc') {
        return this.filteredProducts.slice().sort((a, b) => { return b.price - a.price })
      } else {
        let searchText = this.searchText ? this.searchText.toLocaleLowerCase() : null;
        return searchText && searchText.length >= 2 ? this.filteredProducts.filter(p => p.name.toLocaleLowerCase().indexOf(searchText) !== -1) : this.filteredProducts
      }
    }



  },
  watch: {
    filteredProducts() {
      this.searchText = ""
    },


  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style>
.pagination-container {
  background-color: #f0f0f0;
  border-radius: 5px;
  padding: 10px 0px;
  justify-content: center;
  display: flex !important;
}

.example-five .paginate-buttons {
  width: 40px;
  height: 40px;
  margin-inline: 5px;
  cursor: pointer;
  border: none;
  background-color: #d4d4d4;
  border-radius: 2px;
  border-radius: 5px
}

.example-five .back-button {
  width: 70px;
}

.example-five .next-button {

  width: 70px;
}

.example-five .back-button svg {
  transform: rotate(180deg);
}

.example-five .active-page {
  background-color: rgb(31 41 55);
  color: #fff;
}

.example-five .paginate-buttons:hover {
  background-color: #e5e5e5;
}

.example-five .active-page:hover {
  background-color: rgb(249 115 22);
  color: #fff;
}

.example-five .back-button:active,
.example-five .next-button:active {
  background-color: #dedede;
}
</style>
