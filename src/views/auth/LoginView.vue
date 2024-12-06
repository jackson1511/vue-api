<template>
  <main class="login-container">
    <div class="login-box">
      <h1 class="login-title">Login</h1>
      <!-- Success Message -->
      <div v-if="successMessage" class="alert success">
        {{ successMessage }}
      </div>

      <!-- Error Message -->
      <div v-if="errorMessage" class="alert error">
        {{ errorMessage }}
      </div>

      <!-- Loading Indicator -->
      <p v-if="authStore.loading">Loading...</p>
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="input-group">
          <label for="email" class="input-label">Email:</label>
          <input type="text" id="email" v-model="email" class="input-field" required />
        </div>
        <div class="input-group">
          <label for="password" class="input-label">Password:</label>
          <input type="password" id="password" v-model="password" class="input-field" required />
        </div>

        <button type="submit" class="submit-btn">Login</button>
      </form>
      <p class="register-link">
        Don't have an account? <router-link to="/register">Register here</router-link>
      </p>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth.js'

const email = ref('')
const password = ref('')
const authStore = useAuthStore()
const router = useRouter()
const successMessage = ref('')
const errorMessage = ref('')

const handleLogin = async () => {
  const response = await authStore.login(email.value, password.value)
  if (response) {
    successMessage.value = 'Login successful! Redirecting...'
    setTimeout(() => {
      router.push('/')
    }, 1000)
  } else {
    errorMessage.value = authStore.error || 'Login failed. Please try again.'
  }

  email.value = ''
  password.value = ''
}
</script>

<style scoped>
/* Container for the entire page */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f2f2f2;
  font-family: 'Arial', sans-serif;
}

/* Centered login box */
.login-box {
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

/* Title styling */
.login-title {
  text-align: center;
  font-size: 28px;
  color: #333;
  margin-bottom: 20px;
}

/* Form styling */
.login-form {
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
  background-color: #0056b3;
}

/* Register link */
.register-link {
  text-align: center;
  margin-top: 20px;
}

.register-link a {
  color: #007bff;
  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
}

/* Alert Styles */
.alert {
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
  font-size: 16px;
}

.success {
  background-color: #28a745;
  color: white;
}

.error {
  background-color: #dc3545;
  color: white;
}

/* Container for the entire page */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f2f2f2;
  font-family: 'Arial', sans-serif;
}

/* Centered login box */
.login-box {
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

/* Title styling */
.login-title {
  text-align: center;
  font-size: 28px;
  color: #333;
  margin-bottom: 20px;
}

/* Form styling */
.login-form {
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
  background-color: #0056b3;
}

/* Register link */
.register-link {
  text-align: center;
  margin-top: 20px;
}

.register-link a {
  color: #007bff;
  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>
