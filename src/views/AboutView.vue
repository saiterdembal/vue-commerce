<template>
  <div class="about">
    <ul>
      <li v-for="(product, index) in getProductsById" :key="index">
        <div>{{ product.id }}</div>
        <div>{{ product.name }}</div>
        <div>{{ product.price }}</div>
        <div>{{ product.shortdesc }}</div>
        <div>{{ product.url }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters({
      getProductsById: "productStore/getProductsById",
    }),
  },
};
</script>
