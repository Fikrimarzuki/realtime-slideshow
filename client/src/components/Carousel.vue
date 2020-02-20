<template>
  <div>
    <div class="button-show">
      <b-button @click="next" class='next-button'>Next</b-button>
    </div>
    <div>
      <b-button @click="prev" class='prev-button'>Prev</b-button>
    </div>
    <div>
      <img :src="choosePict"/>
    </div>
    <h1 v-if="loading">NOW LOADING....</h1>
  </div>
</template>

<script>
import io from 'socket.io-client'
const socket = io.connect('http://localhost:3000')

export default {
  name: 'Carousel',
  data () {
    return {
      slide: 0,
      sliding: null,
      now: '',
      index: null,
      loading: false,
      picture: [
        'https://picsum.photos/1024/480/?image=52',
        'https://picsum.photos/1024/480/?image=54',
        'https://picsum.photos/1024/480/?image=58',
        'https://picsum.photos/1024/480/?image=55'
      ]
    }
  },
  methods: {
    next () {
      if (this.index === this.picture.length - 1) {
        this.index = 0
        this.now = this.picture[0]
      } else {
        this.index++
        this.now = this.picture[this.index]
      }
      this.loading = true
      socket.emit('nextSlide', this.index)
    },
    prev () {
      if (this.index === 0) {
        this.index = this.picture.length - 1
        this.now = this.picture[this.index]
      } else {
        this.index--
        this.now = this.picture[this.index]
      }
      this.loading = true
      socket.emit('prevSlide', this.index)
    }
  },
  computed: {
    choosePict () {
      return this.now
    }
  },
  created () {
    this.index = 0
    this.now = this.picture[0]
    socket.on('changeSlide', pict => {
      // console.log(pict)
      this.now = this.picture[pict]
      this.loading = false
    })
  }
}
</script>

<style scoped>
.next-button {
  position: absolute;
  top:30%;
}
.prev-button {
  position: absolute;
}
</style>
