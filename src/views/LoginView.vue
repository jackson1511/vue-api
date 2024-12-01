<template>
  <main>
    <h1>Login</h1>
    <button @click="login">login</button>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth.js'

const username = ref('')
const password = ref('')
const authStore = useAuthStore()

const handleLogin = async () => {
  await authStore.login(username.value, password.value)
  if (authStore.isAuthenticated) {
    // Redirect to a protected page after login
    console.log('Logged in successfully')
    // You can use Vue Router to redirect here
  } else {
    console.error('Login failed')
  }
}

import axios from 'axios'

const login = async () => {
  try {
    const response = await axios.post('http://localhost:3000/login', {
      username: 'user1',
      password: 'password123',
    })

    console.log(response.data) // Handle successful login
    localStorage.setItem('token', response.data.token) // Save token to localStorage
  } catch (error) {
    console.error('Login failed:', error.response?.data?.message || error)
  }
}
</script>
