import 'babel-polyfill';
import _ from 'lodash';
import Vue from 'vue';
import VueLazyload from 'vue-lazyload'
import App from './App.vue';
import router from './router';
import utils from './mixins/utils';
import store from './store';
import VueResource from 'vue-resource';

import VueAwesomeSwiper from 'vue-awesome-swiper';

import {Navbar} from 'bootstrap-vue/es/components';
import {i18n} from './i18n';

Vue.mixin(utils);

Vue.use(VueLazyload, {
  lazyComponent: true
});

Vue.use(VueResource);
Vue.use(Navbar);
Vue.set(Vue.prototype, '_', _);
Vue.use(VueAwesomeSwiper);

Vue.http.options.root = 'https://hopeandpart.com/wp-json/';

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
