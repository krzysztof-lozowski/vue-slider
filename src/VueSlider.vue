<template>
  <div v-if="!hasError" class="vue-slider" :class="mainClass" :style="{ width: sliderSize.width + sliderSize.unit }">
    <div class="vue-slider__container">
      <ul  ref="slidesEl" class="vue-slider__slides" :style="{ transitionDuration: slideTransitionDuration + 'ms' }">
        <VueSlide :clone="true" :slide="slides[slides.length - 1]" :slideHeight="sliderSize.height + sliderSize.unit" />
        <VueSlide v-for="(slide, index) in slides" v-bind:key="index" :slide="slide" :slideHeight="sliderSize.height + sliderSize.unit" />
        <VueSlide :clone="true" :slide="slides[0]" :slideHeight="sliderSize.height + sliderSize.unit" />
      </ul>
      <div class="vue-slider__arrows">
        <button @click="moveLeft(); resetAutoplay();" class="vue-slider__arrow--left">&lt;</button>
        <button @click="moveRight(); resetAutoplay();" class="vue-slider__arrow--right">&gt;</button>
      </div>
      <div class="vue-slider__steps">
        <button v-for="(slide, index) in slides" v-bind:key="index" @click="moveTo(index); resetAutoplay();">{{ slide.content }}</button>
      </div>
    </div>
    <span v-if="autoplay">Autoplay włączony</span>
    <span v-else>Autoplay wyłączony</span>
  </div>
</template>

<script>
  import { ref, onMounted } from 'vue';
  import VueSlide from './components/VueSlide.vue';

  export default {
    name: 'VueSlider',
    components: {
      VueSlide
    },
    props: {
      autoplay: {
        type: Boolean,
        default: true, 
      },
      mainClass: {
        type: String,
        required: false
      },
      responsive: {
        type: Boolean,
        default: true,
      },
      slideInterval: {
        type: Number,
        default: 5000
      },
      slideTransitionDuration: {
        type: Number,
        default: 500
      },
      slides: {
        type: Array,
        default: function () {
          return [
            { 
              overlay: true, 
              content: 1, 
              background: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1171&q=80'
            },
            { 
              overlay: true, 
              content: 2, 
              background: 'https://images.unsplash.com/photo-1583244685026-d8519b5e3d21?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80' 
            },
            { 
              overlay: true, 
              content: 3, 
              background: 'https://images.unsplash.com/photo-1532901945832-bdf4f9e008fa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80' 
            },
          ]
        }
      }
    },
    setup (props) {
      const hasError = ref(false);
      const activeSlide = ref(0);
      const autoplayInterval = ref(null);
      const sliderSize = ref({
        width: 0,
        height: 0,
        unit: 'px'
      });
      const slidesEl = ref(null);
      const slidesPosition = ref('');

      onMounted(() => {
        init();
      });

      const init = function() {
        if (props.responsive) {
          getScreenSize();

          window.onresize = () => {
            getScreenSize();
            moveTo(activeSlide.value);
          }
        } else {
          // przypisz podane wymiary
        }
        
        moveTo(0, true);
        startAutoplay();
      }

      const startAutoplay = function () {
        if (props.autoplay) {
          autoplayInterval.value = setInterval(() => {
            moveRight();
          }, props.slideInterval);
        }
      }

      const resetAutoplay = function () {
        if (props.autoplay && autoplayInterval.value !== null) {
          clearInterval(autoplayInterval.value);
        }
        startAutoplay();
      }

      const getScreenSize = function() {
        sliderSize.value = {
          width: document.body.clientWidth,
          height: window.innerHeight,
          unit: 'px'
        };
      }

      const moveLeft = function() {
        activeSlide.value -= 1;
        slidesPosition.value = -(activeSlide.value + 1) * sliderSize.value.width;
        slidesEl.value.style.transform = 'translate3d(' + slidesPosition.value + sliderSize.value.unit + ', 0, 0)';

        // check if active slide is a clone slide
        if (activeSlide.value === -1) {
          moveTo(props.slides.length - 1);
        }
      }

      const moveRight = function() {
        activeSlide.value += 1;
        slidesPosition.value = -(activeSlide.value + 1) * sliderSize.value.width;
        slidesEl.value.style.transform = 'translate3d(' + slidesPosition.value + sliderSize.value.unit + ', 0, 0)';

        // check if active slide is a clone slide
        if (activeSlide.value === props.slides.length) {
          setTimeout(() => {
            moveTo(0, true);
          }, props.slideTransitionDuration);
        }
      }

      const moveTo = function(slideIndex, noTransition = false) {
        if (typeof(slideIndex) !== 'number') {
          console.error('SlideIndex must be a number.')
        }

        if (noTransition) {
          slidesEl.value.classList.add('vue-slider__slides--no-transition');
        }

        activeSlide.value = slideIndex;
        slidesPosition.value = -(slideIndex + 1) * sliderSize.value.width;
        slidesEl.value.style.transform = 'translate3d(' + slidesPosition.value + sliderSize.value.unit + ', 0, 0)';

        if (noTransition) {
          slidesEl.value.offsetHeight;
          slidesEl.value.classList.remove('vue-slider__slides--no-transition');
        }
      }

      return {
        hasError,
        activeSlide,
        sliderSize,
        slidesEl,
        slidesPosition,
        moveLeft,
        moveRight,
        moveTo,
        resetAutoplay,
      }
    }
  }
</script>

<style lang="scss">
  .vue-slider__container {
    box-sizing: border-box;
    position: relative;
    width: 100%;
    overflow: hidden;
    > ul.vue-slider__slides {
      padding: 0;
      margin: 0;
      list-style: none;
      display: flex;
      flex-wrap: nowrap;
      flex-shrink: 0;
      transform: translate3d(0, 0, 0);
      transition-property: transform;
      transition-duration: 500ms;
      transition-timing-function: ease-in-out;
      transition-delay: 0s;
      &.vue-slider__slides--no-transition {
          transition-property: none;
          transition-duration: 0ms;
          transition-timing-function: unset;
      }
      > li.vue-slider__slide {
        position: relative;
        display: block;
        min-width: 100%;
        background-size: cover;
        background-position: center center;
        .vue-slider__overlay {
          background: radial-gradient(circle,rgba(63,94,251,0) 0,rgba(0,0,0,.925) 100%);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>