<template>
  <div class="vue-slider">
    <span v-if="autoplay">Autoplay włączony</span>
    <span v-else>Autoplay wyłączony</span>
  </div>
</template>

<script>
  import { ref } from 'vue'

  export default {
    name: 'VueSlider',
    props: {
      autoplay: {
        type: Boolean,
        default: false, 
      }
    },
    setup () {
      const value = ref('jakaś warość')
      console.log('setup działa')

      return {
        value
      }
    }
  }
</script>