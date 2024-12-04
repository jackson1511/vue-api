<template>
  <div>
    <header>
      <nav class="navbar">
        <div class="logo">
          <router-link to="/">MyApp</router-link>
        </div>
        <ul class="nav-links">
          <li><router-link to="/" class="nav-link">Home</router-link></li>
          <li><router-link to="/post" class="nav-link">Posts</router-link></li>
        </ul>
        <div class="auth-actions">
          <button @click="hanldeLogout" class="logout-btn">Logout</button>
        </div>
      </nav>
    </header>
    <main>
      <slot></slot>
    </main>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
defineComponent({
  name: 'MainLayout',
})

const hanldeLogout = async () => {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
/* General Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Navbar Styles */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #2c3e50;
  color: white;
}

.navbar .logo a {
  font-size: 1.8rem;
  font-weight: bold;
  text-decoration: none;
  color: #ecf0f1;
}

.navbar .nav-links {
  list-style-type: none;
  display: flex;
  gap: 2rem;
}

.navbar .nav-link {
  text-decoration: none;
  color: #ecf0f1;
  font-size: 1rem;
  transition: color 0.3s ease;
}

.navbar .nav-link:hover {
  color: #3498db;
}

.navbar .auth-actions {
  display: flex;
  justify-content: flex-end;
}

.navbar .logout-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.navbar .logout-btn:hover {
  background-color: #c0392b;
}

/* Responsive Styling */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    align-items: center;
  }

  .navbar .nav-links {
    flex-direction: column;
    gap: 1rem;
  }

  .navbar .auth-actions {
    margin-top: 1rem;
  }
}
</style>
