import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import Email from '../components/Email.vue';
// Import your user store (this example uses Pinia)
import { useAuthStore } from '@/stores/auth.store';
import Table from '@/components/Table.vue';

// Define your routes
const routes = [
  {
    path: '/',
    redirect: { name: 'table' },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/register',
    name: 'register',
    component: Register, 
  },
  {
    path: '/table',
    name: 'table',
    component: Table, 
  },
  {
    path: '/email',
    name: 'email',
    component: Email, 
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isLoggedIn = authStore.user !== null;

  if (!isLoggedIn && to.name !== 'login' && to.name !== 'register') {
    next({ name: 'login' });
  } else if (isLoggedIn && (to.name === 'login' || to.name === 'register')) {
    next({ name: 'home' });
  } else {
    next();
  }
});

export default router;
