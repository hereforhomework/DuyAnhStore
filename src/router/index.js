// import { createRouter, createWebHistory } from 'vue-router';
// import About from "@/views/About.vue";
// import Home from "@/views/Home.vue";
// import Category1 from "@/views/Store.vue";
// import ProductDetails from "@/views/ProductDetails.vue";
// import Cart from "@/views/Cart.vue"; 
// import Login from "@/views/Login.vue";
// import Signup from "@/views/Signup.vue";

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: [
//     {
//       path: '/',
//       redirect: '/home'
//     },
//     {
//       path: '/home',
//       name: 'home',
//       component: Home
//     },
//     {
//       path: '/about',
//       name: 'about',
//       component: About
//     },
//     {
//       path: '/store',
//       name: 'store',
//       component: Category1
//     },
//     {
//       path: '/product/:id', 
//       name: 'ProductDetail',
//       component: ProductDetails,
//       props: true
//     },
//     {
//       path: '/cart', 
//       name: 'Cart',
//       component: Cart
//     },
//     {
//       path: '/login',
//       name: 'Login',
//       component: Login
//     },
//     {
//       path: '/signup',
//       name: 'Signup',
//       component: Signup
//     }
//   ]
// });

// export default router;

import { createRouter, createWebHistory } from 'vue-router';
import About from "@/views/About.vue";
import Home from "@/views/Home.vue";
import Store from "@/views/Store.vue";
import ProductDetails from "@/views/ProductDetails.vue";
import Cart from "@/views/Cart.vue"; 
import Login from "@/views/Login.vue";
import Signup from "@/views/Signup.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', name: 'home', component: Home },
    { path: '/about', name: 'about', component: About },
    { path: '/store', name: 'store', component: Store },
    { path: '/product/:id', name: 'ProductDetail', component: ProductDetails, props: true },
    { path: '/cart', name: 'Cart', component: Cart},
    { path: '/login', name: 'Login', component: Login },
    { path: '/signup', name: 'Signup', component: Signup },
  ]
});


export default router;
