<template>
  <div class="no-access">
    <h1>Access Denied</h1>
    <p>You do not have permission to view this page.</p>
    <router-link to="/">Go Back to Home</router-link>
  </div>
</template>

<script>
export default {
  name: 'NoAccess',
}
</script>

<style scoped>
.no-access {
  text-align: center;
  margin-top: 50px;
}
</style>
