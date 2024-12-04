<template>
  <div>
    <button @click="fetchData">fetch data</button>
    <div v-if="data">
      <pre>{{ data.msg }}</pre>
      <!-- Displays the fetched data -->
    </div>
  </div>
</template>
<script setup>
import { usePost } from '@/composables/usePost'
const { getData, data } = usePost()

const fetchData = async () => {
  try {
    /**
     * response :
     * + string
     * + object : {'msg': 'value'}
     * + array : [{id:1, name:'value'}, {id:2, name:'value'}]
     */
    await getData()
    // Store the response data in the reactive variable
    // data.value = response.msg
  } catch (error) {
    console.error('Error fetching data:', error) // Error handling
  }
}
</script>
