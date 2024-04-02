<template>
  <header-view />
  <main class="mb-8 mt-28">
    <div class="container mx-auto px-6">
      <header-spot />
      <main class="mx-auto">
        <section aria-labelledby="products-heading" class="pb-24 pt-3">
          <div class="grid grid-cols-12 gap-x-8 gap-y-10">
            <category-view />
            <router-view></router-view>
          </div>
        </section>


      </main>

      <footer-spots />
    </div>
  </main>
  <footer-view />
</template>

<script>
import HeaderView from "./views/HeaderView.vue";
import FooterView from "./views/FooterView.vue";
import HeaderSpot from "./views/HeaderSpotView.vue";
import FooterSpots from "./views/FooterSpotsView.vue";
import CategoryView from "./components/categories/CategoryView.vue";
export default {
  created() {
    this.$store.getters["productStore/getProductsByCategory"];
    this.$store.dispatch("productStore/initApp");
    this.$store.dispatch("categoryStore/initApp");

  },
  components: {
    HeaderView,
    FooterView,
    FooterSpots,
    HeaderSpot,
    CategoryView,
  },
};
</script>

<style></style>
