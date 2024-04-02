import axiosHttp from "@/axios";
import store from "..";

export default {
    namespaced: true,
    state: {
        products: [],
        activatedCatId: "",
        newProducts: [],
        tvFilters: {},
    },
    getters: {
        getProductsByCategory(state) {
            let currentCatId = store.state["productStore/activatedCatId"];
            if (currentCatId) {
                return state.products.filter(p => p.categoryId == currentCatId)
            }
        },


        getProducts(state) {
            return state.products;
        },








        // getProducts(state) {
        //     return state.products;
        // }
    },
    mutations: {
        updateProductList(state, product) {
            state.products.push(product);
        },


        filteredProducts(state) {
            let filteredProducts = {}

            let tvFilters = this.$store.state["productStore/tvFilters"];

            let phoneFilters = this.$store.state["productStore/phoneFilters"];
            let consoleFilters = this.$store.state["productStore/consoleFilters"];
            let laptopFilters = this.$store.state["productStore/laptopFilters"];


            if (tvFilters) {
                filteredProducts = state.products.filter(item => {
                    (tvFilters.hertz.length === 0 || tvFilters.hertz.includes(item.hertz)) &&
                        (tvFilters.brand.length === 0 || tvFilters.brand.includes(item.brand))
                })

            }

            else if (phoneFilters) {
                filteredProducts = state.products.filter(item => {
                    (phoneFilters.phoneBrand.length === 0 || phoneFilters.phoneBrand.includes(item.brand)) &&
                        (phoneFilters.ram.length === 0 || phoneFilters.ram.includes(item.ram))
                })
            }
            else if (consoleFilters) {
                filteredProducts = state.products.filter(item => {
                    (consoleFilters.model.length === 0 || consoleFilters.model.includes(item.model)) &&
                        (consoleFilters.disc.length === 0 || consoleFilters.disc.includes(item.disc))
                })

            }
            else if (laptopFilters) {
                filteredProducts = state.products.filter(item => {
                    (laptopFilters.brand.length === 0 || laptopFilters.brand.includes(item.brand)) &&
                        (laptopFilters.cpu.length === 0 || laptopFilters.cpu.includes(item.cpu))
                })
            }

            state.products = filteredProducts;
        },


        // items(state) {
        //     if (this.sortType) {
        //         if (this.sortType == 'desc') {
        //             return state.products.slice().sort((a, b) => { return a.price - b.price })
        //         } else if (this.sortType == 'asc') {
        //             return state.products.slice().sort((a, b) => { return b.price - a.price })
        //         } else {
        //             return state.products
        //         }
        //     }
        // },

        search(state, searchValue) {
            let searchText = searchValue ? searchValue.toLocaleLowerCase() : null;
            state.products = searchText && searchText.length >= 2 ? state.products.filter(p => p.name.toLocaleLowerCase().indexOf(searchText) !== -1) : state.products
        }




    },
    actions: {
        initApp({ commit }) {
            axiosHttp.get("/products")
                .then(response => {
                    let data = response.data
                    for (let i in data) {
                        commit("updateProductList", data[i])
                    }
                })
        },
        // YADA 
        // initApp({ commit }) {
        //     axiosHttp.get("/products")
        //         .then(response => {
        //             response.data.filter(product => commit("updateProductList", product))
        //         })
        // },
    }
};
