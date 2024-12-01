<template>
  <div>
    <button @click="fetchData">fetch data</button>
    <div>
      <p v-if="loading">Loading...</p>
      <p v-if="error">Error: {{ error }}</p>
      <pre v-if="data.length > 0">{{ data }}</pre>
    </div>
  </div>
</template>
<script setup>
import axios from 'axios'
import { ref } from 'vue'

// create reactive state variable
const data = ref([])
const loading = ref(false)
const error = ref(null)

// fetch data from API
const fetchData = async () => {
  try {
    loading.value = true
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
    data.value = response.data
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
}
</script>
