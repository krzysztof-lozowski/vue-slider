# Webpraktyk Vue Slider
Vue Slider to darmowy komponent do tworzenia slajderów. 
Komponent jest kompatybilny z **Vue 3**, w pełni responsywny oraz konfigurowalny.
Zapraszam do sprawdzenia.

## Bez zależności
Żeby skorzystać z komponentu wystarczy postawiona aplikacja Vue 3, nic więcej.

## Instalacja
Zalecanym sposobem na dodanie komponentu do projektu jest pobranie go korzystając w Node Packages Manager.

```sh
npm i webpraktyk-vue-slider
```

## Przykładowe użycie
#### Globalne użycie
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
#### W komponencie
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
## Konfiguracja
Opcje przekazujemy jako **props** 

Więcej informacji:
https://v3.vuejs.org/guide/component-props.html

#### autoplay
___
Włączenie lub wyłączenie automatycznego przełączania slajdów.
Type: **Boolean**
Default: **true**

#### mainClass
___
Dodanie niestandardowej klasy do głównego bloku.
Type: **String**
Required: **false**

#### responsive
___
W przypadku włączenia wymiary są dostosowane do wielkości przeglądarki/urządzenia 
Type: **Boolean**
Default: **true**

#### slideInterval
___
Okres czasu po jakim ma nastąpić przełączenie slajdu, warość podana w milisekundach.
Type: **Number**
Default: **5000**

#### slideTransitionDuration
___
Czas trwania animacji pomiędzy slajdami, warość podana w milisekundach.
Type: **Number**
Default: **500**

#### slides
___
Informacje o slajdach przekazywana w formie tablicy obiektów. 
Przykład został podany wyżej.

Type: **Array**
Default: **true**

Obiekt może posiadać takie wartości jak:
**overlay** - type: Boolean - dodanie ciemnego tła aby tekst na slajach był bardziej wyraźny
**slideName** - type: String - nazwa slajdu, wyświetlana w formie przycisku z możliwością przełączenia
**background** - type: String - adres URL obrazka


## Licencja
MIT