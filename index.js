import VueSlider from "./src/VueSlider.vue"

VueSlider.install = function(Vue) {
  Vue.component(VueSlider.name, VueSlider);
};

export default VueSlider;