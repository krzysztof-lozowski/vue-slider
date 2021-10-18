<template>
  <div v-if="!hasError" class="vue-slider" :class="mainClass" :style="{ width: sliderSize.width + sliderSize.widthUnit }">
    <div class="vue-slider__container">
      <ul  ref="slidesEl" class="vue-slider__slides" :style="{ transitionDuration: slideTransitionDuration + 'ms' }">
        <VueSlide :clone="true" :slide="slides[slides.length - 1]" :slideHeight="sliderSize.height + sliderSize.heightUnit" />
        <VueSlide v-for="(slide, index) in slides" v-bind:key="index" :slide="slide" :slideHeight="sliderSize.height + sliderSize.heightUnit" />
        <VueSlide :clone="true" :slide="slides[0]" :slideHeight="sliderSize.height + sliderSize.heightUnit" />
      </ul>
      <div v-if="showArrowButtons" class="vue-slider__arrows">
        <button @click="moveLeft(); resetAutoplay();" class="vue-slider__arrow vue-slider__arrow--left">&lt;</button>
        <button @click="moveRight(); resetAutoplay();" class="vue-slider__arrow vue-slider__arrow--right">&gt;</button>
      </div>
      <div v-if="showSlideButtons" class="vue-slider__steps">
        <button v-for="(slide, index) in slides" v-bind:key="index" class="vue-slider__step" :class="{ 'vue-slider__step--active': activeSlide === index }" @click="moveTo(index); resetAutoplay();">{{ slide.buttonName }}</button>
      </div>
      <div class="vue-slider__content">
        <slot></slot>
      </div>
    </div>
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
        required: false
      },
      mainClass: {
        type: String,
        required: false
      },
      responsive: {
        type: Boolean,
        default: true,
        required: false
      },
      showArrowButtons: {
        type: Boolean,
        default: true,
      },
      showSlideButtons: {
        type: Boolean,
        default: true,
      },
      slideInterval: {
        type: Number,
        default: 5000,
        required: false
      },
      slideTransitionDuration: {
        type: Number,
        default: 500,
        required: false
      },
      sliderHeight: {
        type: String,
        required: false
      },
      sliderWidth: {
        type: String,
        required: false
      },
      slides: {
        type: Array,
        required: true,
      }
    },
    setup (props) {
      const hasError = ref(false);
      const activeSlide = ref(0);
      const autoplayInterval = ref(null);
      const sizeRegex = new RegExp(/^(\d*\.?\d+)\s?(px|em|rem|%|vw|vh+)$/);
      const sliderSize = ref({
        width: 0,
        height: 0,
        widthUnit: 'px',
        heightUnit: 'px'
      });
      const slidesEl = ref(null);
      const slidesPosition = ref('');

      onMounted(() => {
        init();

        if (!hasError.value && props.responsive) {
          setTimeout(() => {
            getScreenSize();
            moveTo(activeSlide.value);
          }, 10)
        }
      });

      const init = function() {
        if (props.responsive) {
          getScreenSize();

          window.onresize = () => {
            getScreenSize();
            moveTo(activeSlide.value, true);
          }
        } else {
          if (!sizeRegex.test(props.sliderWidth)) {
            console.error('Props sliderWidth is invalid.');
            hasError.value = true;
          } else {
            var width = props.sliderWidth.match(sizeRegex);

            if (width !== null) {
              sliderSize.value.width = parseInt(width[1]);
              sliderSize.value.widthUnit = width[2];
            }
          }

          if (!sizeRegex.test(props.sliderHeight)) {
            console.error('Props sliderHeight is invalid.');
            hasError.value = true;
          } else {
            var height = props.sliderHeight.match(sizeRegex);

            if (height !== null) {
              sliderSize.value.height = parseInt(height[1]);
              sliderSize.value.heightUnit = height[2];
            }
          }
        }
        
        if (!hasError.value) {
          moveTo(0, true);
          startAutoplay();
        }
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
          widthUnit: 'px',
          heightUnit: 'px',
        };
      }

      const moveLeft = function() {
        activeSlide.value -= 1;
        slidesPosition.value = -(activeSlide.value + 1) * sliderSize.value.width;
        slidesEl.value.style.transform = 'translate3d(' + slidesPosition.value + sliderSize.value.widthUnit + ', 0, 0)';

        // check if active slide is a clone slide
        if (activeSlide.value === -1) {
          moveTo(props.slides.length - 1);
        }
      }

      const moveRight = function() {
        activeSlide.value += 1;
        slidesPosition.value = -(activeSlide.value + 1) * sliderSize.value.width;
        slidesEl.value.style.transform = 'translate3d(' + slidesPosition.value + sliderSize.value.widthUnit + ', 0, 0)';

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
        slidesEl.value.style.transform = 'translate3d(' + slidesPosition.value + sliderSize.value.widthUnit + ', 0, 0)';

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
