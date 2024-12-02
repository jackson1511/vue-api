<template>
  <main>
    <component :is="layoutComponent">
      <RouterView />
    </component>
  </main>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'
import AuthLayout from './layouts/AuthLayout.vue'
import MainLayout from './layouts/MainLayout.vue'
import { useAuthStore } from './stores/auth'

const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()
const layoutComponent = computed(() => {
  switch (route.meta.layout) {
    case 'AuthLayout':
      return AuthLayout
    default:
      return MainLayout
  }
})

onMounted(() => {
  if (authStore.checkTokenExpiration(authStore.token)) {
    router.push('/login')
  }
})
</script>
