<template>
  <div class="container mt-5 mb-5">
    <div class="row d-flex justify-content-center">
      <div class="col-md-10">
        <div class="card">
          <div class="row">
            <div class="col-md-6">
              <div class="images p-3">
                <img :src="product.image" :alt="product.title" class="product-image">
              </div>
            </div>
            <div class="col-md-6">
              <div class="product p-4">
                <h5 class="text-uppercase">{{ product.title }}</h5>
                <p class="description">{{ product.description }}</p>
                <h4 class="text-uppercase">${{ product.price }}</h4>
                <div class="cart mt-4 align-items-center">
                  <button class="btn btn-danger text-uppercase mr-2 px-4" @click="addToCart(product.id)">Add to Cart</button>
                  <button class="btn btn-danger text-uppercase px-4 ml-3" @click="likeProduct" v-like-button>
                    <i class="fa-solid fa-heart"></i> {{ product.likes }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props: ['id'],
  data() {
    return {
      product: {},
      userHasLiked: false, 
    };
  },
  mounted() {
    this.fetchProductDetails();
  },
  methods: {
    async fetchProductDetails() {
      try {
        const response = await axios.get(`http://localhost:3000/products/${this.id}`);
        this.product = response.data;
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    },
    async addToCart(productId) {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from storage
        if (!token) {
          alert('You need to log in to add products to the cart.');
          return;
        }
        await axios.post('http://localhost:3000/cart', { 
          product_id: productId 
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        alert('Product added to cart');
      } catch (error) {
        console.error('Error adding product to cart:', error);
        alert(`Error: ${error.response.data.message}`);
      }
    },
    async likeProduct() {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from storage
        if (!token) {
          alert('You need to log in to like products.');
          return;
        }
        await axios.post(`http://localhost:3000/products/${this.id}/like`, {}, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        // Refresh the product details to get the updated like count
        this.fetchProductDetails();
      } catch (error) {
        console.error('Error liking/unliking product:', error);
        alert(`Error: ${error.response.data.message}`);
      }
    }
  }
};
</script>

<style scoped>
.product-image {
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: contain;
}

.cart button {
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>
