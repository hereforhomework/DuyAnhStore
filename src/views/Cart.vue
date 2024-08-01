<template>
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col">
        <div class="card">
          <div class="card-body p-4">
            <div class="row">
              <div class="col-lg-7">
                <h5 class="mb-3">
                  <router-link to="/store" class="text-body">
                    <i class="fas fa-long-arrow-alt-left me-2"></i>Continue shopping
                  </router-link>
                </h5>
                <hr>
                <div v-for="item in cartItems" :key="item.id" class="card mb-3">
                  <div class="card-body">
                    <div class="d-flex justify-content-between">
                      <div class="d-flex flex-row align-items-center">
                        <div>
                          <img :src="item.image" class="img-fluid rounded-3" alt="Shopping item" style="width: 65px;">
                        </div>
                        <div class="ms-3">
                          <h5>{{ item.title }}</h5>
                          <p class="small mb-0">{{ item.description }}</p>
                          <p class="small mb-0">Quantity: {{ item.quantity }}</p> <!-- Display quantity -->
                        </div>
                      </div>
                      <div class="d-flex flex-row align-items-center">
                        <div style="width: 80px;">
                          <h5 class="mb-0">${{ item.price }}</h5>
                        </div>
                        <a href="#!" @click="removeFromCart(item.product_id)" style="color: #cecece;">
                          <i class="fas fa-trash-alt"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-5">
                <div class="card bg-primary text-white rounded-3">
                  <div class="card-body">
                    <div class="d-flex justify-content-between mb-4">
                      <p class="mb-2">Total</p>
                      <p class="mb-2">${{ cartItems.reduce((total, item) => total + item.price * item.quantity, 0) }}</p> <!-- Calculate total -->
                    </div>
                    <button type="button" class="btn btn-info btn-block btn-lg">
                      <div class="d-flex justify-content-between">
                        <span>Checkout <i class="fas fa-long-arrow-alt-right ms-2"></i></span>
                      </div>
                    </button>
                  </div>
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
  data() {
    return {
      cartItems: [],
    };
  },
  async created() {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from storage
      const response = await axios.get('http://localhost:3000/cart', {
        headers: { Authorization: `Bearer ${token}` }
      });
      this.cartItems = response.data;
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  },
  methods: {
    async removeFromCart(productId) {
    try {
      const token = localStorage.getItem('token'); // Adjust based on how you store the token
      // Call the API to delete or update the item quantity
      await axios.delete(`http://localhost:3000/cart/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Fetch updated cart items to ensure the UI reflects the latest state
      const response = await axios.get('http://localhost:3000/cart', {
        headers: { Authorization: `Bearer ${token}` }
      });
      this.cartItems = response.data;

    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  }
  }
};
</script>

