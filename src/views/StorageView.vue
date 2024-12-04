<template>
  <div>
    <h1>Vue 3 Authentication Example</h1>

    <!-- Display theme preference from LocalStorage -->
    <p>Current theme: {{ theme }}</p>

    <!-- Toggle theme preference and store it in LocalStorage -->
    <button @click="toggleTheme">Toggle Theme</button>

    <div>
      <button @click="handleCookie">getCookie</button>
      <button @click="handleDeleteCookie">deleteCookie</button>
      <p
        style="
          padding: 10px;
          border: 1px solid silver;
          border-radius: 5px;
          background-color: aliceblue;
          color: slategray;
        "
      >
        {{ token }}
      </p>
    </div>

    <!-- Display login status based on JWT token in Cookie -->
    <p v-if="isLoggedIn">You are logged in!</p>
    <p v-else>Please log in.</p>

    <!-- Login form (for demonstration purposes) -->
    <div v-if="!isLoggedIn">
      <input v-model="username" placeholder="Username" />
      <input type="password" v-model="password" placeholder="Password" />
      <button @click="login">Login</button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
// Refs for form data and UI state
const username = ref('')
const password = ref('')
const token = ref('')
const theme = ref(localStorage.getItem('theme') || 'light')

// Computed property to check if user is logged in (based on JWT cookie)
const isLoggedIn = computed(() => {
  console.log('== loggedIn ==', document.cookie.includes('auth_token='))
  return document.cookie.includes('auth_token=')
})

// Function to handle login and store JWT in a cookie
const login = () => {
  // Simulate login (usually, you'd make an API request here)
  const token = 'fake-jwt-token' // Example JWT token

  // Set the JWT token in cookie without ; HttpOnly; Secure , Max-Age=3600 = 1h
  document.cookie = `auth_token=${token}; SameSite=Strict; Max-Age=3600; Path=/`

  // You'd usually redirect or handle post-login actions here
  alert('Logged in successfully!')
  window.location.reload()
  router.push('/storage')
}

function getCookie(name) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
  return null
}
const handleCookie = () => {
  const cookie = getCookie('auth_token')
  token.value = cookie
}
const handleDeleteCookie = () => {
  // Loop through all cookies and delete each one
  document.cookie.split(';').forEach(function (c) {
    document.cookie = c.trim().split('=')[0] + '=; Max-Age=0; Path=/; SameSite=Strict;'
  })
  alert('Logout successfully!')
  window.location.reload()
}

// Function to toggle theme and store it in LocalStorage
const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  localStorage.setItem('theme', theme.value)
}
</script>

<style scoped>
/* Example styles */
body {
  background-color: var(--bg-color);
  color: var(--text-color);
}

[data-theme='light'] {
  --bg-color: white;
  --text-color: black;
}

[data-theme='dark'] {
  --bg-color: black;
  --text-color: white;
}

button {
  margin-top: 10px;
  padding: 5px 10px;
  cursor: pointer;
}
</style>
