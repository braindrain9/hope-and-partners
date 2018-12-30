<template>
	<full-page v-if="loaded" ref="fullpage" :options="options" id="fullpage">
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
				<Services :services="services"/>
			</div>
			<div class="section partners-container">
				<Partners :partners="partners"/>
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
        loaded: false,
        services: [],
        partners: [],
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

    beforeRouteEnter (to, from, next) {
      document.title = 'Hope & Partners';

      $.getJSON('/static/json/services.json', function (services) {
        $.getJSON('/static/json/partners.json', function (partners) {
          next(vm => {
            vm.services = services;
            vm.partners = partners;
            vm.loaded = true;
          })
        })
      });
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

        if(origin.anchor === 'partners' && this.$store.state.slidingPartners) {
          if(direction === 'down') {
            fullpage_api.moveSlideRight();
            this.$store.commit('updateSlidingPartners', true);
            return false;
          } else if (direction === 'up') {
            fullpage_api.moveSlideLeft();
            this.$store.commit('updateSlidingPartners', true);
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

        if(section.anchor === 'partners') {
          if(origin.isLast && direction === 'right') {
            this.$store.commit('updateSlidingPartners', false);
            fullpage_api.moveSectionDown();
          } else if (origin.isFirst && direction === 'left') {
            this.$store.commit('updateSlidingPartners', false);
            fullpage_api.moveSectionUp();
          }
        }
      },
      afterLoad: function(origin, destination, direction) {
        if(origin) {
          if(origin.anchor === 'about') {
            if(direction === 'down') {
              fullpage_api.moveTo('services', 0);
            }
          }
          if(origin.anchor === 'services') {
            if(direction === 'down') {
              fullpage_api.moveTo('partners', 0);
            }
          }
				}

				if(destination) {
					if (destination.anchor === 'services') {
            const text = $('.services-slider .slide.active .letter');

            if(text) {
              bus.$emit('animateServices', text.text());
            }

						this.$store.commit('updateSliding', true);
					}

          if (destination.anchor === 'partners') {
            this.$store.commit('updateSlidingPartners', true);
          }

					if (destination.anchor === 'contacts') {
						bus.$emit('animateContacts', '@');
					}
				}
      },
      afterSlideLoad: function(section, origin, destination) {
        const text = $('.services-slider .slide.active .letter');

        if (text) {
          bus.$emit('animateServices', text.text());
				}

				if(section && destination) {
          if(section.anchor === 'partners') {
            $(".partners-progress .progress-bar").css("width", ((destination.index + 1) / this.partners.length) * 100 + '%');
          }
          if(section.anchor === 'services') {
            $(".services-progress .progress-bar").css("height", ((destination.index + 1) / this.services.length) * 100 + '%');
          }
				}
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

		&.padding-section {
			padding-top: 150px;
			height: 100%;
		}
	}

	.overflow-container {
		// switch to new section does not allow to see a footer
		padding-bottom: 100px;
	}

	.services-slider, .partners-slider {
		.fp-slidesContainer {
			transition: all 900ms ease 0s !important;
		}
	}
</style>