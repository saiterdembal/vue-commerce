import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import '../src/assets/css/index.css';


// import the package
import VueAwesomePaginate from "vue-awesome-paginate";

// import the necessary css file
import "vue-awesome-paginate/dist/style.css";

const app = createApp(App);
app.use(store);
app.use(router);
app.use(VueAwesomePaginate)


app.config.globalProperties.$filters = {
    toCurrency(value) {
        if (typeof value !== "number") {
            return value;
        }
        var formatter = new Intl.NumberFormat('tr-TR', {
            style: 'currency',
            currency: 'TRY'
        });
        return formatter.format(value);
    }
}


app.mount("#app");
