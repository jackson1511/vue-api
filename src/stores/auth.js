import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { defineStore } from 'pinia'

// Define the Auth store using Pinia
export const useAuthStore = defineStore('auth', {
  state: () => ({
    loading: false,
    error: null,
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null, // Store token in localStorage for persistence
    isAuthenticated: localStorage.getItem('authenticated'),
  }),

  getters: {
    // Check if the user is authenticated and token is not expired
    isLoggedIn: (state) => {
      return !!state.token && !state.checkTokenExpiration(state.token)
    },
  },

  actions: {
    // Login action
    async login(email, password) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.post('http://localhost:5000/api/v1/login', {
          email,
          password,
        })
        const { user, token } = response.data
        // Store the token and user data in state
        this.token = token
        this.user = user
        this.isAuthenticated = true

        // Save token to localStorage to persist login state
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))

        // Store the 'authenticated' flag as a string
        localStorage.setItem('authenticated', 'true') // Storing as string for consistency

        // Store roles as a JSON string (to handle multiple roles)
        // localStorage.setItem('roles', JSON.stringify(user.role))
        return response
      } catch (error) {
        // Enhanced error handling
        if (error.response) {
          this.error = error.response.data.message || 'Something went wrong!'
        } else {
          this.error = error.message || 'An unknown error occurred'
        }

        // Clear localStorage and reset authentication state
        this.isAuthenticated = false
        this.token = null
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('authenticated')
        localStorage.removeItem('roles')
      } finally {
        this.loading = false
      }
    },

    // Logout action
    logout() {
      // Reset store state
      this.token = null
      this.user = null
      this.isAuthenticated = false

      // Remove token from localStorage
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('authenticated')
    },

    // Token Expiration
    checkTokenExpiration(token) {
      if (!token) return true // If no token, treat it as expired

      try {
        const decodedToken = jwtDecode(token)
        const currentTime = Date.now() / 1000 // Get current time in seconds
        if (decodedToken.exp < currentTime) {
          // Handle token expiration: Log out the user or refresh token
          localStorage.clear()
          this.isAuthenticated = false
          return true
        }
        return false
      } catch (error) {
        console.error('Token decoding error:', error)
        return true // In case of error, consider it expired
      }
    },
  },
})
