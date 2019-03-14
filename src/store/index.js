import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const isProd = process.env.NODE_ENV === 'production';

export default new Vuex.Store({
  state: {
    content_endpoint: isProd ? 'https://hopeandpart.com/wp-content/themes/wp-vue/' : '',
    content: {}
  },

  mutations: {
    updateGeneralContent (state, content) {
      state.content = content;
    }
  }
});
