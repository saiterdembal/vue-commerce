
export default {
    namespaced: true,
    state: {
        cartItemList: [],
        totalItemCount: 0,
        totalItemPrice: 0
    },
    getters: {
        getCartItems(state) {
            return state.cartItemList
        },
        getTotalCount(state) {
            return state.totalItemCount
        },
        getTotalPrice(state) {
            return state.totalItemPrice
        }
    },
    mutations: {
        addToCart(state, product) {
            let cartItem = {}
            let addedItem = state.cartItemList.find(item => item.product.id == product.id);
            if (addedItem) {
                addedItem.quantity += 1;
            } else {
                cartItem.product = product;
                cartItem.quantity = 1;
                state.cartItemList.push(cartItem)
            }
        },
        updateTotalCount(state) {
            state.totalItemCount = state.cartItemList.reduce((a, b) => a + b.quantity, 0)
        },
        updateTotalPrice(state) {
            state.totalItemPrice = state.cartItemList.reduce((a, b) => a + b.quantity * b.product.price, 0)
        },
        removeCartItem(state, product) {
            let addedItem = state.cartItemList.find(item => item.product.id == product.id);
            let indexNo = state.cartItemList.indexOf(addedItem);
            if (indexNo !== -1) {
                state.cartItemList.splice(indexNo, 1)
            }
        },



        // removeToCart(state, product) {

        // }
    },
    actions: {
        cartItemQuantityPlus({ commit, state }, cartItem) {
            let currentCartItem = state.cartItemList.find(item => item.product.id == cartItem.product.id);
            if (currentCartItem.quantity < 99) {
                currentCartItem.quantity += 1;
            }
            commit("updateTotalCount");
            commit("updateTotalPrice");
        },

        cartItemQuantityMinus({ commit, state }, cartItem) {
            let currentCartItem = state.cartItemList.find(item => item.product.id == cartItem.product.id);
            if (currentCartItem.quantity > 1) {
                currentCartItem.quantity -= 1;
            }

            commit("updateTotalCount");
            commit("updateTotalPrice");
        }
    }
};
