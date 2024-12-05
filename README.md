# vue-api

## Pinia State Management

```sh
In Setup Stores:

ref()s become state properties
computed()s become getters
function()s become actions
```

### Installation

```sh
npm install pinia
```

### Setup pinia

```sh
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

const app = createApp(App);

app.use(createPinia());

app.mount('#app');
```

### Create store

```sh
# src/store/counterStore.js
import { defineStore } from 'pinia';
export const useCounterStore = defineStore(
  # store name
  'counter', {
  # hold state
  state: () => {
    return {
      count: 0
    };
  },
  # computed
  getters: {
    doubleCount(state) {
        return state.count * 2;
    }
  },
  # hold actions
  actions: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    }
  }
});
```

### Use store in component

```sh
<template>
  <div>
    <p>Count: {{ counter.count }}</p>
    <button @click="counter.increment">Increment</button>
    <button @click="counter.decrement">Decrement</button>
    <button @click="counter.doubleCount">Double</button>
  </div>
</template>

<script setup>
import { useCounterStore } from '@/stores/counterStore';

const counter = useCounterStore();
</script>
```
