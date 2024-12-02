import PostView from '@/views/PostView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import LoginView from '@/views/auth/LoginView.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import PageNotFound from '@/views/PageNotFound.vue'

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
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { layout: 'AuthLayout' },
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
  if (to.path !== '/login' && !isAuthenticated) {
    next('/login') // Redirect to login page if not authenticated
  } else {
    next() // Allow navigation
  }
})

export default router
