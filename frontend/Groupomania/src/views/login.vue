<template>
  <div class="login">
    <img alt="Vue logo" src="../assets/logo.png" width="200px">
    <login/>
  </div>
</template>

<script>
// @ is an alias to /src
import login from '@/components/login.vue'

export default {
  name: 'login',
  components: {
    login
  }
}
</script>
