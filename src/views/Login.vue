<template>
  <div class="container mt-5 mb-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h3>Login</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="submitForm">
              <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input type="email" class="form-control" id="email" v-model="email" required>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" v-model="password" required>
              </div>
              <span :class="errorMessageClass">{{ errorMessage }}</span>
              <button type="submit" class="btn custom-btn w-100">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: ''
    };
  },
  computed: {
    errorMessageClass() {
      return this.errorMessage ? 'text-danger' : '';
    }
  },
  methods: {
    ...mapActions('auth', ['login']), // Include 'auth' namespace
  async submitForm() {
    try {
      console.log('Submitting form with:', { email: this.email, password: this.password });
      await this.login({ email: this.email, password: this.password });
      this.$router.push('/home'); // Redirect to homepage after login
    } catch (error) {
      console.error('Error during form submission:', error);
      this.errorMessage = 'Invalid credentials';
    }
  }
  }
};
</script>

<style scoped>
.custom-btn {
  background-color: #007bff;
  color: white;
}
</style>
