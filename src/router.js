import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/pages/Login.vue';
import Orders from '@/pages/Orders.vue';
import OrderSteps from '@/pages/OrderSteps.vue';

const routes = [
  { path: '/login', name: 'login', component: Login, meta: { title: 'Iniciar sesión' } },
  { path: '/orders', name: 'orders', component: Orders, meta: { requiresAuth: true, title: 'Órdenes de reparación' } },
  { path: '/orders/:id', name: 'order-steps', component: OrderSteps, meta: { requiresAuth: true, title: (to) => `Orden ${to.params.id}` } },
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

router.afterEach((to) => {
  const base = 'NTC Workers Panel';
  let title = '';
  if (to.meta.title) {
    title = typeof to.meta.title === 'function' ? to.meta.title(to) : to.meta.title;
  }
  document.title = title ? `${title} - ${base}` : base;
});

export default router; 