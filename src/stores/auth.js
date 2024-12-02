import axios from 'axios'
import { defineStore } from 'pinia'

// Define the Auth store using Pinia
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {} || null,
    token: localStorage.getItem('token') || null, // Store token in localStorage for persistence
    isAuthenticated: false,
  }),

  getters: {
    // Check if the user is authenticated
    isLoggedIn: (state) => !!state.token,
    /**
     * This code defines a getter named isLoggedIn in a Pinia store.
     * It checks if the user is authenticated by verifying the presence of a token in the store's state.
     * The !! operator converts the token value to a boolean,
     * => where null or undefined becomes false and any other value becomes true.
     *
     */
  },

  actions: {
    // Login action
    async login(email, password) {
      try {
        const response = await axios.post('http://localhost:5000/api/v1/login', {
          email,
          password,
        })

        // Store the token and user data in state
        this.token = response.data.token
        this.user = response.data.user 
        this.isAuthenticated = true

        // Save token to localStorage to persist login state
        localStorage.setItem('token', this.token)
      } catch (error) {
        console.error('Login error:', error)
        this.isAuthenticated = false
        this.token = null
        localStorage.removeItem('token')
      }
    },

    // Logout action
    logout() {
      this.token = null
      this.user = null
      this.isAuthenticated = false
      localStorage.removeItem('token')
    },
  },
})
