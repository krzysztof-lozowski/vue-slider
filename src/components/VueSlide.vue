<template>
  <li class="vue-slider__slide" :class="{'vue-slider__slide--clone': clone }" :style="{ height: slideHeight, backgroundImage: 'url(' + slide.background + ')' }">
    <div :class="{ 'vue-slider__overlay': slide.overlay }">
      <div class="vue-slider__slide-container">
        
      </div>
    </div>
  </li>
</template>

<script>
  export default {
    name: 'VueSlide',
    props: {
      clone: {
        type: Boolean,
        default: false
      },
      slideHeight: {
        type: String,
        required: true
      },
      slide: {
        type: Object,
        required: true
      }
    }
  }
</script>