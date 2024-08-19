<template>
    <div>
        <h1>Categorias</h1>
        <ul>
        <li v-for="category in categories" :key="category.id">
            {{ category.name }}
            <button @click="deleteCategory(category.id)">Delete</button>
        </li>
        </ul>
        <form @submit.prevent="addCategory">
            <input v-model="newCategoryName" placeholder="Nueva Categoría" />
            <button type="submit">Nuevo</button>
        </form>
    </div>
</template>

<script>
import apiClient from '../services/axios';

export default {
    data() {
        return {
        categories: [],
        newCategoryName: ''
        };
    },
    methods: {
fetchCategories() {
        apiClient.get('/categories').then(response => {
            this.categories = response.data;
        });
        },  
addCategory() {
        apiClient.post('/categories', { name: this.newCategoryName }).then(() => {
            this.newCategoryName = '';
            this.fetchCategories();
        });
},
deleteCategory(id) {
    apiClient.delete(`/categories/${id}`).then(() => {
    this.fetchCategories();
    });
}
},
    mounted() {
    this.fetchCategories();
    }
};
</script>
