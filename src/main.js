import 'babel-polyfill';
import _ from 'lodash';
import Vue from 'vue';
import VueAnalytics from 'vue-analytics';
import VueLazyload from 'vue-lazyload'
import App from './App.vue';
import router from './router';
import utils from './mixins/utils';
import store from './store';

import VueAwesomeSwiper from 'vue-awesome-swiper'

import { Navbar } from 'bootstrap-vue/es/components';

Vue.mixin(utils);

//-- Initialize Google Analytics tracking.
Vue.use(VueAnalytics, {
  id: GA_TRACKING_ID,
  router
});
Vue.use(VueLazyload);
Vue.use(Navbar);
Vue.set(Vue.prototype, '_', _);
Vue.use(VueAwesomeSwiper);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app');
