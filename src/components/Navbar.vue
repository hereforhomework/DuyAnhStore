<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <router-link to="/home" class="navbar-brand">DuyAnhStore</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link
              to="/home"
              class="nav-link text-center"
              :class="{ active: $route.path === '/home' }"
              aria-current="page"
            >Home</router-link>
          </li>
          <li class="nav-item">
            <router-link
              to="/store"
              class="nav-link text-center"
              :class="{ active: $route.path === '/store' }"
            >Store</router-link>
          </li>
          <li class="nav-item">
            <router-link
              to="/about"
              class="nav-link text-center"
              :class="{ active: $route.path === '/about' }"
            >About</router-link>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Account
            </a>
            <ul class="dropdown-menu text-center" aria-labelledby="navbarDropdown">
              <li v-if="!isLoggedIn">
                <router-link class="dropdown-item" :to="{ name: 'Login' }">Login</router-link>
              </li> 
              <hr class="dropdown-divider">
              <li v-if="!isLoggedIn">
                <router-link class="dropdown-item" :to="{ name: 'Signup' }">Signup</router-link>
              </li>
              <li v-if="isLoggedIn">
                <router-link class="dropdown-item" :to="{ name: 'Cart' }">Cart</router-link>
              </li>
              <hr class="dropdown-divider">
              <li v-if="isLoggedIn">
                <a class="dropdown-item" @click="logout">Logout</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router'; 
import { useStore } from 'vuex';

const route = useRoute();
const router = useRouter();
const store = useStore();

// Compute isLoggedIn based on the Vuex state
const isLoggedIn = computed(() => store.state.auth.token !== null);

const logout = async () => {
  try {
    await store.dispatch('auth/logout'); 
    router.push({ name: 'home' }); 
  } catch (error) {
    console.error('Logout error:', error);
  }
};
</script>


<style scoped>
.nav-link.dropdown-toggle { 
  border-radius: 5px; 
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); 
  margin-left: 1.25rem;
}

.nav-link {
  margin-left: 1.875rem;
  border-radius: 5px;
}

.nav-link:hover,
.btn:hover,
.nav-link.active {
  transform: scale(1.05); 
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3); 
}

@media (max-width: 991px) {
  .dropdown-menu, a {
    text-align: center; 
  }
}
</style>