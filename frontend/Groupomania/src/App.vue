<template>
  <div id="app">
    <img alt="Vue logo" src="../public/icone/icon-above-font.png" width="200px" class="app__img">
    <login/>
  </div>
</template>

<script>
import login from './components/login.vue'

export default {
  name: 'App', 
  components: {
    login
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
</style>
