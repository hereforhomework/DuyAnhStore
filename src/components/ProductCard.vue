<template>
    <div class="col mb-3" @click="$emit('view-product', product.id)">
      <div class="card border-0 rounded-0 shadow h-100">
        <img :src="product.image" class="card-img-top rounded-0 img-fluid" :alt="product.title" style="object-fit: contain; height: 150px;">
        <div class="card-body mt-2 mb-2" style="height: 100px;">
          <div class="row">
            <div class="col-12">
              <h5 class="card-title text-truncate" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                {{ product.title }}
              </h5>
              <h6 class="text-center mt-2">${{ product.price }}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      product: {
        type: Object,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .card-body {
    padding: 0.5rem;
  }
  
  .card-title {
    font-size: 1rem;
    margin-bottom: 0;
  }
  

  .card-body h6 {
    text-align: center;
    margin-top: 0.5rem; 
  }
  </style>
  