<template>
  <div id="app">
    <img alt="Vue logo" src="../public/icone/icon-above-font.png" width="200px" class="app__img">
    <HelloWorld msg="Groupomania app for employer"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
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
  margin-top: 60px;
  &__img {
    margin-bottom: 10px;
  }
}
</style>
