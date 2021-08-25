import { createRouter, createWebHistory } from 'vue-router';
import Index from '../views/Index.vue';
import Viera from '../views/Viera.vue';

const routes = [{
  path: '/',
  component: Index
}, {
  path: '/viera/:id',
  component: Viera
}];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
