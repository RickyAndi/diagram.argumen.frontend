/* eslint-disable */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
// import VeeValidate from 'vee-validate';
// import App from './App';
import Argument from './Argument';

Vue.config.productionTip = false;

//Vue.use(VeeValidate);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<Argument/>',
  components: { Argument },
});
