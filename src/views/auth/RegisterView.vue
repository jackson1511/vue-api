<template>
  <main class="register-container">
    <div class="register-box">
      <h2 class="register-title">Register</h2>
      <form @submit.prevent="handleRegister" class="register-form">
        <div class="input-group">
          <label for="username" class="input-label">Username:</label>
          <input
            v-model="username"
            type="text"
            id="username"
            class="input-field"
            placeholder="Username"
            required
          />
        </div>
        <div class="input-group">
          <label for="email" class="input-label">Email:</label>
          <input
            v-model="email"
            type="email"
            id="email"
            class="input-field"
            placeholder="Email"
            required
          />
        </div>
        <div class="input-group">
          <label for="age" class="input-label">Age:</label>
          <input
            v-model="age"
            type="number"
            id="age"
            class="input-field"
            placeholder="Age"
            required
          />
        </div>
        <div class="input-group">
          <label for="password" class="input-label">Password:</label>
          <input
            v-model="password"
            type="password"
            id="password"
            class="input-field"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit" class="submit-btn">Register</button>
      </form>
      <p class="login-link">
        Already have an account? <router-link to="/login">Login here</router-link>
      </p>
    </div>
  </main>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'

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
/* Container for the entire page */
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f2f2f2;
  font-family: 'Arial', sans-serif;
}

/* Centered registration box */
.register-box {
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

/* Title styling */
.register-title {
  text-align: center;
  font-size: 28px;
  color: #333;
  margin-bottom: 20px;
}

/* Form styling */
.register-form {
  display: flex;
  flex-direction: column;
}

/* Input group (label and input) styling */
.input-group {
  margin-bottom: 20px;
}

.input-label {
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
  display: block;
}

.input-field {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

.input-field:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
}

/* Submit button styling */
.submit-btn {
  padding: 12px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #007bff;
}

/* Login link */
.login-link {
  text-align: center;
  margin-top: 20px;
}

.login-link a {
  color: #007bff;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>
