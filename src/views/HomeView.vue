<script setup>
import { ref } from 'vue'
const show = ref(true)
</script>

<template>
  <main>
    <h1>Home</h1>
    <button @click="show = !show">Toggle</button>
    <Transition>
      <p v-if="show">hello</p>
    </Transition>
  </main>
</template>

<style>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
