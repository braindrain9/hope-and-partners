<template>
	<full-page ref="fullpage" :options="options" id="fullpage">
			<div class="section">
				<b-container class="section-container">
					<Hero/>
					<Footer link="about"/>
				</b-container>
			</div>
			<div class="section">
				<b-container class="section-container overflow-container">
					<About />
					<Footer link="services"/>
				</b-container>
			</div>
			<div class="section">
				<b-container class="section-container">
					<Services />
					<Footer link="partners"/>
				</b-container>
			</div>
			<div class="section partners-container">
				<Partners />
			</div>
			<div class="section">
				<b-container class="section-container">
					<Cases />
					<Footer link="contacts"/>
				</b-container>
			</div>
			<div class="section">
				<b-container class="section-container">
					<Contacts />
					<Footer is-final-mode="true"/>
				</b-container>
			</div>
		</full-page>
</template>

<script>
  import bus from '../bus';
  import Hero from './Hero';
  import About from './About';
  import Partners from './Partners';
  import Services from './Services';
  import Cases from './Cases';
  import Contacts from './Contacts';
  import Footer from './Footer';

  export default {
    name: 'Home',

		data() {
      return {
        options: {
          menu: '#menu',
          anchors: ['hero', 'about', 'services', 'partners', 'cases', 'contacts'],
          scrollOverflow: true,
          scrollingSpeed: 600,
          navigation: true
        }
			}
		},

    created: function () {
      bus.$emit('toggleLoading', false);
    },

		components: {
      About,
			Hero,
			Partners,
			Services,
			Cases,
			Contacts,
      Footer
		}
  }
</script>

<style scoped lang="scss">
	.section {
		background: $base-black;
	}

	.section-container {
		padding-top: 100px; // compensate fixed header
	}

	.overflow-container {
		// switch to new section does not allow to see a footer
		padding-bottom: 100px;
	}
</style>