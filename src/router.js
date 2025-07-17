import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/pages/Login.vue';
import Orders from '@/pages/Orders.vue';

const routes = [
  { path: '/login', name: 'login', component: Login },
  { path: '/orders', name: 'orders', component: Orders, meta: { requiresAuth: true } },
  { path: '/:pathMatch(.*)*', redirect: '/login' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.meta.requiresAuth && !token) {
    next({ name: 'login' });
  } else if (to.name === 'login' && token) {
    next({ name: 'orders' });
  } else {
    next();
  }
});

export default router; 