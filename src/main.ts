import Vue from 'vue';
import AppComponent from '@/App.component.vue';

Vue.config.errorHandler = function (err, vm, info) {
  // handle error
  // `info` is a Vue-specific error info, e.g. which lifecycle hook
  // the error was found in. Only available in 2.2.0+
  // console.log('Custom vue error handler: ', err, vm.name, info);
};
Vue.config.warnHandler = function (err, vm, info) {
  // handle error
  // `info` is a Vue-specific error info, e.g. which lifecycle hook
  // the error was found in. Only available in 2.2.0+
  // console.log('Custom vue warn handler: ', err, vm.name, info);
};
// Prevent vue from spamming the console with "helpful" tips
Vue.config.productionTip = false;

new Vue({
  render: h => h(AppComponent)
}).$mount('#app');
