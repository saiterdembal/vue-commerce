import { createStore } from "vuex";
import category from "./category";
import product from "./product";
import cart from "./cart"

const store = createStore({
  state: {
    cartOpen: false,
    dropOpen: false,
    sort: ''

  },
  getters: {
  },
  mutations: {},
  actions: {},
  modules: {
    categoryStore: category,
    productStore: product,
    cartStore: cart,
  },
});

export default store;
