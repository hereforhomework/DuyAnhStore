<template>
    <div class="container mt-5 mb-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h3>Signup</h3>
            </div>
            <div class="card-body">
              <form @submit.prevent="submitForm">
                <div class="mb-3">
                  <label for="email" class="form-label">Email address</label>
                  <input type="email" class="form-control" id="email" v-model="email" required>
                </div>
                <span :class="existedEmailMessage">{{ existedEmailMessage }}</span>
    
                <div class="mb-3">
                  <label for="username" class="form-label">Username</label>
                  <input type="text" class="form-control" id="username" v-model="username" required>
                </div>
                <div class="mb-3">
                  <label for="password1" class="form-label">Password</label>
                  <div class="input-group">
                    <input
                      type="password"
                      class="form-control"
                      id="password1"
                      v-model="password1"
                      @input="validatePassword(password1)"
                      :type="passwordVisible ? 'text' : 'password'"
                      required>
                  </div>
                  <div class="form-group mt-2">
                    <ul class="list-unstyled">
                      <li :class="{'text-success': minLength, 'text-danger': !minLength}">
                        <i :class="minLength ? 'fas fa-check' : 'fas fa-times'"></i> Minimum 8 characters
                      </li>
                      <li :class="{'text-success': uppercase, 'text-danger': !uppercase}">
                        <i :class="uppercase ? 'fas fa-check' : 'fas fa-times'"></i> At least one uppercase letter
                      </li>
                      <li :class="{'text-success': lowercase, 'text-danger': !lowercase}">
                        <i :class="lowercase ? 'fas fa-check' : 'fas fa-times'"></i> At least one lowercase letter
                      </li>
                      <li :class="{'text-success': symbol, 'text-danger': !symbol}">
                        <i :class="symbol ? 'fas fa-check' : 'fas fa-times'"></i> At least one symbol (@$!%*?&)
                      </li>
                    </ul>
                  </div>
                  <span :class="errorMessageClass">{{ errorMessage }}</span>
                </div>
                <div class="mb-3">
                  <label for="password2" class="form-label">Enter Password Again</label>
                  <div class="input-group">
                    <input
                      type="password"
                      class="form-control"
                      id="password2"
                      v-model="password2"
                      @input="checkPasswordMatch"
                      :type="passwordVisible ? 'text' : 'password'"
                      required>
                  </div>
                  <span :class="matchErrorClass">{{ matchError }}</span>
                </div>
                <button type="submit" class="btn custom-btn w-100">Signup</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
    
<script>
import { mapActions } from 'vuex';
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      username: '',
      password1: '',
      password2: '',
      passwordVisible: false,
      errorMessage: '',
      matchError: '',
      minLength: false,
      uppercase: false,
      lowercase: false,
      symbol: false,
      existedEmailMessage: ''
    };
  },
  computed: {
    errorMessageClass() {
      return this.errorMessage ? 'text-danger' : '';
    },
    matchErrorClass() {
      return this.matchError ? 'text-danger' : '';
    }
  },
  methods: {
    ...mapActions(['signup']),
    validatePassword(password) {
      const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).{8,}$/;

      this.minLength = password.length >= 8;
      this.uppercase = /[A-Z]/.test(password);
      this.lowercase = /[a-z]/.test(password);
      this.symbol = /[@$!%*?&]/.test(password);

      this.errorMessage = passwordValidation.test(password) ? '' : 'Password does not meet criteria';
    },
    checkPasswordMatch() {
      this.matchError = this.password1 !== this.password2 ? 'Passwords do not match' : '';
    },
    async submitForm() {
  if (this.password1 !== this.password2) {
    this.matchError = 'Passwords do not match';
    return;
  }

  try {
    const response = await axios.post('http://localhost:3000/signup', {
      email: this.email,
      username: this.username,
      password: this.password1
    });
    if (response.status === 201) {
      this.$router.push('/login'); // Redirect to login after signup
    }
  } catch (error) {
    // Enhanced error handling
    console.log('Error:', error);
    if (error.response) {
      console.log('Error response:', error.response);
      if (error.response.status === 400) {
        this.existedEmailMessage = 'Email already exists';
      } else {
        this.errorMessage = 'An unexpected error occurred';
      }
    } else if (error.request) {
      console.log('Error request:', error.request);
      this.errorMessage = 'No response from server';
    } else {
      console.log('Error message:', error.message);
      this.errorMessage = 'Error setting up request';
    }
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
  