<template>
  <div id="app">
		<Header />

		<!--<TopBar-->
				<!--@showUpdater="showUpdater = true"-->
		<!--/>-->

		<div id="wrapper">

			<!--<Updater-->
					<!--v-if="showUpdater"-->
					<!--:error="error"-->
					<!--@close="showUpdater = false"-->
			<!--/>-->

			<!--<Loading-->
					<!--v-if="loadingOn"-->
					<!--:message="loadingMessage"-->
					<!--:showWheel="loadingWheel"-->
			<!--/>-->
			<div :class="{container: $route.name !== 'bio'}">
				<router-view :key="this.viewKey"></router-view>
			</div>

		</div>

		<Footer />
  </div>
</template>

<script>
  import bus from './bus';
  import Footer from './components/Footer';
  import Loading from './components/Loading';
  import Updater from './components/Updater';
  import TopBar from './components/TopBar';
  import Header from './components/Header';

  export default {
    name: 'App',

    data () {
      return {
        error: '',
        loadingOn: true,
        loadingMessage: 'Loading WP Vue',
        loadingWheel: true,
        showUpdater: false,
        viewKey: 0,
      }
    },

    created: function () {

      this.assignEndpointFromURL();

      bus.$on('toggleLoading', (status = true) => {

        if(typeof status === 'string') {
          this.loadingOn = true;
          this.showWheel = false;
          this.loadingMessage = status;
          return;
        }

        this.loadingMessage = 'Loading...';
        this.loadingWheel = true;
        this.loadingOn = status;
      });

      bus.$on('bumpViewKey', (loadingMessage) => {
        bus.$emit('toggleLoading', loadingMessage);
        this.viewKey = this.viewKey + 1;
      });

      bus.$on('showUpdater', (errorMessage) => {
        this.showUpdater = true;
        this.error = errorMessage;
      });

      bus.$on('clearError', () => {
        this.error = '';
      });
    },

    methods: {
      assignEndpointFromURL: function () {
        let endpoint = this.getQueryString('endpoint');

        if(!endpoint) return;

        this.$store.commit('updateEndpoint', endpoint);
      }
    },

    components: {
      Header,
      Footer,
      Loading,
      Updater,
      TopBar
    }
  }
</script>

<style lang="scss">
  @import "assets/scss/_base.scss";

  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #wrapper {
    margin: 0 auto;
		min-height: 400px;
  }
</style>
