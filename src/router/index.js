import { createRouter, createWebHistory } from 'vue-router';
import CategoryList from '../views/CategoryList.vue';
import ProductList from '../views/ProductList.vue';

const routes = [
  { path: '/', redirect: '/categories' },
  { path: '/categories', component: CategoryList },
  { path: '/products', component: ProductList }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
