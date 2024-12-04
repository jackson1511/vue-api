import PageNotFound from '@/views/PageNotFound.vue'
import PostView from '@/views/PostView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { layout: 'MainLayout' },
    },
    {
      path: '/post',
      name: 'posts',
      component: PostView,
      meta: { layout: 'MainLayout' },
    },
    {
      path: '/todos',
      name: 'todos',
      component: () => import('@/views/TodoView.vue'),
      meta: { layout: 'MainLayout', requiresAuth: true },
    },
    {
      path: '/setting',
      name: 'setting',
      component: () => import('@/views/SettingView.vue'),
      meta: { layout: 'MainLayout', requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { layout: 'AuthLayout' },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { layout: 'AuthLayout', requiresAuth: false },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: PageNotFound,
      meta: { layout: 'auth' }, // or 'master', depending on the layout you want for the 404 page
    },
  ],
})

// Global route guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token') // Check if the user is authenticated
  // Allow navigation to login or register page if not authenticated
  if ((to.path === '/login' || to.path === '/register') && isAuthenticated) {
    // Redirect to home or other protected page if user is authenticated
    next({ name: 'home' })
  } else if (to.path !== '/login' && to.path !== '/register' && !isAuthenticated) {
    // Redirect to login page if the user is not authenticated and tries to access a protected page
    next('/login')
  } else {
    next() // Allow navigation for all other cases
  }
})

export default router
