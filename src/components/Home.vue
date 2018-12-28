<template>
	<full-page ref="fullpage" :options="options" id="fullpage">
			<div class="section">
				<Hero/>
			</div>
			<div class="section">
				<b-container class="section-container overflow-container">
					<About />
					<Footer link="services"/>
				</b-container>
			</div>
			<div class="section">
				<Services/>
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
				<Contacts />
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
  // import * as Three from 'three';
  // import {TweenMax, Power2, Elastic} from "gsap/TweenMax";

  export default {
    name: 'Home',

		data() {
      return {
        options: {
          menu: '#menu',
          anchors: ['hero', 'about', 'services', 'partners', 'cases', 'contacts'],
          scrollOverflow: true,
          scrollingSpeed: 600,
          controlArrows: false,
					onLeave: this.onLeave,
          afterLoad: this.afterLoad,
          onSlideLeave: this.onSlideLeave,
          afterSlideLoad: this.afterSlideLoad
        }
			}
		},

    created: function () {
      bus.$emit('toggleLoading', false);
    },

		methods: {
      onLeave: function(origin, destination, direction) {
				if(origin.anchor === 'services' && this.$store.state.sliding) {
          if(direction === 'down') {
            fullpage_api.moveSlideRight();
            this.$store.commit('updateSliding', true);
            return false;
          } else if (direction === 'up') {
            fullpage_api.moveSlideLeft();
            this.$store.commit('updateSliding', true);
            return false;
          }
        }
      },
      onSlideLeave: function(section, origin, destination, direction) {
        if(section.anchor === 'services') {
          if(origin.isLast && direction === 'right') {
            this.$store.commit('updateSliding', false);
            fullpage_api.moveSectionDown();
          } else if (origin.isFirst && direction === 'left') {
            this.$store.commit('updateSliding', false);
            fullpage_api.moveSectionUp();
          }
        }
      },
      afterLoad: function(origin, destination, direction) {
        if(origin) {
          if(origin.anchor === 'about') {
            if(direction === 'down') {
              this.goToServicesFirstSlide();
            }
          }
				}

				if(destination) {
					if (destination.anchor === 'services') {
						bus.$emit('animateServices', $('.services-slider .slide.active .letter').text());
						this.$store.commit('updateSliding', true);
					}

					if (destination.anchor === 'hero') {
						bus.$emit('animateHero', '&');
					}

					if (destination.anchor === 'contacts') {
						bus.$emit('animateContacts', '@');
					}
				}
      },
      afterSlideLoad: function() {
        console.log('slide loaded');
        bus.$emit('animateServices', $('.services-slider .slide.active .letter').text());
			}
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

<style lang="scss">
	.section {
		background: $base-black;
	}

	.section-container {
		padding-top: 100px; // compensate fixed header
		position: relative;
		z-index: 1;

		&.services-section {
			padding-top: 150px;
			height: 100%;
		}
	}

	.overflow-container {
		// switch to new section does not allow to see a footer
		padding-bottom: 100px;
	}
</style>