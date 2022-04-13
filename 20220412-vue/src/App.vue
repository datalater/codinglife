<template>
  <div id="app">
    <img
      alt="Vue logo"
      src="./assets/logo.png"
    >
    <HelloWorld msg="aWelcome to Your Vue.js App" />
    <div class="card">
      <div class="card__header">
        <h1 class="card__title">
          {{ title }}
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue"


export default {
  name: 'App',
  components: {
    HelloWorld
  },
  setup() {
    return {
      title: 'title'
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.card {
  border: 1px solid;
}
</style>
