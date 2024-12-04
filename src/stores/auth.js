import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { defineStore } from 'pinia'

// Define the Auth store using Pinia
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null, // Store token in localStorage for persistence
    isAuthenticated: localStorage.getItem('authenticated'),
  }),

  getters: {
    // Check if the user is authenticated and token is not expired
    isLoggedIn: (state) => {
      // Check if token exists and is valid (not expired)
      return !!state.token && !state.checkTokenExpiration(state.token)
    },
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

        const { user, token } = response.data

        // Store the token and user data in state
        this.token = token
        this.user = user
        this.isAuthenticated = true

        // Save token to localStorage to persist login state
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('authenticated', true)
        localStorage.setItem('roles', JSON.stringify(user.role))

        console.log('user', user)
      } catch (error) {
        console.error('Login error:', error)
        this.isAuthenticated = false
        this.token = null
        localStorage.removeItem('token')
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
          // Token has expired
          this.logout() // Optionally logout if expired
          return true
        }
        return false
      } catch (error) {
        console.error('Token decoding error:', error)
        return true // In case of error, consider it expired
      }
    },

    // Change password action
    async changePassword(oldPassword, newPassword, confirmPassword) {
      try {
        const response = await axios.patch('http://localhost:5000/api/v1/users/setting-password', {
          oldPassword,
          newPassword,
          confirmPassword,
        })
        console.log(response.data)
      } catch (error) {
        console.error(error)
      }
    },
  },
})
