<template>
  <div class="todo-container" style="margin-top: 40px">
    <div v-for="item in data" :key="item.id" class="todo-card">
      <h4>{{ item.title }}</h4>
      <p>Status: {{ item.completed ? 'Completed' : 'Pending' }}</p>
      <div class="todo-actions">
        <button @click="editTodo(item.id)" class="edit-btn">Edit</button>
        <button @click="deleteTodo(item.id)" class="delete-btn">Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTodo } from '@/composables/useTodo'
import { onMounted } from 'vue'
const { getData, data } = useTodo()

onMounted(() => {
  getData()
})
</script>

<style scoped>
.todo-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.todo-card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  width: 250px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.todo-card:hover {
  transform: translateY(-5px);
}

.todo-actions {
  margin-top: 15px;
  display: flex;
  gap: 10px;
  justify-content: space-between;
}

.edit-btn,
.delete-btn {
  padding: 8px 12px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.edit-btn {
  background-color: #4caf50;
  color: white;
}

.delete-btn {
  background-color: #f44336;
  color: white;
}

.edit-btn:hover {
  background-color: #45a049;
}

.delete-btn:hover {
  background-color: #e53935;
}
</style>
