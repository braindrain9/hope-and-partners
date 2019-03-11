// general
import 'babel-polyfill';
import _ from 'lodash';
import Vue from 'vue';
import VueLazyload from 'vue-lazyload';
import VueResource from 'vue-resource';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import {Navbar} from 'bootstrap-vue/es/components';

import router from './router';
import utils from './mixins/utils';
import store from './store';
import {i18n} from './i18n';

import App from './App.vue';

Vue.set(Vue.prototype, '_', _);
Vue.use(VueLazyload, {
  lazyComponent: true
});

Vue.use(VueResource);
Vue.use(Navbar);
Vue.use(VueAwesomeSwiper);

Vue.mixin(utils);

Vue.http.options.root = 'https://hopeandpart.com/wp-json/';

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');