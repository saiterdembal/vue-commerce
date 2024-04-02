import axiosHttp from "@/axios";


export default {
    namespaced: true,
    state: {
        categories: [],
        filters: [],
        selectedFilters: null


    },
    getters: {
        getCategories(state) {
            return state.categories;
        },
        getFilters(state) {
            return state.filters;
        },
        getSelectedFilters(state) {
            return state.selectedFilters
        }
    },
    mutations: {
        updateCategoryList(state, category) {
            return state.categories.push(category)
        },
        updateFilterList(state, filter) {
            return state.filters.push(filter)
        },

        updateSelectedFilters(state, selected) {
            state.selectedFilters = selected
        }

    },
    actions: {
        initApp({ commit }) {
            axiosHttp.get("/categories")
                .then(response => {
                    let data = response.data
                    for (let i in data) {
                        commit("updateCategoryList", data[i])
                    }
                })

            axiosHttp.get("/filters")
                .then(response => {

                    let data = response.data
                    for (let i in data) {
                        commit("updateFilterList", data[i])

                    }

                })
        },

        actionSelectedFilters({ commit }, selected) {
            commit("updateSelectedFilters", selected)
        }


    }
};
