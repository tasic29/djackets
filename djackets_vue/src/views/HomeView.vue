<template>
  <div class="home">
    <section class="hero is-medium is-dark mb-6">
      <div class="hero-body has-text-centered">
        <p class="title mb-6">Welcome to Djacket</p>
        <p class="subtitle">The best jacket store online</p>
      </div>
    </section>

    <div class="column is-multiline">
      <div class="column is-12">
        <h2 class="is-size-2 has-text-centered">Latest products</h2>
      </div>
      <ProductBox
        v-for="product in latestProducts"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script>
import ProductBox from "../components/ProductBox.vue";

import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      latestProducts: [],
    };
  },

  components: { ProductBox },
  mounted() {
    this.getLatestProducts();

    document.title = "Home | Djackets";
  },
  methods: {
    async getLatestProducts() {
      this.$store.commit("setIsLoading", true);
      await axios
        .get("/api/v1/latest-products/")
        .then((response) => {
          this.latestProducts = response.data;
        })
        .catch((error) => {
          console.error("Error fetching latest products:", error);
        });
      this.$store.commit("setIsLoading", false);
    },
  },
};
</script>
