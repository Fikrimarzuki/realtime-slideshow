<template>
  <div id="app">
    <div class="container">
      <Carousel/>
    </div>
  </div>
</template>

<script>
import Carousel from './components/Carousel.vue'

export default {
  name: 'App',
  components: {
    Carousel
  }
}
</script>

<style>
  * {
    margin: 0
  }
  .container {
    margin: 2.5% 10%;

  }
</style>
