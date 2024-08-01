<template>
  <div class="bg-white py-4 px-2 mt-5 rounded mb-5" style="width: 80%; margin: 0 auto;">
    <div class="container">
      <Filter :products="products" @filtered-products="updateFilteredProducts"/>
      <hr class="hr" />
      
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        <ProductCard v-for="(product, index) in paginatedProducts" :key="product.id" :product="product" @view-product="viewProductDetails" />
      </div>
      
      <nav aria-label="Pagination">
        <ul class="pagination justify-content-center mt-3">
          <li class="page-item" v-if="currentPage > 1">
            <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">Previous</a>
          </li>
          <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }">
            <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
          </li>
          <li class="page-item" v-if="currentPage < totalPages">
            <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">Next</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Filter from '../components/Filter.vue';
import ProductCard from '../components/ProductCard.vue';

export default {
  components: {
    Filter,
    ProductCard,
  },
  data() {
    return {
      products: [],
      filteredProducts: [],
      currentPage: 1,
      pageSize: 8,
    };
  },
  computed: {
    paginatedProducts() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.filteredProducts.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.filteredProducts.length / this.pageSize);
    },
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get('http://localhost:3000/products');
        this.products = response.data;
        this.filteredProducts = this.products; // no initial filters
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    changePage(page) {
      this.currentPage = page;
    },
    updateFilteredProducts(filtered) {
      this.filteredProducts = filtered;
      this.currentPage = 1; // reset to first page when filters change
    },
    viewProductDetails(productId) {
      this.$router.push({ name: 'ProductDetail', params: { id: productId } });
    },
  },
};
</script>
