<template>
  <div class="about">
    <img alt="Vue logo" src="../assets/logo.png" width="200px">
    <About/>
  </div>
</template>

<script>
import About from '@/components/About.vue'

export default {
  name: 'Home',
  components: {
    About
  }
}
</script>
