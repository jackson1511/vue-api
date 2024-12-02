<template>
  <div>
    <header>
      <nav>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/post">Posts</router-link></li>
        </ul>
      </nav>
      <div>
        <button @click="hanldeLogout">Logout</button>
      </div>
    </header>
    <main>
      <slot></slot>
    </main>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
defineComponent({
  name: 'MainLayout',
})

const hanldeLogout = async () => {
  authStore.logout()
  router.push('/login')
}
</script>
