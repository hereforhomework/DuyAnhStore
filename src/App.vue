<script setup>
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
</script>


<template>
  <Navbar />
  <RouterView />
</template>

<style>
body {
  background: linear-gradient(90deg, rgb(252, 115, 156) 0%, rgb(139, 102, 241) 100%);
} 
</style>
