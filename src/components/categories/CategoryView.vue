<template>
    <div class="xl:col-span-2 hidden xl:block">
        <form>
            <ul role="list"
                class="space-y-2 border border-gray-300 rounded-md p-3 text-md font-medium text-gray-900 list">
                <li class="border-b border-gray-200 pb-3">
                    <h2 class="">
                        <svg class="h-6 w-6 text-sky-800 me-2" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                        </svg>
                        <div class="font-bold text-sky-800 text-md">Kategoriler</div>
                    </h2>
                </li>
                <template v-for="(category, index) in getCategories" :key="index">
                    <li class="nav-item">
                        <routerLink class="p-3 bg-gray-200 rounded-md text-md hover:bg-indigo-200"
                            @click="initSelectedObj(category.filter1, category.filter2)"
                            :to="{ name: 'products', query: { categoryId: category.categoryId } }">
                            <span v-html="category.icon"></span>
                            {{ category.name }}
                        </routerLink>
                    </li>

                </template>


                <ul>
                    <li>
                        <h2 class="mt-8">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="h-6 w-6 text-sky-800 me-2">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>

                            <div class="font-bold text-sky-800 text-nd">Detaylı Arama</div>
                        </h2>


                        <div v-if="selected">
                            <div v-for="(filter) in filters" :key="filter">

                                <template v-if="filter.id == this.$store.state['productStore/activatedCatId']">
                                    <div v-for="(option, optionKey) in filter.select" :key="optionKey"
                                        class="bg-gray-100 mb-0 rounded-md  py-3">
                                        <div
                                            class="mb-3 px-3 flex w-full items-center justify-between bg-gray-200 p-1 text-gray-400 hover:text-gray-500">
                                            <span class="font-medium text-gray-900">{{ optionKey }}</span>
                                        </div>

                                        <div v-for="(item, itemIndex) in option" :key="itemIndex"
                                            class="flex items-center pointer py-1">

                                            <input type="checkbox" :id="item.value + itemIndex" @click="setFilters()"
                                                :value="item.value" v-model="selected[item.type]"
                                                class=" h-4 w-4 rounded border-gray-400 text-orange-500 focus:ring-0">

                                            <label :for="item.value + itemIndex"
                                                class="ml-3 min-w-0 flex-1 text-gray-700">
                                                {{ item.value }}
                                            </label>
                                        </div>
                                        <!-- optionKey, item.value, $event.target.checked -->
                                    </div>
                                </template>
                            </div>
                        </div>

                        <!-- <template v-for="(filter, filterIndex) in  filters" :key="filterIndex">
                            <template v-if="filter.id == this.$store.state['productStore/activatedCatId']">

                                <div class="border bg-gray-100 mt-4 rounded-md"
                                    v-for="(content, contentIndex) in filter.contents" :key="contentIndex">
                                    <div
                                        class="flex w-full items-center justify-between bg-white px-3 py-3 text-gray-400 hover:text-gray-500">
                                        <span class="font-medium text-gray-900">{{ content.name }}</span>
                                    </div>

                                    <div v-for="(list, listIndex) in content.lists" :key="listIndex">
                                        <div class="p-4">
                                            <div class="space-y-6">
                                                <div class="flex items-center pointer">
                                                    <input :id="list.value.replace(/\s+/g, '')" :value="list.value"
                                                        :v-model="`filterProps.${list.key}`" type="checkbox"
                                                        class=" h-4 w-4 rounded border-gray-400 text-orange-500 focus:ring-0">

                                                    <label :for="list.value.replace(/\s+/g, '')"
                                                        class="ml-3 min-w-0 flex-1 text-gray-700">
                                                        {{ list.value }}
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </template>
            </template> -->
                    </li>
                </ul>





                <!-- TELEVISION FILTER MENU -->





                <!-- TELEFON FILTER MENU -->
                <!-- <ul v-if="this.$store.state['productStore/activatedCatId'] == 2">
                    <li>
                        <h2 class="mt-8">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="h-6 w-6 text-sky-800 me-2">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>

                            <div class="font-bold text-sky-800 text-md">Filtreye Göre Ara</div>
                        </h2>

                        <div class="border bg-gray-100 mt-4 rounded-md ">
                            <button type="button"
                                class="flex w-full items-center justify-between bg-white px-3 py-3 text-gray-400 hover:text-gray-500"
                                aria-controls="filter-section-mobile-0" aria-expanded="false">
                                <span class="font-medium text-gray-900">Marka</span>
                            </button>
                            <div>
                                <div class="p-4" id="filter-section-mobile-20">
                                    <div class="space-y-6">
                                        <div class="flex items-center pointer ">
                                            <input id="filter-mobile-color-20" value="Iphone" type="checkbox"
                                                v-model="phoneFilters.phoneBrand" @click="phoneFilterProps()"
                                                class=" h-4 w-4 rounded border-gray-400 text-orange-500 focus:ring-0">

                                            <label for="filter-mobile-color-20"
                                                class="ml-3 min-w-0 flex-1 text-gray-700">Apple</label>
                                        </div>

                                        <div class="flex items-center pointer">
                                            <input id="filter-mobile-color-21" value="Huawei" type="checkbox"
                                                v-model="phoneFilters.phoneBrand" @click="phoneFilterProps()"
                                                class="h-4 w-4 rounded border-gray-400 text-orange-500 focus:ring-0">

                                            <label for="filter-mobile-color-21"
                                                class="ml-3 min-w-0 flex-1 text-gray-700">Huawei</label>
                                        </div>

                                        <div class="flex items-center pointer">
                                            <input id="filter-mobile-color-22" value="Samsung" type="checkbox"
                                                v-model="phoneFilters.phoneBrand" @click="phoneFilterProps()"
                                                class="h-4 w-4 rounded border-gray-400 text-orange-500 focus:ring-0">

                                            <label for="filter-mobile-color-22"
                                                class="ml-3 min-w-0 flex-1 text-gray-700">Samsung</label>
                                        </div>

                                        <div class="flex items-center pointer">
                                            <input id="filter-mobile-color-23" value="Redmi" type="checkbox"
                                                v-model="phoneFilters.phoneBrand" @click="phoneFilterProps()"
                                                class="h-4 w-4 rounded border-gray-400 text-orange-500 focus:ring-0">

                                            <label for="filter-mobile-color-23"
                                                class="ml-3 min-w-0 flex-1 text-gray-700">Redmi</label>
                                        </div>

                                        <div class="flex items-center pointer">
                                            <input id="filter-mobile-color-24" value="Xiaomi" type="checkbox"
                                                v-model="phoneFilters.phoneBrand" @click="phoneFilterProps()"
                                                class="h-4 w-4 rounded border-gray-400 text-orange-500 focus:ring-0">

                                            <label for="filter-mobile-color-24"
                                                class="ml-3 min-w-0 flex-1 text-gray-700">Xiaomi</label>
                                        </div>


                                        <div class="flex items-center pointer">
                                            <input id="filter-mobile-color-25" value="Oppo" type="checkbox"
                                                v-model="phoneFilters.phoneBrand" @click="phoneFilterProps()"
                                                class="h-4 w-4 rounded border-gray-400 text-orange-500 focus:ring-0">

                                            <label for="filter-mobile-color-25"
                                                class="ml-3 min-w-0 flex-1 text-gray-700">Oppo</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>


                        <div class="border bg-gray-100 mt-4 rounded-md">
                            <button type="button"
                                class="flex w-full items-center justify-between bg-white px-3 py-3 text-gray-400 hover:text-gray-500"
                                aria-controls="filter-section-mobile-0" aria-expanded="false">
                                <span class="font-medium text-gray-900">Ram Kapasitesi</span>
                            </button>
                            <div>
                                <div class="p-4" id="filter-section-mobile-0">
                                    <div class="space-y-6">
                                        <div class="flex items-center pointer">

                                            <input id="filter-mobile-color-26" value="4" type="checkbox"
                                                v-model="phoneFilters.ram" @click="phoneFilterProps()"
                                                class="h-4 w-4 rounded border-gray-400 text-orange-500 focus:ring-0">

                                            <label for="filter-mobile-color-26"
                                                class="ml-3 min-w-0 flex-1 text-gray-700">4 GB</label>
                                        </div>

                                        <div class="flex items-center pointer">
                                            <input id="filter-mobile-color-27" value="6" type="checkbox"
                                                v-model="phoneFilters.ram" @click="phoneFilterProps()"
                                                class="h-4 w-4 rounded border-gray-400 text-orange-500 focus:ring-0">

                                            <label for="filter-mobile-color-27"
                                                class="ml-3 min-w-0 flex-1 text-gray-700">6 GB</label>
                                        </div>

                                        <div class="flex items-center pointer">
                                            <input id="filter-mobile-color-28" value="8" type="checkbox"
                                                v-model="phoneFilters.ram" @click="phoneFilterProps()"
                                                class="h-4 w-4 rounded border-gray-400 text-orange-500 focus:ring-0">

                                            <label for="filter-mobile-color-28"
                                                class="ml-3 min-w-0 flex-1 text-gray-700">8 GB</label>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>


                    </li>
                </ul> -->



                <!-- OYUN  KONSOLU MENU -->
                <!-- <ul v-if="this.$store.state['productStore/activatedCatId'] == 3">
                    <li>
                        <h2 class="mt-8">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="h-6 w-6 text-sky-800 me-2">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>

                            <div class="font-bold text-sky-800 text-md">Filtreye Göre Ara</div>
                        </h2>

                        <div class="border bg-gray-100 mt-4 rounded-md ">
                            <button type="button"
                                class="flex w-full items-center justify-between bg-white px-3 py-3 text-gray-400 hover:text-gray-500"
                                aria-controls="filter-section-mobile-0" aria-expanded="false">
                                <span class="font-medium text-gray-900">Model</span>
                            </button>
                            <div>
                                <div class="p-4" id="filter-section-mobile-20">
                                    <div class="space-y-6">
                                        <div class="flex items-center pointer">
                                            <input id="filter-mobile-color-20" value="Playstation5" type="checkbox"
                                                v-model="consoleFilters.model" @click="consoleFilterProps()"
                                                class=" h-4 w-4 rounded border-gray-400 text-orange-500 focus:ring-0">

                                            <label for="filter-mobile-color-20"
                                                class="ml-3 min-w-0 flex-1 text-gray-700">Playstation
                                                5</label>
                                        </div>

                                        <div class="flex items-center pointer">
                                            <input id="filter-mobile-color-22" value="Playstation4" type="checkbox"
                                                v-model="consoleFilters.model" @click="consoleFilterProps()"
                                                class="h-4 w-4 rounded border-gray-400 text-orange-500 focus:ring-0">

                                            <label for="filter-mobile-color-22"
                                                class="ml-3 min-w-0 flex-1 text-gray-700">Playstation
                                                4</label>
                                        </div>

                                        <div class="flex items-center pointer">
                                            <input id="filter-mobile-color-21" value="XBoxSeriesX" type="checkbox"
                                                v-model="consoleFilters.model" @click="consoleFilterProps()"
                                                class="h-4 w-4 rounded border-gray-400 text-orange-500 focus:ring-0">

                                            <label for="filter-mobile-color-21"
                                                class="ml-3 min-w-0 flex-1 text-gray-700">XBox Series
                                                X</label>
                                        </div>



                                        <div class="flex items-center pointer">
                                            <input id="filter-mobile-color-23" value="XBOXSeriesS" type="checkbox"
                                                v-model="consoleFilters.model" @click="consoleFilterProps()"
                                                class="h-4 w-4 rounded border-gray-400 text-orange-500 focus:ring-0">

                                            <label for="filter-mobile-color-23"
                                                class="ml-3 min-w-0 flex-1 text-gray-700">XBox Series
                                                S</label>
                                        </div>


                                    </div>
                                </div>
                            </div>

                        </div>


                        <div class="border bg-gray-100 mt-4 rounded-md">
                            <button type="button"
                                class="flex w-full items-center justify-between bg-white px-3 py-3 text-gray-400 hover:text-gray-500"
                                aria-controls="filter-section-mobile-0" aria-expanded="false">
                                <span class="font-medium text-gray-900">Hafıza</span>
                            </button>
                            <div>
                                <div class="p-4" id="filter-section-mobile-0">
                                    <div class="space-y-6">
                                        <div class="flex items-center pointer">

                                            <input id="filter-mobile-color-26" value="512GB" type="checkbox"
                                                v-model="consoleFilters.disc" @click="consoleFilterProps()"
                                                class="h-4 w-4 rounded border-gray-400 text-orange-500 focus:ring-0">

                                            <label for="filter-mobile-color-26"
                                                class="ml-3 min-w-0 flex-1 text-gray-700">512 GB</label>
                                        </div>

                                        <div class="flex items-center pointer">
                                            <input id="filter-mobile-color-28" value="825GB" type="checkbox"
                                                v-model="consoleFilters.disc" @click="consoleFilterProps()"
                                                class="h-4 w-4 rounded border-gray-400 text-orange-500 focus:ring-0">

                                            <label for="filter-mobile-color-28"
                                                class="ml-3 min-w-0 flex-1 text-gray-700">825 GB</label>
                                        </div>

                                        <div class="flex items-center pointer">
                                            <input id="filter-mobile-color-27" value="1TB" type="checkbox"
                                                v-model="consoleFilters.disc" @click="consoleFilterProps()"
                                                class="h-4 w-4 rounded border-gray-400 text-orange-500 focus:ring-0">

                                            <label for="filter-mobile-color-27"
                                                class="ml-3 min-w-0 flex-1 text-gray-700">1 TB</label>
                                        </div>



                                    </div>
                                </div>
                            </div>

                        </div>


                    </li>
                </ul> -->



                <!-- LAPTOP FILTER MENU -->
                <!-- <ul v-if="this.$store.state['productStore/activatedCatId'] == 4">
                    <li>
                        <h2 class="mt-8">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="h-6 w-6 text-sky-800 me-2">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>

                            <div class="font-bold text-sky-800 text-md">Filtreye Göre Ara</div>
                        </h2>

                        <div class="border bg-gray-100 mt-4 rounded-md ">
                            <button type="button"
                                class="flex w-full items-center justify-between bg-white px-3 py-3 text-gray-400 hover:text-gray-500"
                                aria-controls="filter-section-mobile-0" aria-expanded="false">
                                <span class="font-medium text-gray-900">Marka</span>
                            </button>
                            <div>
                                <div class="p-4" id="filter-section-mobile-20">
                                    <div class="space-y-6">

                                        <div class="flex items-center pointer">
                                            <input id="filter-mobile-color-20" value="Apple" type="checkbox"
                                                v-model="laptopFilters.brand" @click="laptopFilterProps()"
                                                class=" h-4 w-4 rounded border-gray-400 text-orange-500 focus:ring-0">

                                            <label for="filter-mobile-color-20"
                                                class="ml-3 min-w-0 flex-1 text-gray-700">Apple</label>
                                        </div>

                                        <div class="flex items-center pointer">
                                            <input id="filter-mobile-color-22" value="Asus" type="checkbox"
                                                v-model="laptopFilters.brand" @click="laptopFilterProps()"
                                                class="h-4 w-4 rounded border-gray-400 text-orange-500 focus:ring-0">

                                            <label for="filter-mobile-color-22"
                                                class="ml-3 min-w-0 flex-1 text-gray-700">Asus</label>
                                        </div>

                                        <div class="flex items-center pointer">
                                            <input id="filter-mobile-color-23" value="Acer" type="checkbox"
                                                v-model="laptopFilters.brand" @click="laptopFilterProps()"
                                                class="h-4 w-4 rounded border-gray-400 text-orange-500 focus:ring-0">

                                            <label for="filter-mobile-color-23"
                                                class="ml-3 min-w-0 flex-1 text-gray-700">Acer</label>
                                        </div>

                                        <div class="flex items-center pointer">
                                            <input id="filter-mobile-color-24" value="Msi" type="checkbox"
                                                v-model="laptopFilters.brand" @click="laptopFilterProps()"
                                                class="h-4 w-4 rounded border-gray-400 text-orange-500 focus:ring-0">

                                            <label for="filter-mobile-color-24"
                                                class="ml-3 min-w-0 flex-1 text-gray-700">MSI</label>
                                        </div>


                                        <div class="flex items-center pointer">
                                            <input id="filter-mobile-color-25" value="Monster" type="checkbox"
                                                v-model="laptopFilters.brand" @click="laptopFilterProps()"
                                                class="h-4 w-4 rounded border-gray-400 text-orange-500 focus:ring-0">

                                            <label for="filter-mobile-color-25"
                                                class="ml-3 min-w-0 flex-1 text-gray-700">Monster</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>


                        <div class="border bg-gray-100 mt-4 rounded-md">
                            <button type="button"
                                class="flex w-full items-center justify-between bg-white px-3 py-3 text-gray-400 hover:text-gray-500"
                                aria-controls="filter-section-mobile-0" aria-expanded="false">
                                <span class="font-medium text-gray-900">İşlemci</span>
                            </button>
                            <div>
                                <div class="p-4" id="filter-section-mobile-0">
                                    <div class="space-y-6">
                                        <div class="flex items-center pointer">

                                            <input id="filter-mobile-color-26" value="i7" type="checkbox"
                                                v-model="laptopFilters.cpu" @click="laptopFilterProps()"
                                                class="h-4 w-4 rounded border-gray-400 text-orange-500 focus:ring-0">

                                            <label for="filter-mobile-color-26"
                                                class="ml-3 min-w-0 flex-1 text-gray-700">i7</label>
                                        </div>

                                        <div class="flex items-center pointer">
                                            <input id="filter-mobile-color-27" value="i5" type="checkbox"
                                                v-model="laptopFilters.cpu" @click="laptopFilterProps()"
                                                class="h-4 w-4 rounded border-gray-400 text-orange-500 focus:ring-0">

                                            <label for="filter-mobile-color-27"
                                                class="ml-3 min-w-0 flex-1 text-gray-700">i5</label>
                                        </div>

                                        <div class="flex items-center pointer">
                                            <input id="filter-mobile-color-28" value="i3" type="checkbox"
                                                v-model="laptopFilters.cpu" @click="laptopFilterProps()"
                                                class="h-4 w-4 rounded border-gray-400 text-orange-500 focus:ring-0">

                                            <label for="filter-mobile-color-28"
                                                class="ml-3 min-w-0 flex-1 text-gray-700">i3</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>


                    </li>
                </ul> -->

            </ul>
        </form>
    </div>






</template>

<script>

import { mapGetters } from "vuex";

export default {
    data() {
        return {
            dropCollapse: false,
            filterProps: {},
            selected: {

            },

        };
    },
    methods: {
        initSelectedObj(filter1, filter2) {
            this.selected = {}
            setTimeout(() => {
                this.selected[filter1] = [],
                    this.selected[filter2] = []
                // for (let filter of catFilters) {
                //     for (let [key] of Object.entries(catFilters)) {
                //         this.selected[key] = [];
                //     }
                // }

            }, 200);


        },
        setFilters() {
            setTimeout(() => {
                this.$store.dispatch("categoryStore/actionSelectedFilters", this.selected)
            }, 300);


        }
    },
    created() {
        this.initSelectedObj("Marka", "Hertz")
    },


    computed: {
        ...mapGetters({
            getCategories: "categoryStore/getCategories",
            filters: "categoryStore/getFilters",
            getProductsByCategory: "productStore/getProductsByCategory"
        }),


    },

    watch: {
        $route(newRouteValue) {
            this.$store.state["productStore/activatedCatId"] = newRouteValue.query.categoryId;
        },
        selected() {
            this.setFilters()
        }



    }

};
</script>

<style scope>
.pointer,
.pointer *:hover {
    cursor: pointer !important;
}
</style>