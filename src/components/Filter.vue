<template>
    <div class="row">
      <!-- Category Dropdown -->
      <div class="col">
        <div class="dropdown">
          <!-- Use selectedCategory to dynamically update the button text -->
          <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            {{ selectedCategory ? selectedCategory : 'Categories' }}
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <!-- Option to show all categories -->
            <li @click="filterCategory(null)"> <!-- Pass null to represent all categories -->
              <a class="dropdown-item" href="#">All</a>
            </li>
            <!-- Iterate over categories and create dropdown items -->
            <li v-for="category in categories" :key="category" @click="filterCategory(category)">
              <a class="dropdown-item" href="#">{{ category }}</a>
            </li>
          </ul>
        </div>
      </div>
      <!-- Minimum Price Input -->
      <div class="col">
        <div class="mb-3">
          <input type="number" class="form-control" v-model="minPrice" placeholder="Enter Minimum price.." @input="filterProducts">
        </div>
      </div>
      <!-- Maximum Price Input -->
      <div class="col">
        <div class="mb-3">
          <input type="number" class="form-control" v-model="maxPrice" placeholder="Enter Maximum price.." @input="filterProducts">
        </div>
      </div>
      <!-- Search Input -->
      <div class="col">
        <input class="form-control me-2" type="search" v-model="searchQuery" placeholder="Search a product" @input="filterProducts">
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        categories: [],
        products: [], // Array to store fetched products
        selectedCategory: null, // Use null to represent no category selected
        minPrice: 0, // Minimum price filter
        maxPrice: Infinity, // Maximum price filter
        searchQuery: '', // Search query filter
      };
    },
    mounted() {
      this.fetchCategories();
      this.fetchProducts(); // Fetch all products initially
    },
    methods: {
      async fetchCategories() {
        try {
          const response = await axios.get('https://fakestoreapi.com/products/categories');
          this.categories = response.data;
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      },
      async fetchProducts() {
        try {
          const response = await axios.get('https://fakestoreapi.com/products');
          this.products = response.data;
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      },
      async filterCategory(category) {
        this.selectedCategory = category;
        try {
          let response;
          if (category === null) { // Check for null to fetch all products
            response = await axios.get('https://fakestoreapi.com/products');
          } else {
            response = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
          }
          this.products = response.data; // Update products with filtered results
          this.$emit('filtered-products', this.moreFilter(this.products));
        } catch (error) {
          console.error(`Error fetching products in category ${category}:`, error);
        }
      },
      moreFilter(products) {
        return products.filter(product => {
          const matchesMinPrice = this.minPrice ? product.price >= this.minPrice : true;
          const matchesMaxPrice = this.maxPrice ? product.price <= this.maxPrice : true;
          const matchesSearchQuery = this.searchQuery ? product.title.toLowerCase().includes(this.searchQuery.toLowerCase()) : true;
          return matchesMinPrice && matchesMaxPrice && matchesSearchQuery;
        });
      },
      filterProducts() {
        if (this.selectedCategory !== null) {
          this.filterCategory(this.selectedCategory);
        } else {
          this.$emit('filtered-products', this.moreFilter(this.products));
        }
      }
    },
  };
  </script>
  
  <style scoped>
  </style>
  