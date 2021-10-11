<template>
  <div v-if="!hasError" class="vue-slider" :class="mainClass" :style="{ width: sliderSize.width + sliderSize.unit }">
    <div class="vue-slider__container">
      <ul class="vue-slider__slides" :style="{ transform: 'translate3d(' + slidesPosition + sliderSize.unit + ', 0, 0)', transition: 'transform ' + slideTransitionDuration + 'ms ease-in-out' }">
        <li class="vue-slider__slide vue-slider__slide--clone" :style="{ height: sliderSize.height + sliderSize.unit }">
          {{ slides[slides.length - 1].content }}
        </li>
        <li v-for="(slide, index) in slides" v-bind:key="index" class="vue-slider__slide" :style="{ height: sliderSize.height + sliderSize.unit }">
          {{ slide.content }}
        </li>
        <li class="vue-slider__slide vue-slider__slide--clone" :style="{ height: sliderSize.height + sliderSize.unit }">
          {{ slides[0].content }}
        </li>
      </ul>
      <div class="vue-slider__arrows">
        <button @click="moveLeft" class="vue-slider__arrow--left">&lt;</button>
        <button @click="moveRight" class="vue-slider__arrow--right">&gt;</button>
      </div>
      <div class="vue-slider__steps">
        <button v-for="(slide, index) in slides" v-bind:key="index" @click="moveTo(index)">{{ slide.content }}</button>
      </div>
    </div>
    <span v-if="autoplay">Autoplay włączony</span>
    <span v-else>Autoplay wyłączony</span>
  </div>
</template>

<script>
  import { ref, onMounted } from 'vue'

  export default {
    name: 'VueSlider',
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
        default: 3000
      },
      slideTransitionDuration: {
        type: Number,
        default: 3000
      },
      slides: {
        type: Array,
        default: function () {
          return [
            { content: 1 },
            { content: 2 },
            { content: 3 },
          ]
        }
      },
      switchSpeed: {

      }
    },
    setup (props) {
      const hasError = ref(false);
      const activeSlide = ref(0);
      const autoplayInterval = ref(null);
      const slidesPosition = ref('');
      const sliderSize = ref({
        width: 0,
        height: 0,
        unit: 'px'
      });

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
        
        moveTo(0);

        if (props.autoplay) {
          autoplayInterval.value = setInterval(() => {
            moveRight();
          }, props.slideInterval)
        }
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

        // check if active slide is a clone slide
        if (activeSlide.value === -1) {
          moveTo(props.slides.length - 1);
        }
      }

      const moveRight = function() {
        activeSlide.value += 1;
        slidesPosition.value = -(activeSlide.value + 1) * sliderSize.value.width;

        // check if active slide is a clone slide
        if (activeSlide.value === props.slides.length) {
          moveTo(0);
        }
      }

      const moveTo = function(slideIndex) {
        if (typeof(slideIndex) !== 'number') {
          console.error('SlideIndex must be a number.')
        }

        activeSlide.value = slideIndex;
        slidesPosition.value = -(slideIndex + 1) * sliderSize.value.width;
      }

      return {
        hasError,
        activeSlide,
        sliderSize,
        slidesPosition,
        moveLeft,
        moveRight,
        moveTo,
      }
    }
  }
</script>

<style lang="scss" scoped>
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
      transition: transform 0ms ease-in-out;
      > li.vue-slider__slide {
        display: block;
        min-width: 100%;
        background-color: pink;
        &:nth-of-type(even) {
          background-color: yellow;
        }
      }
    }
  }
</style>