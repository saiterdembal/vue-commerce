import { createRouter, createWebHistory } from "vue-router";
import ProductView from "@/components/products/ProductView.vue";



const routes = [
  {
    path: "/",
    redirect: '/products?categoryId=1'

  },
  {
    path: "/products",
    name: "products",
    component: ProductView
  },


];

const router = createRouter({
  history: createWebHistory(),
  routes,


});

export default router;
