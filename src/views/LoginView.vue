<template>
  <main>
    <h1>Login</h1>
    <button @click="login">login</button>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="email">Email:</label>
        <input type="text" id="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <button @click="handleLogout">Logout</button>

  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth.js'

const email = ref('')
const password = ref('')
const authStore = useAuthStore()

const handleLogin = async () => {
  await authStore.login(email.value, password.value)
  if (authStore.isAuthenticated) {
    // Redirect to a protected page after login
    console.log('Logged in successfully')
    // You can use Vue Router to redirect here
  } else {
    console.error('Login failed')
  }
}

const handleLogout = async () =>{
  authStore.logout();
}
</script>
