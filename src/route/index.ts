import { createRouter, createWebHistory } from 'vue-router';
import Index from '../views/Index.vue';
import Viera from '../views/Viera.vue';

const routes = [{
  path: '/list',
  component: Index
}, {
  path: '/:id',
  component: Viera
}];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
