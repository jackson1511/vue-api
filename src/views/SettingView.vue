<template>
  <div style="padding: 0 40px">
    <h2>Setting</h2>
    <hr />
    <div class="user-info">
      <div style="display: flex; justify-content: space-between; align-items: center">
        <h4>User Info</h4>
        <button class="btn-action" @click="handleEdit">Edit</button>
      </div>
      <div>
        <p>Username: {{ user.username }}</p>
        <p>Email: {{ user.email }}</p>
        <p>Age: {{ user.age }}</p>
      </div>
    </div>

    <div class="roles">
      <h4>Roles</h4>
      <p v-for="role in roles" :key="role">{{ role }}</p>
    </div>

    <div class="password">
      <h4>Password</h4>
      <div style="width: 40%; display: flex; flex-direction: column; gap: 10px">
        <input type="password" placeholder="old password" v-model="oldPassword" />
        <input type="password" placeholder="new password" v-model="newPassword" />
        <input type="password" placeholder="confirm password" v-model="confirmPassword" />
        <button class="btn-action" @click="handleChangePassword">Change Password</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSetting } from '@/composables/useSetting'
import { ref } from 'vue'

const user = JSON.parse(localStorage.getItem('user'))
const roles = user.role

const { changePassword } = useSetting()

const oldPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

const handleChangePassword = async () => {
  await changePassword(oldPassword.value, newPassword.value, confirmPassword.value)
  oldPassword.value = ''
  newPassword.value = ''
  confirmPassword.value = ''
}

const handleEdit = () => {}
</script>
<style scoped>
.user-info {
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
  font-family: 'Courier New', Courier, monospace;
}
.btn-action {
  cursor: pointer;
  padding: 5px 10px;
}
.roles {
  background-color: #f0f0f0;
  margin-top: 10px;
  padding: 10px;
  border-radius: 5px;
  font-family: 'Courier New', Courier, monospace;
}
.password {
  background-color: #f0f0f0;
  margin-top: 10px;
  padding: 10px;
  border-radius: 5px;
  font-family: 'Courier New', Courier, monospace;
}
input {
  padding: 5px;
}
</style>
