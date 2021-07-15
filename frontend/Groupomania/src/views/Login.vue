<template>
  <div class="Login">
    <img alt="Vue logo" src="../assets/logo.png" width="200px">
    <Login/>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue'

export default {
  name: 'Home',
  components: {
    Login
  }
}
</script>
