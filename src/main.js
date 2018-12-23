import 'babel-polyfill';
import _ from 'lodash';
import Vue from 'vue';
import VueAnalytics from 'vue-analytics';
import VueLazyload from 'vue-lazyload'
import App from './App.vue';
import router from './router';
import utils from './mixins/utils';
import store from './store';

import 'fullpage.js/vendors/scrolloverflow'; // Optional. When using scrollOverflow:true
// import './fullpage.scrollHorizontally.min'; // Optional. When using fullpage extensions
import VueFullPage from 'vue-fullpage.js';
import 'fullpage.js/dist/fullpage.css';

import AOS from 'aos';
import 'aos/dist/aos.css';

import VueAwesomeSwiper from 'vue-awesome-swiper'

import BootstrapVue from 'bootstrap-vue';

Vue.mixin(utils);

//-- Initialize Google Analytics tracking.
Vue.use(VueAnalytics, {
  id: GA_TRACKING_ID,
  router
});
Vue.use(VueLazyload);
Vue.use(BootstrapVue);
Vue.set(Vue.prototype, '_', _);
Vue.directive('aos', AOS);
Vue.use(VueFullPage);
Vue.use(VueAwesomeSwiper);

new Vue({
  el: '#app',
  router,
  store,
  created () {
    AOS.init()
  },
  render: h => h(App)
}).$mount('#app');
