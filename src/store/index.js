import Vue from 'vue';
import Vuex from 'vuex';
import bus from '../bus';
import modules from './modules'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    endpoint: REST_ENDPOINT,
    sliding: true,
    slidingPartners: true
  },

  mutations: {
    updateEndpoint (state, endpoint) {
      state.endpoint = endpoint;
      bus.$emit('clearError');
      bus.$emit('bumpViewKey', 'Updating content...');
    },
    updateSlidingPartners (state, value) {
      state.slidingPartners = value;
    },
    updateSliding (state, value) {
      state.sliding = value;
    }
  },

  modules
});
