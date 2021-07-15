<template>
  <div class="About">
    <img alt="Vue logo" src="../assets/logo.png" width="200px">
    <Signup/>
  </div>
</template>

<script>
import Signup from '@/components/Signup.vue'

export default {
  name: 'About',
  components: {
    Signup
  }
}
</script>
