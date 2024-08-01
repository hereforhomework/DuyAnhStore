<template>
  <div class="container-fluid d-flex align-items-center justify-content-center min-vh-100">
    <div class="text-center">
      <h1 class="display-3">Welcome to DuyAnhStore</h1>
      <router-link to="/store" class="shop-now mt-4 display-3">Shop Now</router-link>
    </div>
  </div>
</template>

<style scoped>
body {
  background: linear-gradient(90deg, rgb(252, 115, 156) 0%, rgb(139, 102, 241) 100%);
}

.container-fluid {
  height: 100vh; 
  margin: 0; 
}

.text-center {
  color: #fff; 
}

.shop-now {
  text-decoration: underline;
  color: #fff; 
  font-size: 2rem;
  border: none;
  background: transparent; 
  cursor: pointer;
}

.shop-now:hover {
  text-decoration: underline;
}
</style>
