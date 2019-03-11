import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    content_endpoint: 'https://hopeandpart.com/wp-content/themes/wp-vue/',
    content: {}
  },

  mutations: {
    updateGeneralContent (state, content) {
      state.content = content;
    }
  }
});
