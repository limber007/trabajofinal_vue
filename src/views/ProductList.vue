<template>
    <div>
      <h1>Productos</h1>
      <input v-model="searchTerm" placeholder="Buscar por nombre" />
      <select v-model="priceFilter">
        <option value="">Todos los precios</option>
        <option value="100">Mayor a 100</option>
      </select>
      <ul>
        <li v-for="product in filteredProducts" :key="product.id">
          {{ product.name }} - ${{ product.price }}
          <button @click="deleteProduct(product.id)">Eliminar</button>
        </li>
      </ul>
      <form @submit.prevent="addProduct">
        <input v-model="newProductName" placeholder="Nuevo producto" />
        <input v-model="newProductPrice" placeholder="Precio" type="number" />
        <select v-model="newProductCategory">
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
        <button type="submit">Nuevo</button>
      </form>
    </div>
  </template>
  
  <script>
  import apiClient from '../services/axios';
  
  export default {
    data() {
      return {
        products: [],
        categories: [],
        newProductName: '',
        newProductPrice: '',
        newProductCategory: '',
        searchTerm: '',
        priceFilter: ''
      };
    },
    computed: {
      filteredProducts() {
        return this.products.filter(product => {
          return (
            product.name.includes(this.searchTerm) &&
            (this.priceFilter === '' || product.price > this.priceFilter)
          );
        });
      }
    },
    methods: {
      fetchProducts() {
        apiClient.get('/products').then(response => {
          this.products = response.data;
        });
      },
      fetchCategories() {
        apiClient.get('/categories').then(response => {
          this.categories = response.data;
        });
      },
      addProduct() {
        apiClient.post('/products', {
          name: this.newProductName,
          price: this.newProductPrice,
          categoryId: this.newProductCategory
        }).then(() => {
          this.newProductName = '';
          this.newProductPrice = '';
          this.newProductCategory = '';
          this.fetchProducts();
        });
      },
      deleteProduct(id) {
        apiClient.delete(`/products/${id}`).then(() => {
          this.fetchProducts();
        });
      }
    },
    mounted() {
        this.fetchProducts();
        this.fetchCategories();
    }
};
</script>
