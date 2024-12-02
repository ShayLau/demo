import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import MainLayout from '../layouts/MainLayout.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('../views/Home.vue'),
        },
        {
          path: 'auth',
          children: [
            {
              path: 'login',
              name: 'Login',
              component: () => import('../views/auth/Login.vue'),
            },
            {
              path: 'register',
              name: 'Register',
              component: () => import('../views/auth/Register.vue'),
            },
          ],
        },
        {
          path: 'products',
          name: 'Products',
          component: () => import('../views/Products.vue'),
        },
        {
          path: 'categories',
          name: 'Categories',
          component: () => import('../views/Categories.vue'),
        },
        {
          path: 'products/:id',
          name: 'ProductDetail',
          component: () => import('../views/ProductDetail.vue'),
        },
        {
          path: 'cart',
          name: 'Cart',
          component: () => import('../views/Cart.vue'),
        },
        {
          path: 'orders',
          name: 'Orders',
          component: () => import('../views/Orders.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'favorites',
          name: 'Favorites',
          component: () => import('../views/Favorites.vue'),
          meta: { requiresAuth: true }
        },
        // {
        //   path: 'orders/:id',
        //   name: 'OrderDetail',
        //   component: () => import('../views/OrderDetail.vue'),
        //   meta: { requiresAuth: true }
        // }
      ],
    },
  ],
});

// 路由守卫
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  
  // 检查是否需要认证
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/auth/login');
  } else {
    next();
  }
});

export default router;