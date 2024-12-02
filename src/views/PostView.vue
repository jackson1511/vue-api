<template>
  <div>
    <button @click="fetchData">fetch data</button>
    <div>
      <p v-if="loading">Loading...</p>
      <p v-if="error">Error: {{ error }}</p>
    </div>
  </div>
</template>
<script setup>
import { useAuthStore } from '@/stores/auth'
import axios from 'axios'
import { ref } from 'vue'

// create reactive state variable
const data = ref([])
const loading = ref(false)
const error = ref(null)
const authStore = useAuthStore()

// fetch data from API
const fetchData = async () => {
  if (authStore.checkTokenExpiration(authStore.token)) {
    // If the token is expired, redirect the user to login or log them out
    authStore.logout()
    console.log('Token expired, logging out...')
    return // Stop the API request
  }
  try {
    loading.value = true
    const response = await axios.get('http://localhost:5000/api/v1/dashboards', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Set the Bearer token in the Authorization header
      },
    })
    console.log(response)
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
}
</script>
