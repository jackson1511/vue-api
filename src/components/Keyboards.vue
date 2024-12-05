<template>
  <section style="background-color: aliceblue; padding: 20px; border-radius: 5px">
    <div class="container">
      <div class="grid">
        <div v-for="letter in alphabet" :key="letter" class="letter-box">
          <p>{{ letter }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

// Create a reactive reference for the alphabet array
const alphabet = ref(Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)))
</script>

<style scoped>
.container {
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
}

.grid {
  display: grid;
  grid-template-columns: repeat(13, 1fr); /* Adjust for 2 rows, 13 columns each */
  grid-gap: 10px;
  width: 100%;
  max-width: 700px; /* Limit the grid width */
}

.letter-box {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ccc;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
}

.letter-box:hover {
  background-color: #bbb;
}
</style>
