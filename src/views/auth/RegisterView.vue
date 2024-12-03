<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="handleRegister">
      <input v-model="username" type="text" placeholder="Username" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="age" type="number" placeholder="Age" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const username = ref('')
const email = ref('')
const age = ref('')
const password = ref('')

const handleRegister = async () => {
  try {
    const response = await axios.post('http://localhost:5000/api/v1/register', {
      email: email.value,
      password: password.value,
      username: username.value,
      age: age.value,
    })

    // Handle the successful response
    console.log('Registration successful:', response.data)
    alert('Registration successful!')
  } catch (error) {
    // Handle errors
    console.error('Registration failed:', error)
    alert('Registration failed! Please try again.')
  }
}
</script>

<style scoped>
/* Add your styling here */
form {
  max-width: 400px;
  margin: 0 auto;
}
input {
  display: block;
  margin-bottom: 10px;
  padding: 8px;
  width: 100%;
}
button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
</style>
