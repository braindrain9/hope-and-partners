import Vue from 'vue';
import Vuex from 'vuex';
import bus from '../bus';
import modules from './modules'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    endpoint: REST_ENDPOINT
  },

  mutations: {
    updateEndpoint (state, endpoint) {
      state.endpoint = endpoint;
      bus.$emit('clearError');
      bus.$emit('bumpViewKey', 'Updating content...');
    }
  },

  modules
});
