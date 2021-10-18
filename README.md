# Webpraktyk Vue Slider
Webpraktyk Vue Slider is a no-dependencies, free Vue component slider and carousel.
This component is compatible with **Vue 3**, fully responsive and customizable.

Feel free to check it out. 

## No dependencies
Żeby skorzystać z komponentu wystarczy postawiona aplikacja Vue 3, nic więcej.
If you want to use it, all you need is the Vue 3 app

## Installation
NPM is a recommended way. 

```sh
npm i webpraktyk-vue-slider
```

## Sample usage
#### Global
```js
import Vue from 'vue'
import App from './App.vue'
import VueSlider from 'webpraktyk-vue-slider'

Vue.use(VueSlider)

new Vue({
  el: '#app',
  render: h => h(App)
})
```
#### In component
```html
<template>
  <div id="app">
    <VueSlider
        :autoplay="false"
        :slides="[
            { 
              overlay: true, 
              slideName: 'Slajd 1', 
              background: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1171&q=80'
            },
            { 
              overlay: true, 
              slideName: 'Slajd 2', 
              background: 'https://images.unsplash.com/photo-1583244685026-d8519b5e3d21?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80' 
            },
            { 
              overlay: true, 
              slideName: 'Slajd 3', 
              background: 'https://images.unsplash.com/photo-1532901945832-bdf4f9e008fa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80' 
            },
        ]"
    >
      <div>
        Tekst nad sliderem.
      </div>
    </VueSlider>
  </div>
</template>

<script>
import VueSlider from 'webpraktyk-vue-slider'

export default {
  components: {
    VueSlider
  }
}
</script>
```
## Configuration props

More information:
https://v3.vuejs.org/guide/component-props.html

#### autoplay
___
Enable or disable automatic slide switching.
Type: **Boolean**
Default: **true**

#### mainClass
___
Adds a custom class to the main block
Type: **String**
Required: **false**

#### responsive
___
If true, the dimensions are adapted to the size of the browser/device.
If false, you must declare sliderHeight and sliderWidth 
Type: **Boolean**
Default: **true**

#### showArrowButtons
___
Show arrow controls.
Type: **Boolean**
Default: **true**

#### showSlideButtons
___
Show slide buttons.
Type: **Boolean**
Default: **true**

#### slideInterval
___
Time for switching slides, in milliseconds
Type: **Number**
Default: **5000**

#### slideTransitionDuration
___
Duration of the animation between slides, in milliseconds
Type: **Number**
Default: **500**

#### sliderHeight
___
Height of slider. Acceptable units px, em, rem, %, vw, vh
**Used when responsive props is false.**
Type: **String**
Required: **false**

#### sliderWidth
___
Width of slider. Acceptable units px, em, rem, %, vw, vh
**Used when responsive props is false.**
Type: **String**
Required: **false**

#### slides
___
Slide data collection. It is a array of objects.
For example, slide up.

Type: **Array**
Required: **true**

The object may have values such as:

**overlay** - type: Boolean - additional darkened background

**buttonName** - type: String - slide name, displayed as a switchable button

**background** - type: String - address URL background image


## License
MIT