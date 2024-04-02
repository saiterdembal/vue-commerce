import axiosHttp from "@/axios";
import store from "..";

export default {
    namespaced: true,
    state: {
        products: [],
        activatedCatId: "",
        currentPage: null


    },
    getters: {
        getProductsByCategory(state) {
            let currentCatId = store.state["productStore/activatedCatId"];
            if (currentCatId) {
                return state.products.filter(p => p.categoryId == currentCatId)
            }
        },
        getSelectedFilters(state) {
            return state.selectedFilters
        },
        getProducts(state) {
            return state.products;
        }
    },
    mutations: {
        updateProductList(state, product) {
            state.products.push(product);
        },


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
