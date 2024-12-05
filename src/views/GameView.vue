<template>
  <div>
    <div style="display: flex; justify-content: space-between; align-items: center">
      <h2>Game</h2>
      <button @click="startGame">Start Game</button>
    </div>

    <main>
      <section class="quiz">
        <h3>Quiz</h3>
        <p>
          Definition :
          <!-- definition of the word -->
          <span>{{ definition }}</span>
        </p>
      </section>

      <section class="answer">
        <h3>Vocabulary : {{ vocabulary }}</h3>
        <!-- vocabulary of definition -->
        <input type="text" v-model="inputValue" />
        <button @click="submitAnswer">Submit</button>
      </section>

      <!-- Letter grid -->
      <section style="background-color: aliceblue; padding: 20px; border-radius: 5px">
        <div class="container">
          <div class="grid">
            <div v-for="letter in alphabet" :key="letter" class="letter-box">
              <p>{{ letter }}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Create a reactive reference for the alphabet array
const alphabet = ref(Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)))

const sports = ref([])
const vocabulary = ref('')
const definition = ref('')
const inputValue = ref('')

// start game
const startGame = () => {
  console.log('Game started')
  //  get data random from array of sports
  const randomIndex = Math.floor(Math.random() * sports.value.length)
  vocabulary.value = sports.value[randomIndex].word
  definition.value = sports.value[randomIndex].definition
  // console.log(sports.value[randomIndex])
}

const submitAnswer = () => {
  if (inputValue.value === vocabulary.value) {
    console.log('Correct')
  } else {
    console.log('Not Correct')
  }
}

// Fetching sports data on component mount
onMounted(async () => {
  try {
    const response = await fetch('http://localhost:5001/sports') // Make sure this URL is correct
    const data = await response.json()
    // console.log(data)
    sports.value = data
  } catch (error) {
    console.error('Failed to fetch data:', error)
  }
})
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

.quiz,
.answer {
  background-color: aliceblue;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 20px;
}

button {
  cursor: pointer;
}
</style>
